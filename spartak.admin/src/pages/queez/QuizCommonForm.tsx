import { DatePicker, Divider, Form, FormInstance, Input } from "antd";
import { required } from "common/helpers/validators/required";
import moment, { Moment } from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { RowLabel } from "ui/RowLabel";
import { theme } from "../../assets/theme/theme";
// import { Match } from "../../common/interfaces/matches";
import { CopyOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { imageRepository } from "api/imageRepository";
import { quizRepository } from "api/quizRepository";
import { localeOptions } from "common/enum/localeOptions";
import { IQuiz } from "common/interfaces/IQuiz";
import { range } from "lodash";
import { useSelector } from "react-redux";
import { userLevelsSelector } from "store/dictionary/dictionarySelectors";
import { FromBaseLocal } from "ui/FromBaseLocale";
import { UploadDesc } from "ui/UploadDesc";
import { deepMerge } from "../../common/helpers/deepMerge";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";
import { SelectField } from "../../ui/SelectField";
import { Wysiwyg } from "../../ui/Wisiwyg/Wysiwyg";

interface IProps {
  form: FormInstance<any>;
}

export const QuizCommonForm = ({ form }: IProps) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<IQuiz | undefined>();
  const [lang, setLang] = useState("Ru");
  const fanLevelOptions = useSelector(userLevelsSelector);

  const disabledTime = () => {
    const date = new Date();

    return {
      disabledHours: () => range(0, 24).splice(0, Number(date.getHours())),
      disabledMinutes: () => range(0, 60).splice(0, Number(date.getMinutes() + 1)),
    };
  };

  const handleLangChange = (key: string) => {
    setValues(deepMerge({ ...values }, form.getFieldsValue()));
    setLang(key);
  };
  const fillFromBasicLocale = () => {
    values &&
      form.setFieldsValue({
        ...values,
        Header: { ...values.Header, En: values.Header.Ru },
        Announce: { ...values.Announce, En: values.Announce.Ru },
        Text: { ...values.Text, En: values.Text.Ru },
      });
  };

  return (
    <Container>
      <Content>
        <div style={{ display: "flex", gap: "40px" }}>
          <QuizFormItem
            name={"StartPublish"}
            label={<RowLabel label={t("queez.period")} prompt={t("allPages.dateTimeHelp")} required />}
            rules={[{ validator: required }]}
            getValueFromEvent={(date: Moment) => date?.zone(-180).toISOString()}
            getValueProps={(date) => ({
              value: date ? moment(date).zone(-180) : undefined,
            })}
          >
            <DatePicker
              showTime
              placeholder={t("queez.dateStart")}
              style={{ width: 256 }}
              disabledDate={(date) => moment(date) < moment(new Date().toISOString().split("T")[0])}
              disabledTime={disabledTime}
            />
          </QuizFormItem>
          <QuizFormItem
            name={"EndPublish"}
            rules={[
              { validator: required },
              {
                validator: async (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }

                  const startDatetime = form.getFieldValue("StartDate");
                  if (startDatetime != null) {
                    if (value <= startDatetime) {
                      return Promise.reject("Дата окончания должна быть больше даты начала");
                    }
                  }
                },
              },
            ]}
            getValueFromEvent={(date: Moment) => date?.zone(-180).toISOString()}
            getValueProps={(date) => ({
              value: date ? moment(date).zone(-180) : undefined,
            })}
          >
            <DatePicker
              showTime
              placeholder={t("queez.dateEnd")}
              style={{ width: 256 }}
              disabledDate={(date) => moment(date) < moment(form.getFieldValue("StartPublish"))}
            />
          </QuizFormItem>
        </div>

        <QuizFormItem
          label={<RowLabel label={t("specialOffer.fanLevel")} />}
          name="QuizAccess"
          rules={[{ validator: required }]}
        >
          <SelectField mode="multiple" options={fanLevelOptions || []} style={{ width: 256 }} />
        </QuizFormItem>
        <Container>
          <QuizFormItem
            name="PreviewPhoto"
            label={<RowLabel label={t("queez.previewImg")} required />}
            rules={[{ validator: required }]}
          >
            <ImageField
              validation={{
                width: 512,
                height: 367,
                size: 1024,
                format: ["png"],
                exact: true,
              }}
              uploadRequest={(file: File) => quizRepository.upload("Preview", file)}
            />
          </QuizFormItem>
          <UploadDesc width={296}>
            {t("allPages.form.uploadDesc", {
              width: "512",
              height: "367",
              size: "1",
              format: "png",
            })}
          </UploadDesc>
        </Container>
        <QuizFormItem
          name={"locale"}
          label={<RowLabel label={t("specialOffer.localization")} />}
          style={{ marginBottom: "16px" }}
        >
          <SelectField
            onChange={handleLangChange}
            defaultValue={{ value: "Ru", label: "Ru" }}
            options={localeOptions}
            style={{ width: 256 }}
          />
        </QuizFormItem>
        <div style={{ paddingLeft: "240px" }}>
          {form.getFieldValue("locale") === "En" && (
            <FromBaseLocal onClick={fillFromBasicLocale}>
              <CopyOutlined color={theme.colors.middleGray} style={{ fontSize: "16px" }} />
              {t("specialOffer.fromBaseLocal")}
            </FromBaseLocal>
          )}
          <div
            style={{
              width: "508px",
              color: theme.colors.middleGray,
              fontSize: "14px",
            }}
          >
            {t("queez.localeDescription")}
          </div>
        </div>

        <div style={{ width: "980px" }}>
          <Divider style={{ margin: "40px 0" }} />
        </div>

        <QuizFormItem
          label={
            <RowLabel
              label={t("queez.queezHeading")}
              prompt={t("specialOffer.headingPromotionValidationText")}
              required
            />
          }
          name={["Header", lang]}
          rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 70) }]}
        >
          <Input style={{ width: "740px" }} placeholder={t("specialOffer.text")} />
        </QuizFormItem>
        <QuizFormItem
          label={<RowLabel label={t("queez.queezAnnounce")} prompt={t("queez.queezAnnouncePrompt")} required />}
          name={["Announce", lang]}
          rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 250) }]}
        >
          <TextArea placeholder={t("specialOffer.text")} style={{ width: "740px" }} />
        </QuizFormItem>
        <QuizFormItem
          label={<RowLabel label={t("queez.queezDescription")} prompt={t("queez.queezDescHelper")} required />}
          name={["Text", lang]}
          rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 4000) }]}
        >
          <Wysiwyg
            uploadRequest={imageRepository.upload}
            // uploadRequest={quizRepository.uploadImage(TypeOfImage.Preview)}
            placeholder={"Введите текст акции"}
          />
        </QuizFormItem>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  //width: 570px;

  & .ant-form-item {
    justify-content: space-between;
  }

  & textarea {
    height: 120px;
  }
`;

export const QuizFormItem = styled(Form.Item)`
  grid-gap: 40px;

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      // display: none;
      // content: unset;
    }

    & > label {
      height: auto;

      & span {
        white-space: normal;
      }
    }
  }

  #root & {
    margin-bottom: 40px;
  }

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }
  }

  & label > div:first-child::after {
    //display: none;
  }
`;
