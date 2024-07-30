import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../../common/constants/routePaths";
import { Steps, Button, Card, PageHeader, Form, Modal } from "antd";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { Content, Footer } from "antd/es/layout/layout";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { IFirstStep, ISecondStep, IThirdStep } from "../../../../common/interfaces/ILoyaltyForm";
import { useSelector } from "react-redux";
import i18next from "i18next";
import {
  addLoyaltyThunk,
  getEventsThunk,
  getLoyaltyTypeThunk,
  getSectorsThunk,
  updateLoyaltyThunk
} from "../../../../modules/loyalty/loyaltyActionAsync";
import { ILoyalty } from "../../../../api/dto/loyalty/ILoyalty";
import { FirstStepScreen } from "./stepsScreens/firstStep/FirstStepScreen";
import { SecondStepScreen } from "./stepsScreens/secondStep/SecondStepScreen";
import { ThirdStepScreen } from "./stepsScreens/thirdStep/ThirdStepScreen";
import moment from "moment";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { getAvailability } from "../../../../api/requests/loyalty";

const { Step } = Steps;

interface IWinCondition {
  type: string;
  matchName?: string;
  matchId?: string;
  sectorId?: string;
  sectorName?: string;
  quantity?: number;
}

const steps = [
  {
    title: () => "loyalty.table.form.steps.first",
    content: (props: IFirstStep) => <FirstStepScreen {...props} />
  },
  {
    title: () => i18next.t("loyalty.conditions") + " " + i18next.t("loyalty.stock.entity"),
    content: (props: ISecondStep) => <SecondStepScreen {...props} />
  },
  {
    title: () => "loyalty.reward",
    content: (props: IThirdStep) => <ThirdStepScreen {...props} />
  }
];

