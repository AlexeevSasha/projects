import { ArrowLeftOutlined, ArrowRightOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, Layout, Modal, Steps } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { LoyaltyEntity } from "common/interfaces/loyalty";
import { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { loyaltyActions } from "store/loyalty/loyalty";
import { getLoyaltyById, saveLoyalty, updateLoyalty } from "store/loyalty/loyaltyActionAsync";
import { loyaltySelector } from "store/loyalty/loyaltySelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { CommonForm } from "./CommonForm";
import { RewardForm } from "./RewardForm";
import { TermsForm } from "./TermsForm";
import { getLoyaltyDtoFromValues } from "common/helpers/loyalty/getDtoFromValues";

const { Header, Content, Footer } = Layout;

export type AdditionalLoyaltyFormValues = {
  DateRange?: Moment[];

  ExistCondition?: boolean;
  NewUser?: boolean;
  BoughtTicket?: boolean;

  EventId?: string;
  SectorIds?: number[];
  Quantity?: number;
};

const initialFormValues = {
  BoughtTicket: true,
  Condition: { AvailabilityCondition: { Type: "AllUser" }, Award: { Quantity: 1 } },
};

export type LoyaltyFormValues = LoyaltyEntity & AdditionalLoyaltyFormValues;

export const LoyaltyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<LoyaltyFormValues>();
  const [values, setValues] = useState<LoyaltyFormValues | undefined>();
  const dispatch = useAppDispatch();
  const loyalty = useSelector(loyaltySelector);
  const [current, setCurrent] = useState(0);

  const getFormValues = () => {
    const formValues = form.getFieldsValue();

    return {
      ...loyalty,
      ...values,
      ...formValues,
      Condition: { ...(values?.Condition || {}), ...formValues.Condition },
    } as LoyaltyEntity;
  };

  const validate = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("loyalty.validationError"), type: "error" }));

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

  const steps = useMemo(
    () => [{ title: t("loyalty.common") }, { title: t("loyalty.terms") }, { title: t("loyalty.reward") }],
    []
  );

  const handleClose = () => {
    form.resetFields();
    navigate(`/${routePaths.loyalty}`);
  };

  const handleSave = async () => {
    if (!(await validate())) {
      return;
    }

    console.log("getFormValues", getFormValues());

    dispatch((isCreate ? saveLoyalty : updateLoyalty)(getLoyaltyDtoFromValues(getFormValues())))
      .unwrap()
      .then(() => {
        handleClose();
        dispatch(
          noticeActions.add({ message: t(`loyalty.${isCreate ? "successfullyCreated" : "successfullyChanged"}`) })
        );
      });
  };

  const confirm = (type?: string) => {
    Modal.confirm({
      title: <HeaderText>{t(`allPages.${type === "close" ? "closeConfirmTitle" : "saveConfirmTitle"}`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`loyalty.${type === "close" ? "noSave" : "successSave"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: type === "close" ? handleClose : handleSave,
    });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getLoyaltyById(id))
        .unwrap()
        .then((res) => setValues(res));
    }

    return () => {
      dispatch(loyaltyActions.resetEntity());
    };
  }, [id]);

  return (
    <>
      <HeaderContent>
        <HeaderTop>
          <Title>{isCreate ? t("loyalty.creation") : t("loyalty.edition")}</Title>

          <BtnContainer>
            <Button type="primary" onClick={() => confirm()}>
              {isCreate ? t("allPages.buttonsText.create") : t("allPages.buttonsText.save")}
            </Button>

            <Button onClick={() => confirm("close")}>{t("allPages.buttonsText.close")}</Button>
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
        {!isCreate && !loyalty ? (
          <Loader />
        ) : (
          <FormWrapper>
            <Form
              form={form}
              requiredMark={false}
              labelAlign="left"
              initialValues={loyalty || initialFormValues}
              layout="horizontal"
              validateTrigger="onBlur"
              preserve
            >
              <>
                {current === 0 && <CommonForm />}
                {current === 1 && <TermsForm form={form} isDisable={!isCreate} />}
                {current === 2 && <RewardForm form={form} isDisable={!isCreate} />}
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
  width: 600px;
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
