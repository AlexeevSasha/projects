import { ArrowLeftOutlined, ArrowRightOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, Layout, Modal, Steps } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { getLoyaltyDtoFromValues } from "common/helpers/loyalty/getDtoFromValues";
import { AnswerEnum, AppearanceEnum, IQuiz } from "common/interfaces/IQuiz";
import { LoyaltyEntity } from "common/interfaces/loyalty";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { loyaltyActions } from "store/loyalty/loyalty";
import { saveLoyalty, updateLoyalty } from "store/loyalty/loyaltyActionAsync";
import { loyaltySelector } from "store/loyalty/loyaltySelectors";
import { noticeActions } from "store/notice/notice";
import { getQuizById } from "store/quiz/quizActionAsync";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { QuizCommonForm } from "./QuizCommonForm";
import { QuizQuestionsForm } from "./QuizQuestionsForm";
import { quizActions } from "store/quiz/quizSlise";
import { quizSelector } from "store/quiz/quizSelectors";
import { quizRepository } from "api/quizRepository";
import { deepMerge } from "common/helpers/deepMerge";
import { validationQuiz } from "common/helpers/validators/validationQuiz";

const { Header, Content, Footer } = Layout;

const initialFormValues = {
  Questions: [
    {
      Text: "",
      QuestionImage: "",
      AnswerType: undefined,
      QuizId: "",
      Answers: [
        {
          Text: "",
          AnswerImage: "",
          Points: 0,
          IsCorrectAnswer: true,
        },
      ],
    },
  ],
};

