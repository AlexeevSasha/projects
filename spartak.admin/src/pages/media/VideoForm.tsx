import { Button, Form, Input, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { saveConfirm } from "pages/media/saveConfirm";
import { Media } from "common/interfaces/media";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { createMedia, saveMediaVideo } from "store/media/mediaActionAsync";
import { mediaSelector } from "store/media/mediaSelectors";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { Loader } from "ui/Loader";
import { RowLabel } from "ui/RowLabel";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";

interface IProps {
  publishDraftMethod: Function;
}

export const VideoForm = ({ publishDraftMethod }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<Media>();
  const dispatch = useAppDispatch();
  const media = useSelector(mediaSelector);

  const submitForm = async (draft?: boolean) => {
    const values = form.getFieldsValue();

    if (
      !draft &&
      !values.VideoUrl?.length &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }
    const Id = media?.Id || (await dispatch(createMedia()).unwrap()).Id;

    await dispatch(saveMediaVideo({ ...values, Id, IsDraft: !!draft }))
      .unwrap()
      .then(() => isCreate && navigate(`/${routePaths.media}/${routePaths.form.edit(Id)}/video`));
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
        <RowLabel label={t("media.video")} />

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
      </Row>

      <Row>
        <RowLabel label={t("media.videoLink")} />

        <div>
          <Typography.Text>{t("media.supported")}</Typography.Text>
          <ul>
            <li>{t("media.vk")}</li>
            <li>{t("media.youTube")}</li>
            <li>{t("media.ruTube")}</li>
            <li>{t("media.vimeo")}</li>
          </ul>
        </div>
      </Row>

      <Form.List name="VideoUrl">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name, ...field }, i) => (
              <Row key={field.key}>
                <DeleteBtn>
                  <Delete color={theme.colors.middleGray} onClick={() => remove(i)} />

                  <RowLabel label={t("allPages.link")} prompt={t("media.charCount1000")} />
                </DeleteBtn>

                <Form.Item
                  {...field}
                  name={name}
                  rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 1000) }]}
                  style={{ width: "100%" }}
                >
                  <Input placeholder="http://" />
                </Form.Item>
              </Row>
            ))}

            <Button onClick={() => add()}>{t("allPages.buttonsText.add")}</Button>
          </>
        )}
      </Form.List>
    </Form>
  );
};

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
  align-items: flex-start;
`;

const DeleteBtn = styled.div`
  width: 230px;
  display: flex;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;
