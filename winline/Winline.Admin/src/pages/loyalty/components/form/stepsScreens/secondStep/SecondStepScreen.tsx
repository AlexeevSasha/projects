import { useEffect, useMemo, useState } from "react";
import { Checkbox, Form, InputNumber, Radio, Select, Space } from "antd";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { LoyaltyTitleLayout } from "../../../../../../ui/LoyaltyTitleLayout";
import { conditionsOptions } from "../../../../../../common/constants/loyalty/loyaltyFormOptions";
import { useSelector } from "react-redux";
import { StateType, useAppDispatch } from "../../../../../../core/redux/store";
import { FileUpload } from "../../../../../../ui/formItemComponents/FileUpload";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ISecondStep } from "../../../../../../common/interfaces/ILoyaltyForm";
import { IEvents, ISectors } from "../../../../../../api/dto/loyalty/ILoyalty";
import { getSectorsThunk } from "../../../../../../modules/loyalty/loyaltyActionAsync";
import Text from "antd/lib/typography/Text";
import { theme } from "../../../../../../assets/theme/theme";

const { Option } = Select;

export const SecondStepScreen = ({ ...props }: ISecondStep) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (props.condition === "AllUser") {
      props.setAllUser(true);
      props.setAllCondition(false);
      props.setFromFile(false);
    } else if (props.condition === "AllCondition") {
      props.setAllCondition(true);
      props.setAllUser(false);
      props.setFromFile(false);
    } else if (props.condition === "FromFile") {
      props.setFromFile(true);
      props.setAllCondition(false);
      props.setAllUser(false);
    }
  }, [props.condition]);

  useEffect(() => {
    if (props.hasConditions) {
      props.setNoCondition(false);
    } else {
      setShowError(false);
      props.setNoCondition(true);
      props.setConditions([]);
    }
  }, [props.hasConditions]);

  const handleFullProfileChanged = (e: CheckboxChangeEvent): void => {
    props.setFullProfile(e.target.checked);
    props.conditions.push("FullProfile");
    if (!e.target.checked) {
      props.setConditions(props.conditions.filter((item) => item !== "FullProfile"));
    }
  };

  const handleNewUserChanged = (e: CheckboxChangeEvent): void => {
    props.setNewUser(e.target.checked);
    props.conditions.push("NewUser");
    if (!e.target.checked) {
      props.setConditions(props.conditions.filter((item) => item !== "NewUser"));
    }
  };

  const handleBoughtTicketChanged = (e: CheckboxChangeEvent): void => {
    props.setBoughtTicket(e.target.checked);
    props.conditions.push("BoughtTicket");
    if (!e.target.checked) {
      props.setConditions(props.conditions.filter((item) => item !== "BoughtTicket"));
    }
  };

  const eventsOptions = useMemo(
    () =>
      props.events.map((event: IEvents) => (
        <Option key={event.eventId} value={event.eventId}>
          {event.eventName}
        </Option>
      )),
    [props.events]
  );

  const handleChange = (value: string) => {
    dispatch(getSectorsThunk(value));
  };

  const sectorsOptions = useMemo(
    () =>
      props.sectors.map((event: ISectors) => (
        <Option key={event.sectorId} value={event.sectorId}>
          {event.sectorName}
        </Option>
      )),
    [props.sectors]
  );

  const disabled = (props.boughtTicket && props.edit) || !props.hasConditions ? true : props.boughtTicket ? false : true;

  const checkboxValidator = async () => {
    if (!props.newUser && !props.fullProfile && !props.boughtTicket && props.hasConditions) {
      setShowError(true);

      return Promise.reject();
      //return Promise.reject(t("loyaltyForm.secondStep.conditions.error"));
    } else {
      return Promise.resolve();
    }
  };

  return (
    <MainBlock>
      <LoyaltyTitleLayout
        title={t("loyaltyForm.secondStep.showUsers.title")}
        description={t("loyaltyForm.secondStep.showUsers.description")}
        second
      >
        <CustomFormItem name={"conditionId"}>
          <Radio.Group disabled={props.edit ? true : false} style={{ gap: "0" }} defaultValue={props.availability[0]}>
            <Space direction="vertical">
              {props.availability.map((item) => (
                <Radio
                  key={item}
                  value={item}
                  checked={item === "FromFile" ? props.fromFile : item === "AllCondition" ? props.allCondition : props.allUser}
                  onClick={() => props.setCondition(item)}
                >
                  {t(`loyaltyForm.secondStep.showUsers.options.showUsersOptions.${item}`)}
                </Radio>
              ))}

              <FileUpload
                setValue={props.setFile}
                disabled={props.condition === "FromFile" ? false : true}
                label=""
                action={`${process.env.REACT_APP_ADMIN}/Loyalty/AddFile?fileContentType=Users`}
                form={form}
                types="CSV"
                name={"uploadFileStepTwo"}
                mimeTypes={["text/csv"]}
                maxCount={1}
                fileList={
                  props.data && props.data.condition.availabilityCondition.uploadFile
                    ? [
                        {
                          uid: "-1",
                          name: props.data.condition.availabilityCondition.uploadFile?.slice(
                            props.data.condition.availabilityCondition.uploadFile.lastIndexOf("/") + 1
                          ),
                          status: "done",
                          url: props.data.condition.availabilityCondition.uploadFile
                        }
                      ]
                    : undefined
                }
              />
            </Space>
          </Radio.Group>
        </CustomFormItem>
      </LoyaltyTitleLayout>
      <LoyaltyTitleLayout
        title={t("loyaltyForm.secondStep.conditions.title")}
        description={t("loyaltyForm.secondStep.conditions.description")}
        second
      >
        <CustomFormItem name={"noCondition"}>
          <Radio.Group disabled={props.edit && true} defaultValue={conditionsOptions[1].value}>
            <Space direction="vertical">
              {conditionsOptions.map((item) => (
                <Radio key={item.value} value={item.value} onClick={() => props.setHasConditions(item.value === "no" ? false : true)}>
                  {t(item.label)}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </CustomFormItem>
      </LoyaltyTitleLayout>
      <LoyaltyTitleLayout
        title={t("loyaltyForm.secondStep.conditions.hasConditions.title")}
        description={t("loyaltyForm.secondStep.conditions.hasConditions.description")}
        second
      >
        <CheckboxContainer style={{ overflow: "hidden" }}>
          <CustomFormItem name={"fullProfile"} style={{ marginBottom: "0" }}>
            <Checkbox disabled={props.hasConditions ? false : true} onChange={handleFullProfileChanged} checked={props.fullProfile}>
              {t("loyaltyForm.secondStep.conditions.hasConditions.label.allDataFilled")}
            </Checkbox>
          </CustomFormItem>
          <CustomFormItem name={"newUser"} style={{ marginBottom: "0" }}>
            <Checkbox disabled={props.hasConditions ? false : true} onChange={handleNewUserChanged} checked={props.newUser}>
              {t("loyaltyForm.secondStep.conditions.hasConditions.label.newUser")}
            </Checkbox>
          </CustomFormItem>
          <CustomFormItem name={"boughtTicket"} style={{ marginBottom: "0" }} rules={[{ validator: checkboxValidator }]}>
            <Checkbox disabled={props.hasConditions ? false : true} onChange={handleBoughtTicketChanged} checked={props.boughtTicket}>
              {t("loyaltyForm.secondStep.conditions.hasConditions.label.ticketIsBought")}
            </Checkbox>
          </CustomFormItem>
          {showError && !props.newUser && !props.fullProfile && !props.boughtTicket ? (
            <ErrorText showError={showError}>{t("loyaltyForm.secondStep.conditions.error")}</ErrorText>
          ) : null}
        </CheckboxContainer>
        <CustomFormItem
          name={["condition", "winCondition", "matchId"]}
          style={{ marginBottom: "8px" }}
          label={t("loyalty.event")}
          rules={[{ required: props.boughtTicket && props.hasConditions ? true : false, message: t("validations.required") }]}
          required={false}
        >
          <Select
            disabled={disabled}
            defaultValue={props.data ? props.data.condition.winCondition.find((item) => item.type === "BoughtTicket")?.matchId : undefined}
            onChange={handleChange}
            placeholder={t("common.selectPlaceholder")}
          >
            {eventsOptions}
          </Select>
        </CustomFormItem>
        <CustomFormItem
          name={["condition", "winCondition", "sectorId"]}
          style={{ marginBottom: "8px" }}
          label={t("loyalty.sector")}
          rules={[{ required: props.boughtTicket && props.hasConditions ? true : false, message: t("validations.required") }]}
          required={false}
        >
          <Select
            disabled={disabled}
            defaultValue={props.data ? props.data.condition.winCondition.find((item) => item.type === "BoughtTicket")?.sectorId : undefined}
            placeholder={t("common.selectPlaceholder")}
          >
            {sectorsOptions}
          </Select>
        </CustomFormItem>
        <Form.Item
          name={["condition", "winCondition", "ticketQuantity"]}
          style={{ marginBottom: "8px", display: "flex" }}
          label={t("loyaltyForm.secondStep.conditions.hasConditions.label.minCount")}
          rules={[{ required: props.boughtTicket && props.hasConditions ? true : false, message: t("validations.required") }]}
          required={false}
        >
          <InputNumber
            disabled={disabled}
            placeholder="0"
            defaultValue={props.data ? props.data.condition.winCondition.find((item) => item.type === "BoughtTicket")?.quantity : undefined}
            formatter={(value) => `${value}`.replace(/[^0-9]/g, "")}
            style={{ width: "100%" }}
            min={1}
            max={99}
          />
        </Form.Item>
      </LoyaltyTitleLayout>
    </MainBlock>
  );
};

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25%;
  @media (max-width: 1000px) {
    grid-gap: 10%;
  }
`;

const CustomFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

const CheckboxContainer = styled.div`
  position: relative;
`;

const ErrorText = styled(Text)<{ showError: boolean }>`
  color: ${theme.colors.red};
  bottom: ${({ showError }) => (showError ? 0 : 10)};
  margin: 0;
  padding: 0;
`;
