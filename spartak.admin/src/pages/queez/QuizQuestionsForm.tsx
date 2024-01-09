import { CopyOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Collapse, Divider, Form, FormInstance, Space } from "antd";
import { imageRepository } from "api/imageRepository";
import { quizRepository } from "api/quizRepository";
import { theme } from "assets/theme/theme";
import { localeOptions } from "common/enum/localeOptions";
import { deepMerge } from "common/helpers/deepMerge";
import { required } from "common/helpers/validators/required";
import { requiredMinMax } from "common/helpers/validators/requiredMinMax";
import { AnswerEnum, AppearanceEnum, IQuiz } from "common/interfaces/IQuiz";
import { SpecialOffer } from "common/interfaces/specialOffer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store";
import styled from "styled-components";
import { FromBaseLocal } from "ui/FromBaseLocale";
import { ImageField } from "ui/ImageField";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { UploadDesc } from "ui/UploadDesc";
import { Wysiwyg } from "ui/Wisiwyg/Wysiwyg";
import { QuizFormItem } from "./QuizCommonForm";
import { QuizAnswer } from "./components/quizAnswer";

const { Panel } = Collapse;

const appearanceOptions = [
  { label: "Текст", value: "Text" },
  { label: "Ответ с изображением", value: "WithImage" },
  { label: "Свободный ответ", value: "FreeAnswer" },
];
const typeOptions = [
  { label: "Один из списка ", value: "MonoSelect" },
  { label: "Несколько из списка", value: "Multiselect" },
];

type Props = {
  form: FormInstance<IQuiz>;
  isDisable?: boolean;
};