export const QuizForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<IQuiz>();
  const [values, setValues] = useState<IQuiz | undefined>();
  const dispatch = useAppDispatch();
  const { quiz } = useSelector(quizSelector);
  const [current, setCurrent] = useState(0);

  const getFormValues = (): IQuiz => {
    const formValues = form.getFieldsValue();

    return { ...quiz, ...values, ...formValues };
  };

  const validate = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(
        noticeActions.add({
          message: t("loyalty.validationError"),
          type: "error",
        })
      );

      return false;
    }

    return true;
  };

  const handleStepChange = async (step: number) => {
    if (!(await validate())) {
      return;
    }
    setValues(getFormValues());
    setCurrent(step);
  };

  const steps = useMemo(() => [{ title: t("loyalty.common") }, { title: t("queez.questions") }], []);

  const handleClose = () => {
    form.resetFields();
    navigate(`/${routePaths.quiz}`);
  };

  const showConfirm = (draft: boolean = false) => {
    Modal.confirm({
      title: <HeaderText>{t(draft ? "allPages.hideConfirmTitle" : "allPages.confirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`queez.${draft ? "hideConfirm" : "publishConfirm"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft),
    });
  };

  const submitForm = async (draft: boolean = false) => {
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }

    const data = { ...values, ...form.getFieldsValue() };
    // Подставляет IsCorrectAnswer в нужный элемент массива Answers
    data.Questions = data.Questions.map((question, i) => {
      const rightAnswer = question.Answers?.[0]?.NumOfTrueAnswer;

      return {
        ...question,
        // Если тип "свободный ответ", то массив ответов должен быть пустым
        Answers:
          question.AppearanceAnswer === AppearanceEnum.FreeAnswer
            ? undefined
            : question.Answers?.map((answer, index) => ({
                ...answer,
                IsCorrectAnswer: rightAnswer !== undefined ? rightAnswer === index : answer.IsCorrectAnswer,
                Num: index,
                Points:
                  rightAnswer !== undefined // Баллы могу быть только у правильных ответов
                    ? rightAnswer === index
                      ? answer.Points
                      : null
                    : answer.IsCorrectAnswer
                    ? answer.Points
                    : null,
                AnswerImage: question.AppearanceAnswer === AppearanceEnum.WithImage ? answer.AnswerImage : null,
              })),
        AnswerType:
          question.AppearanceAnswer === AppearanceEnum.FreeAnswer ? AnswerEnum.FreeAnswer : question.AnswerType,
        Num: i,
      };
    });

    const validateResult = validationQuiz(data.Questions);
    if (validateResult) {
      dispatch(noticeActions.add({ message: t(validateResult), type: "error" }));
    } else {
      quizRepository[draft ? "draft" : "publish"](deepMerge<IQuiz>({ ...values }, data)).then(() => {
        dispatch(
          noticeActions.add({
            message: t(`allPages.${draft ? "successHide" : "successPublish"}`),
            closable: true,
          })
        );
        navigate(`/${routePaths.quiz}`);
      });
      // .catch((error) => {
      //   console.log(error);
      //   if (error.bodyError.message.includes("Points")) {
      //     dispatch(
      //       noticeActions.add({ message: "Баллы для правильного ответа должны быть заполнены", type: "error" })
      //     );
      //   } else if (error.bodyError.message.includes("Answers")) {
      //     dispatch(
      //       noticeActions.add({
      //         message: "В вопросе должен быть хотя бы один правильный ответ и минимум 2 ответа",
      //         type: "error",
      //       })
      //     );
      //   }
      // });
    }
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getQuizById(id))
        .unwrap()
        .then((res) => setValues(res));
    }

    return () => {
      dispatch(quizActions.resetQuiz());
    };
  }, [id]);

  return (
    <>
      <HeaderContent>
        <HeaderTop>
          <Title>{isCreate ? t("queez.creation") : t("queez.edition")}</Title>

          <BtnContainer>
            <Button onClick={handleClose}>{t("allPages.buttonsText.cancel")}</Button>

            <Button
              onClick={() => showConfirm(true)}
              style={{
                color: theme.colors.red1,
                borderColor: theme.colors.red1,
              }}
            >
              {t("allPages.buttonsText.draft")}
            </Button>

            {(current === 1 || id) && (
              <Button type="primary" onClick={() => showConfirm()}>
                {isCreate ? t("allPages.buttonsText.publish") : t("allPages.buttonsText.save")}
              </Button>
            )}
          </BtnContainer>
        </HeaderTop>

        <StepsWrapper>
          <Steps current={current}>
            {steps.map((item) => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </StepsWrapper>
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        {!isCreate && !quiz ? (
          <Loader />
        ) : (
          <FormWrapper>
            <Form
              form={form}
              requiredMark={false}
              labelAlign="left"
              initialValues={quiz || initialFormValues}
              layout="horizontal"
              validateTrigger="onBlur"
              preserve
            >
              <>
                {current === 0 && <QuizCommonForm form={form} />}
                {current === 1 && <QuizQuestionsForm form={form} isDisable={!isCreate} />}
              </>
            </Form>
          </FormWrapper>
        )}
      </Content>

      <FooterContent>
        <Button onClick={() => handleStepChange(current - 1)} disabled={!current}>
          <ArrowLeftOutlined />
          {t("loyalty.back")}
        </Button>

        <Button onClick={() => handleStepChange(current + 1)} disabled={current === steps.length - 1} danger>
          {t("loyalty.onward")}
          <ArrowRightOutlined />
        </Button>
      </FooterContent>
    </>
  );
};

const HeaderContent = styled(Header)`
  padding: 12px 24px;
  background: ${theme.colors.white};
  height: auto;
`;

const FooterContent = styled(Footer)`
  padding: 12px 24px;
  background: ${theme.colors.white};
  height: auto;

  & > * {
    margin-right: 8px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #0e2833;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
  align-items: center;
  gap: 16px;
`;

const StepsWrapper = styled.div`
  width: 245px;
  margin-top: 24px;
  margin-bottom: 16px;

  #root & .ant-steps-item-container {
    display: flex;
    align-items: center;
  }

  #root & .ant-steps-item-icon {
    width: 24px;
    height: 24px;
    font-size: 14px;
    line-height: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;

const FormWrapper = styled.div`
  background: ${theme.colors.white};
  padding: 24px 128px 24px 24px;
  overflow: auto;
  height: 100%;
`;
