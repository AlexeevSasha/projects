import styled from "styled-components";
import { QuizFormItem } from "../QuizCommonForm";
import { RowLabel } from "ui/RowLabel";
import { useTranslation } from "react-i18next";
import { Checkbox, FormInstance, Input, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { theme } from "assets/theme/theme";
import { IQuiz } from "common/interfaces/IQuiz";
import { ImageField } from "ui/ImageField";
import { imageRepository } from "api/imageRepository";
import { UploadDesc } from "ui/UploadDesc";
import { requiredMinMax } from "common/helpers/validators/requiredMinMax";
import { quizRepository } from "api/quizRepository";
import { required } from "common/helpers/validators/required";

interface IProps {
  answerIndex: number;
  nameChild: string | number;
  lang: string;
  remove: (index: number | number[]) => void;
  form: FormInstance<IQuiz>;
  appearanceAnswer?: string;
  answerType?: string;
}

export const QuizAnswer = (props: IProps) => {
  const { t } = useTranslation();

  const renderPoint = () => {
    return (
      <PointContainer>
        <QuizFormItem
          required
          name={[props.nameChild, "Points"]}
          fieldKey={[props.nameChild, "Points"]}
          style={{ marginBottom: "16px" }}
        >
          <Input placeholder={t("queez.queezQuestions.answer.points")} maxLength={10} />
        </QuizFormItem>

        {props.answerType === "MonoSelect" ? (
          <QuizFormItem
            required
            name={[0, "NumOfTrueAnswer"]}
            fieldKey={[0, "NumOfTrueAnswer"]}
            style={{ marginBottom: "16px" }}
          >
            <Radio.Group>
              <Label>
                {t("queez.queezQuestions.answer.successAnswer")}
                <Radio value={props.nameChild} />
              </Label>
            </Radio.Group>
          </QuizFormItem>
        ) : props.answerType === "Multiselect" ? (
          <Label>
            {t("queez.queezQuestions.answer.successAnswer")}
            <QuizFormItem
              // label={t("queez.queezQuestions.answer.successAnswer")}
              name={[props.nameChild, "IsCorrectAnswer"]}
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </QuizFormItem>
          </Label>
        ) : null}
      </PointContainer>
    );
  };

  switch (props.appearanceAnswer) {
    case "FreeAnswer": {
      return null;
    }
    case "Text": {
      return (
        <QuizFormItem
          style={{ marginBottom: "16px" }}
          label={
            <RowLabel
              label={t("queez.queezQuestions.answer.title") + " " + (props.answerIndex + 1)}
              required
              prompt={t("queez.queezQuestions.answer.label")}
            >
              {props.answerIndex !== 0 ? (
                <DeleteOutlined
                  color={theme.colors.middleGray}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    props.remove(props.answerIndex);
                  }}
                />
              ) : null}
            </RowLabel>
          }
        >
          <AnswerContainer>
            <QuizFormItem
              required
              name={[props.nameChild, "Text", props.lang]}
              fieldKey={[props.nameChild, "Text", props.lang]}
              style={{ marginBottom: "16px" }}
              rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 150) }]}
            >
              <Input required placeholder={t("queez.queezQuestions.answer.placeholder")} maxLength={150} />
            </QuizFormItem>
            {renderPoint()}
          </AnswerContainer>
        </QuizFormItem>
      );
    }
    case "WithImage": {
      return (
        <QuizFormItem
          style={{ marginBottom: "16px" }}
          label={
            <RowLabel
              label={t("queez.queezQuestions.answer.title") + " " + (props.answerIndex + 1)}
              required
              prompt={t("queez.queezQuestions.answer.label")}
            >
              {props.answerIndex !== 0 ? (
                <DeleteOutlined
                  color={theme.colors.middleGray}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    props.remove(props.answerIndex);
                  }}
                />
              ) : null}
            </RowLabel>
          }
        >
          <AnswerContainer>
            <QuizFormItem
              required
              name={[props.nameChild, "Text", props.lang]}
              fieldKey={[props.nameChild, "Text", props.lang]}
              style={{ marginBottom: "16px" }}
              rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 150) }]}
            >
              <Input required placeholder={t("queez.queezQuestions.answer.title")} maxLength={150} />
            </QuizFormItem>
            <Container>
              <QuizFormItem name={[props.nameChild, "AnswerImage"]} rules={[{ validator: required }]}>
                <ImageField
                  validation={{
                    width: 358,
                    height: 200,
                    size: 1024,
                    format: ["png"],
                    exact: true,
                  }}
                  uploadRequest={(file: File) => quizRepository.upload("Answer", file)}
                />
              </QuizFormItem>
              <UploadDesc width={296}>
                {t("allPages.form.uploadDesc", {
                  width: "358",
                  height: "200",
                  size: "1",
                  format: "png",
                })}
              </UploadDesc>
            </Container>

            {renderPoint()}
          </AnswerContainer>
        </QuizFormItem>
      );
    }
    default: {
      return null;
    }
  }
};

const AnswerContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Container = styled.div`
  display: flex;
`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-column-gap: 12px;

  ${QuizFormItem} {
    margin-bottom: 0 !important;
  }
`;
