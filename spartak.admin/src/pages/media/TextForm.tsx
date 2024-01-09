import { CopyOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography } from "antd";
import { routePaths } from "common/constants/routePaths";
import { deepMerge } from "common/helpers/deepMerge";
import { saveConfirm } from "pages/media/saveConfirm";
import { Media } from "common/interfaces/media";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { createMedia, saveMediaText } from "store/media/mediaActionAsync";
import { mediaSelector } from "store/media/mediaSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { Wysiwyg } from "ui/Wisiwyg/Wysiwyg";
import { requiredMinMax, validationMinMaxOnly } from "../../common/helpers/validators/requiredMinMax";
import { mediaRepository } from "api/mediaRepository";

interface IProps {
  publishDraftMethod: Function;
}

export const TextForm = ({ publishDraftMethod }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<Media>();
  const dispatch = useAppDispatch();
  const [lang, setLang] = useState("Ru");
  const media = useSelector(mediaSelector);
  const [values, setValues] = useState<Media | undefined>(media);

  const langOptions = useMemo(() => {
    return [
      { label: t("matches.ru"), value: "Ru" },
      { label: t("matches.en"), value: "En" },
    ];
  }, []);

  const handleLangChange = (key: string) => {
    setValues(deepMerge({ ...values }, form.getFieldsValue()));
    setLang(key);
  };

  const fillFromBasicLocale = () => {
    values &&
      form.setFieldsValue({
        ...values,
        MediaHeader: { ...values.MediaHeader, En: values.MediaHeader.Ru },
        MediaAnnounce: { ...values.MediaAnnounce, En: values.MediaAnnounce.Ru },
        MediaText: { ...values.MediaText, En: values.MediaText.Ru },
      });
  };

  const submitForm = async (draft?: boolean) => {
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }
    const Id = media?.Id || (await dispatch(createMedia()).unwrap()).Id;

    await dispatch(saveMediaText(deepMerge({ ...values, Id, IsDraft: !!draft }, form.getFieldsValue())))
      .unwrap()
      .then(() => isCreate && navigate(`/${routePaths.media}/${routePaths.form.edit(Id)}/text`));
  };

  const isTouchedRef = useRef(false);

  const handleFinish = async () => {
    isTouchedRef.current && (await saveConfirm()) && (await submitForm(!media || media.IsDraft));
    publishDraftMethod();
  };

  return !isCreate && !media ? (
    <Loader />
  ) : (
    <Form
      form={form}
      requiredMark={false}
      labelAlign="left"
      initialValues={media}
      onFinish={handleFinish}
      validateTrigger="onBlur"
      id="mediaForm"
    >
      <Row>
        <RowLabel label={t("matches.locale")} />

        <div>
          <SelectField value={lang} options={langOptions} onChange={handleLangChange} style={{ width: 256 }} />

          {lang === "En" && (
            <Fill onClick={fillFromBasicLocale}>
              <CopyOutlined /> <span>{t("allPages.fillFromBasicLocale")}</span>
            </Fill>
          )}

          <Typography.Text style={{ padding: "8px 0 16px", display: "block", maxWidth: 580 }}>
            {t("matches.localePrompt")}
          </Typography.Text>
        </div>
      </Row>

      <Divider style={{ marginBottom: 40 }} />

      <FormHeader>
        <RowLabel label={t("media.text")} />

        <Form.Item shouldUpdate>
          {() =>
            (isTouchedRef.current = form.isFieldsTouched()) && (
              <BtnContainer>
                <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                <Button type="primary" onClick={() => submitForm(!media || media.IsDraft)}>
                  {t("allPages.buttonsText.save")}
                </Button>

                <Button onClick={() => form.resetFields()}>{t("allPages.buttonsText.cancel")}</Button>
              </BtnContainer>
            )
          }
        </Form.Item>
      </FormHeader>

      <FormItem
        required={true}
        name={["MediaHeader", lang]}
        rules={[{ validator: (_, value) => requiredMinMax(_, value, 2, 60) }]}
        label={<RowLabel label={t("media.newsHeader") + " *"} prompt={t("media.charCount60")} />}
      >
        <Input />
      </FormItem>

      <FormItem
        required={true}
        rules={[{ validator: (_, value) => validationMinMaxOnly(_, value, 2, 300) }]}
        name={["MediaAnnounce", lang]}
        label={<RowLabel label={t("media.announce")} prompt={t("media.charCount300")} />}
      >
        <Input.TextArea rows={4} />
      </FormItem>

      <FormItem
        required={true}
        name={["MediaText", lang]}
        label={<RowLabel label={t("media.newsText")} prompt={t("media.newsTextPrompt")} />}
      >
        <Wysiwyg uploadRequest={mediaRepository.uploadImage} />
      </FormItem>
    </Form>
  );
};

const FormHeader = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;

const FormItem = styled(Form.Item)`
  grid-gap: 40px;

  #root & {
    margin-bottom: 40px;
  }

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }

    & > label {
      height: auto;

      & span {
        white-space: normal;
      }
    }
  }

  & label > div:first-child::after {
    display: none;
  }
`;

const Fill = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  & > *:last-child {
    margin-left: 11px;
  }
`;