export const LoyaltyForm = ({ access }: { access: boolean }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const loyalty = localStorage.getItem("loyalty");
  const data: ILoyalty = loyalty ? JSON.parse(loyalty) : null;
  const events = useSelector((state: StateType) => state.loyalty.events);
  const sectors = useSelector((state: StateType) => state.loyalty.sectors);

  const { isLoading } = useSelector((state: StateType) => state.loyalty);
  const [current, setCurrent] = useState(0);
  const [loyaltyState, setLoyaltyState] = useState<ILoyalty | null>(null);
  const [valueStepsState, setValueStepsState] = useState<ILoyalty | any>(null);
  const [firstStepData, setFirstStepData] = useState<ILoyalty | any>(null);
  const [condition, setCondition] = useState("");
  const [allUser, setAllUser] = useState(false);
  const [allCondition, setAllCondition] = useState(false);
  const [fromFile, setFromFile] = useState(false);
  const [file, setFile] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [fullProfile, setFullProfile] = useState(false);
  const [boughtTicket, setBoughtTicket] = useState(false);
  const [noCondition, setNoCondition] = useState(false);
  const [hasConditions, setHasConditions] = useState(false);
  const [freebet, setFreebet] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [link, setLink] = useState(false);
  const [typeAwardId, setTypeAwardId] = useState("");
  const [edit, setEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [freebetFile, setFreebetFile] = useState("");
  const [voucherValue, setVoucherValue] = useState(0);
  const [couponValue, setCouponValue] = useState(0);
  const [externalLink, setExternalLink] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [stepCount, setStepCount] = useState(0);
  const [availability, setAvailability] = useState([]);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    getAvailability().then((value) => setAvailability(value));
  }, []);

  useEffect(() => {
    if (loyaltyState) {
      if (data) {
        dispatch(updateLoyaltyThunk({ ...loyaltyState, id: data.id }));
      } else {
        dispatch(addLoyaltyThunk(loyaltyState));
      }
      navigate(routePaths.tableContent.loyalty.main);
      localStorage.removeItem("loyalty");
    }
  }, [loyaltyState]);

  useEffect(() => {
    dispatch(getLoyaltyTypeThunk());
    if (data) {
      dispatch(getEventsThunk(data.club.id));
      if (data.condition.winCondition.some((item) => item.type === "BoughtTicket")) {
        dispatch(getSectorsThunk(data.condition.winCondition.find((item) => item.type === "BoughtTicket")?.matchId as string));
      }
    }
  }, []);

  const [form] = Form.useForm();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const showSaveModal = () => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.save") + "?",
      maskClosable: true,
      content: t("loyalty.table.modal.save"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        submitLoyalty(true);
      }
    });
  };

  const showCloseModal = () => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.close") + "?",
      maskClosable: true,
      content: t("loyalty.table.modal.close"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        navigate(routePaths.tableContent.loyalty.main);
        localStorage.removeItem("loyalty");
      }
    });
  };

  useEffect(() => {
    setImageUrl("");
    setEdit(false);
    if (data) {
      form.setFieldsValue({
        name: !valueStepsState ? data.name : valueStepsState.name,
        clubId: !valueStepsState ? data.club.clubName : valueStepsState.clubId,
        title: !valueStepsState ? data.title : valueStepsState.title,
        description: !valueStepsState ? data.description : valueStepsState.description,
        imageUploader: valueStepsState && valueStepsState.imageUploader ? valueStepsState.imageUploader : data.imageUploader,
        conditionId: data.condition.availabilityCondition.type,
        rangeDate: !valueStepsState
          ? [moment(data.startDate), moment(data.endDate)]
          : [moment(valueStepsState.rangeDate[0]), moment(valueStepsState.rangeDate[1])],
        noCondition: data.condition.winCondition.some((item) => item.type === "NoCondition") ? "no" : "yes",
        typeAwardId: data.condition.award.type,
        couponQuantity: data.condition.award.type === "couponForMerchandise" ? data.condition.award.quantity : null,
        coupon: data.condition.award.type === "couponForMerchandise" ? true : false,
        uploadFileFreebet: data.condition.award.uploadFile,
        freebet: data.condition.award.type === "freebet" ? true : false,
        voucherQuantity: data.condition.award.type === "voucherToTheBox" ? data.condition.award.quantity : null,
        voucher: data.condition.award.type === "voucherToTheBox" ? true : false,
        externalLink: data.condition.award.link,
        buttonText: data.condition.award.buttonText,
        link: data.condition.award.type === "externalReference" ? true : false
      });
      setImageUrl(valueStepsState && valueStepsState.imageUploader ? valueStepsState.imageUploader : data.imageUploader);
      setEdit(true);
      setTypeAwardId(data.condition.award.type);
      setFullProfile(data.condition.winCondition.some((item) => item.type === "FullProfile") ? true : false);
      setNewUser(data.condition.winCondition.some((item) => item.type === "NewUser") ? true : false);
      setFreebetFile(data.condition.award.uploadFile ? data.condition.award.uploadFile : "");
      setBoughtTicket(data.condition.winCondition.some((item) => item.type === "BoughtTicket") ? true : false);
    }
  }, [form, data]);

  useEffect(() => {
    if (!hasConditions) {
      form.resetFields([
        ["condition", "winCondition", "matchId"],
        ["condition", "winCondition", "sectorId"],
        ["condition", "winCondition", "ticketQuantity"]
      ]);
      setFullProfile(false);
      setNewUser(false);
      setBoughtTicket(false);
    }
  }, [hasConditions]);

  useEffect(() => {
    if (voucherValue || freebetFile || couponValue || (externalLink && buttonText)) {
      setStepCount(2);
    } else if (stepCount < 1) {
      setStepCount(stepCount + 1);
    } else {
      setStepCount(1);
    }
  }, [voucherValue, couponValue, externalLink, freebetFile, buttonText]);

  const submitLoyalty = (add?: boolean) => {
    form.validateFields().then((values) => {
      setImageUrl(values.imageUploader || valueStepsState.imageUploader);
      setValueStepsState({ ...valueStepsState, ...values });

      if (current === 0 && data) {
        setFirstStepData({ ...values, startDate: values.rangeDate[0], endDate: values.rangeDate[1] });
      }
      if (!add) {
        next();
      } else {
        if (data) {
          const payload = current === 0 ? { ...values, startDate: values.rangeDate[0], endDate: values.rangeDate[1] } : firstStepData;
          delete payload["rangeDate"];
          delete payload["clubId"];

          setLoyaltyState(payload);
        } else {
          const dataInPayload = { startDate: valueStepsState.rangeDate[0], endDate: valueStepsState.rangeDate[1], ...valueStepsState };
          delete dataInPayload["rangeDate"];
          delete dataInPayload["uploadFileStepTwo"];
          delete dataInPayload["uploadFileFreebet"];
          delete dataInPayload["noCondition"];
          delete dataInPayload["conditionId"];

          const matchName = events.find(
            (match) =>
              match.eventId === valueStepsState.condition?.winCondition?.matchId ||
              match.eventId === values.condition?.winCondition?.matchId
          )?.eventName;
          const sectorName = sectors.find(
            (sector) =>
              sector.sectorId === valueStepsState.condition?.winCondition?.sectorId ||
              sector.sectorId === values.condition?.winCondition?.sectorId
          )?.sectorName;

          const winCondition: IWinCondition[] = conditions[0]
            ? conditions.map((item: any) => {
                const oneCondition = {
                  type: item
                };

                if (item === "BoughtTicket") {
                  Object.assign(oneCondition, {
                    matchName: matchName,
                    matchId: valueStepsState.condition.winCondition.matchId || values.condition.winCondition.matchId,
                    sectorId: valueStepsState.condition.winCondition.sectorId || values.condition.winCondition.sectorId,
                    sectorName: sectorName,
                    quantity: valueStepsState.condition.winCondition.ticketQuantity || values.condition.winCondition.ticketQuantity
                  });
                }

                return oneCondition;
              })
            : [{ type: "NoCondition" }];

          const payload = {
            ...dataInPayload,
            condition: {
              availabilityCondition: {
                type: fromFile ? "FromFile" : allCondition ? "AllCondition" : "AllUser"
              },
              award: {
                type: freebet ? "freebet" : coupon ? "couponForMerchandise" : voucher ? "voucherToTheBox" : "externalReference"
              },
              winCondition
            }
          };
          if (fromFile) {
            Object.assign(payload.condition.availabilityCondition, {
              uploadFile: data
                ? valueStepsState.uploadFileStepTwo
                : valueStepsState.uploadFileStepTwo !== undefined
                ? valueStepsState.uploadFileStepTwo.file.response
                : file
            });
          }
          Object.assign(
            payload.condition.award,
            freebet
              ? { uploadFile: data ? values.uploadFileFreebet : freebet ? freebetFile : "" }
              : coupon || voucher
              ? { quantity: coupon ? couponValue : voucherValue }
              : { link: values.externalLink || externalLink, buttonText: values.buttonText || buttonText }
          );
          setLoyaltyState(payload);
        }
      }
    });
  };

  return (
    <>
      <PageHeader
        ghost={false}
        title={data ? t("common.buttonsText.edit") + " " + t("loyalty.entity") : t("common.buttonsText.create") + " " + t("loyalty.entity")}
        extra={[
          <Button
            onClick={() => showSaveModal()}
            type="primary"
            key="3"
            disabled={isLoading || (stepCount === 2 && !data) || data ? false : true}
          >
            {t("common.buttonsText.save")}
          </Button>,
          <Button key="2" onClick={() => showCloseModal()}>
            {t("loyalty.table.form.buttons.close")}
          </Button>
        ]}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title()} title={t(item.title())} />
          ))}
        </Steps>
      </PageHeader>
      <Content
        style={{
          padding: "24px 24px 88px 24px",
          margin: 0
        }}
      >
        <Card style={{ height: "100%" }}>
          <Form form={form} layout="vertical">
            {steps[current].content({
              data,
              conditions,
              setConditions,
              availability,
              events,
              sectors,
              form,
              edit,
              imageUrl,
              condition,
              setCondition,
              allCondition,
              allUser,
              fromFile,
              file,
              setFile,
              setAllCondition,
              setAllUser,
              setFromFile,
              boughtTicket,
              fullProfile,
              newUser,
              setBoughtTicket,
              setFullProfile,
              setNewUser,
              noCondition,
              setNoCondition,
              coupon,
              freebet,
              link,
              setCoupon,
              setFreebet,
              setLink,
              setVoucher,
              voucher,
              buttonText,
              couponValue,
              externalLink,
              freebetFile,
              setButtonText,
              setCouponValue,
              setExternalLink,
              setFreebetFile,
              setVoucherValue,
              voucherValue,
              typeAwardId,
              setTypeAwardId,
              hasConditions,
              setHasConditions,
              setStepCount
            })}
          </Form>
        </Card>
      </Content>
      <FooterContent>
        <Button
          onClick={() => {
            prev();
          }}
          disabled={current === 0}
        >
          <ArrowLeftOutlined />
          {t("loyalty.table.form.buttons.back")}
        </Button>
        {current !== steps.length - 1 && (
          <Button onClick={() => submitLoyalty()}>
            {t("loyalty.table.form.buttons.next")}
            <ArrowRightOutlined />
          </Button>
        )}
      </FooterContent>
    </>
  );
};

const FooterContent = styled(Footer)`
  background-color: ${theme.colors.white};
  display: flex;
  position: fixed;
  bottom: 0;
  width: calc(100vw - 199px);
  justify-content: flex-start;
  grid-gap: 8px;
  padding: 16px 24px;
  @media (max-width: 1000px) {
    width: 100vw;
  }
`;