export const QuizQuestionsForm = ({ form, isDisable }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<SpecialOffer | undefined>();
  const [lang, setLang] = useState("Ru");
  const [appearance, setAppearance] = useState(
    form.getFieldsValue()?.Questions?.map((question) => question?.AppearanceAnswer) || []
  );
  const [answerType, setAnswerType] = useState(
    form.getFieldsValue()?.Questions?.map((question) => question?.AnswerType) || []
  );

  const changeCountQuestion = () => {
    setAppearance(form.getFieldsValue()?.Questions?.map((question) => question?.AppearanceAnswer) || []);
    setAnswerType(form.getFieldsValue()?.Questions?.map((question) => question?.AnswerType) || []);
  };

  useEffect(() => {
    changeCountQuestion();
  }, [form]);

  const handleLangChange = (key: string) => {
    setValues(deepMerge({ ...values }, form.getFieldsValue()));
    setLang(key);
  };

  const fillFromBasicLocale = () => {
    values && form.setFieldsValue({ ...values });
  };

  return (
    <div>
      <QuizFormItem
        name={"locale"}
        label={<RowLabel label={t("specialOffer.localization")} />}
        style={{ marginBottom: "16px" }}
      >
        <SelectField
          onChange={handleLangChange}
          defaultValue={{ value: "Ru", label: "Ru" }}
          options={localeOptions || []}
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

      <div style={{ width: "100%" }}>
        <Divider style={{ margin: "40px 0" }} />
      </div>

      <Form.List name={"Questions"}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }, questionIndex) => (
              <Collapse key={"q" + questionIndex}>
                <Panel
                  header={
                    <span>
                      {t("queez.queezQuestions.title") + " " + (questionIndex + 1)}{" "}
                      {questionIndex !== 0 ? (
                        <DeleteOutlined
                          color={theme.colors.middleGray}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            remove(questionIndex);
                          }}
                        />
                      ) : null}
                    </span>
                  }
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <QuizFormItem
                    required
                    name={[name, "Text", lang]}
                    fieldKey={["Text", lang]}
                    label={
                      <RowLabel
                        label={t("queez.queezQuestions.text.title")}
                        prompt={t("queez.queezQuestions.text.validation")}
                        required
                      />
                    }
                    rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 250) }]}
                  >
                    <Wysiwyg
                      // TODO: Заменить запрос для загрузки фоток
                      // uploadRequest={quizRepository.uploadImage}
                      uploadRequest={imageRepository.upload}
                      placeholder={t("queez.queezQuestions.text.title")}
                    />
                  </QuizFormItem>

                  <Container>
                    <QuizFormItem
                      name={[name, "QuestionImage"]}
                      label={<RowLabel label={t("queez.queezQuestions.image")} />}
                      // rules={[{ validator: required }]}
                    >
                      <ImageField
                        validation={{
                          width: 732,
                          height: 410,
                          size: 1024,
                          format: ["png"],
                          exact: true,
                        }}
                        uploadRequest={(file: File) => quizRepository.upload("Question", file)}
                      />
                    </QuizFormItem>
                    <UploadDesc width={296}>
                      {t("allPages.form.uploadDesc", {
                        width: "732",
                        height: "410",
                        size: "1",
                        format: "png",
                      })}
                    </UploadDesc>
                  </Container>

                  <QuizFormItem
                    name={[name, "AppearanceAnswer"]}
                    label={<RowLabel label={t("queez.queezQuestions.answer.view")} required />}
                    style={{ marginBottom: "16px" }}
                    required
                    rules={[{ validator: required }]}
                  >
                    <SelectField
                      onChange={(value: AppearanceEnum) => {
                        appearance[questionIndex] = value;
                        setAppearance([...appearance]);
                      }}
                      options={appearanceOptions}
                      style={{ width: 256 }}
                    />
                  </QuizFormItem>
                  {appearance?.[questionIndex] !== "FreeAnswer" ? (
                    <QuizFormItem
                      name={[name, "AnswerType"]}
                      label={<RowLabel label={t("queez.queezQuestions.answer.type")} required />}
                      style={{ marginBottom: "16px" }}
                      required
                      rules={[{ validator: required }]}
                    >
                      <SelectField
                        onChange={(value: AnswerEnum) => {
                          answerType[questionIndex] = value;
                          setAnswerType([...answerType]);
                        }}
                        // defaultValue={answerType[questionIndex] || typeOptions[0]}
                        options={typeOptions}
                        style={{ width: 256 }}
                      />
                    </QuizFormItem>
                  ) : null}

                  {appearance?.[questionIndex] !== "FreeAnswer" ? (
                    <QuizFormItem
                      name={[name, "IsAdditionalFreeAnswer"]}
                      label={<RowLabel label={t("queez.queezQuestions.answer.freeType")} required />}
                      style={{ marginBottom: "16px" }}
                      valuePropName="checked"
                    >
                      <Checkbox></Checkbox>
                    </QuizFormItem>
                  ) : null}

                  <Form.List name={[name, "Answers"]}>
                    {(fieldsChild, { add: addChild, remove: removeChild }) => (
                      <>
                        {fieldsChild.map(({ key: keyChild, name: nameChild }, answerIndex) => (
                          <QuizAnswer
                            key={"a" + answerIndex}
                            lang={lang}
                            nameChild={nameChild}
                            answerIndex={answerIndex}
                            remove={removeChild}
                            form={form}
                            appearanceAnswer={appearance?.[questionIndex]}
                            answerType={answerType?.[questionIndex]}
                          />
                        ))}
                        {appearance?.[questionIndex] !== "FreeAnswer" ? (
                          <QuizFormItem style={{ paddingBottom: "10px" }}>
                            <Button type="dashed" onClick={() => addChild()} block icon={<PlusOutlined />}>
                              {t("queez.addAnswer")}
                            </Button>
                          </QuizFormItem>
                        ) : null}
                      </>
                    )}
                  </Form.List>
                </Panel>
              </Collapse>
            ))}

            <QuizFormItem style={{ paddingBottom: "10px" }}>
              <Button
                type="dashed"
                onClick={() => {
                  add({ AppearanceAnswer: appearanceOptions[0].value, AnswerType: typeOptions[0].value });
                  changeCountQuestion();
                }}
                block
                icon={<PlusOutlined />}
              >
                {t("queez.addQuestion")}
              </Button>
            </QuizFormItem>
          </>
        )}
      </Form.List>
    </div>
  );
};

const Container = styled.div`
  display: flex;
`;

const InputSpace = styled(Space)`
  & .ant-form-item {
    display: block;
  }

  & .ant-form-item-label > label::after {
    content: none;
  }
`;

const Error = styled.div`
  color: ${theme.colors.red};
  font-size: 14px;
`;
