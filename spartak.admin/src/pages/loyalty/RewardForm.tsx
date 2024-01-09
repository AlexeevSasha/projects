import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, InputNumber, Select, Typography } from "antd";
import { loyaltyRepository } from "api/loyaltyRepository";
import { required } from "common/helpers/validators/required";
import { AwardType, LoyaltyEntity } from "common/interfaces/loyalty";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { RowLabel } from "ui/RowLabel";
import { UploadField } from "ui/UploadField";
import { FormItem } from "./CommonForm";
import { LoyaltyFormValues } from "./LoyaltyForm";
import { Wysiwyg } from "ui/Wisiwyg/Wysiwyg";
import { imageRepository } from "api/imageRepository";
import { NotificationForm } from "./NotificationForm";

type Props = {
  form: FormInstance<LoyaltyFormValues>;
  isDisable?: boolean;
};

export const RewardForm = ({ form, isDisable }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const awardTypeOptions = Object.values(AwardType).map((value) => ({
    value,
    label: t(`loyalty.awardType.${value}`),
    disabled:
      value === "FreeBetByPhone" && form.getFieldValue(["Condition", "AvailabilityCondition", "Type"]) !== "FromFile",
  }));
  const [countFreeBet, setCountFreeBet] = useState(0);

  const addFile = async (file: File, fileContentType: string) => {
    return await loyaltyRepository
      .addFile(file, fileContentType)
      .then((res) => {
        setCountFreeBet(res.ItemsCount || 0);

        return res.FilePath;
      })
      .then((res) => res);
  };

  return (
    <Container>
      <FormItem
        name={["Condition", "Award", "Type"]}
        label={<RowLabel label={t("loyalty.type")} />}
        rules={[{ validator: required }]}
        style={{ width: "570px" }}
      >
        <Select options={awardTypeOptions} disabled={isDisable} />
      </FormItem>

      <Form.Item shouldUpdate>
        {() => {
          const type = form.getFieldValue(["Condition", "Award", "Type"]);

          switch (type) {
            case "CouponForMerchandise":
              return (
                <FormItem
                  name={["Condition", "Award", "Quantity"]}
                  label={<RowLabel label={t("loyalty.countUsers")} prompt={t("loyalty.countDesc")} />}
                  rules={[
                    {
                      validator: (_, value) => (value >= 1 && value <= 10000 ? Promise.resolve() : Promise.reject()),
                      message: t("loyalty.validationList.coupon"),
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} disabled={isDisable} />
                </FormItem>
              );

            case "FreeBet":
              return (
                <>
                  <FormItem
                    name={["Condition", "Award", "UploadFileUrl"]}
                    label={<RowLabel label={t("loyalty.fribetsLabel")} prompt={t("loyalty.fribetsDesc1")} />}
                    extra={countFreeBet ? t("loyalty.allowFribets") + " " + countFreeBet : ""}
                    rules={
                      isDisable
                        ? []
                        : [
                            {
                              validator: (_, value) =>
                                value && value.includes(".csv") ? Promise.resolve() : Promise.reject(),
                              message: t("validations.required"),
                            },
                          ]
                    }
                    getValueFromEvent={(e) => {
                      // Вызывает проверку валидации полей, после присвоения значения
                      setTimeout(() => form.validateFields(), 200);

                      return e;
                    }}
                  >
                    <UploadField
                      uploadRequest={(file) => addFile(file, "Awards")}
                      removeRequest={loyaltyRepository.deleteFile}
                      getRemoveEvent={() => {
                        setCountFreeBet(0);
                      }}
                      placeholder={({ loading } = {}) => (
                        <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>{t("loyalty.import")}</Button>
                      )}
                      listType={undefined}
                      disabled={isDisable}
                      validate={(file: File) => {
                        const typeError = !file.type.includes("csv");
                        const sizeError = !(file.size / 1024 <= 1024);
                        if (typeError || sizeError) {
                          dispatch(noticeActions.add({ message: t("validations.errorLoadFile"), type: "error" }));
                        }

                        return !typeError && !sizeError;
                      }}
                    />
                  </FormItem>

                  <SecondDesc type="secondary">{t("loyalty.fribetsDesc2")}</SecondDesc>
                </>
              );

            case "VoucherToTheBox":
              return (
                <>
                  <FormItem
                    name={["Condition", "Award", "Quantity"]}
                    label={<RowLabel label={t("loyalty.vauchersLabel")} prompt={t("loyalty.vaucherDesc1")} />}
                    rules={[
                      {
                        validator: (_, value) => (value >= 1 && value <= 1000 ? Promise.resolve() : Promise.reject()),
                        message: t("loyalty.validationList.voucher"),
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} disabled={isDisable} />
                  </FormItem>

                  <SecondDesc type="secondary">{t("loyalty.vaucherDesc2")}</SecondDesc>
                </>
              );

            case "ExternalReference":
              return (
                <>
                  <FormItem
                    name={["Condition", "Award", "Link"]}
                    label={<RowLabel label={t("loyalty.linkLabel")} prompt={t("loyalty.linkDesc1")} />}
                    rules={[
                      {
                        validator: (_, value) =>
                          (value?.includes("https://") || value?.includes("http://")) && value?.length <= 2048
                            ? Promise.resolve()
                            : Promise.reject(),
                        message: t("loyalty.validationList.wrongLink"),
                      },
                    ]}
                  >
                    <Input placeholder={t("loyalty.linkPlaceholder")} disabled={isDisable} />
                  </FormItem>

                  <SecondDesc type="secondary">{t("loyalty.linkDesc2")}</SecondDesc>

                  <FormItem
                    name={["Condition", "Award", "ButtonText"]}
                    label={<RowLabel label={t("loyalty.btnText")} prompt={t("loyalty.btnTextDesc")} />}
                    rules={[{ validator: required }]}
                  >
                    <Input placeholder={t("loyalty.btnTextPlaceholder")} disabled={isDisable} />
                  </FormItem>
                </>
              );

            case "FreeBetByPhone":
              return (
                <>
                  <FormItem
                    name={["Condition", "Award", "UploadFileUrl"]}
                    label={
                      <RowLabel label={t("loyalty.freeBetByPhoneLabel")} prompt={t("loyalty.freeBetByPhoneDesc1")} />
                    }
                    extra={countFreeBet ? t("loyalty.allowFribets") + " " + countFreeBet : ""}
                    rules={
                      isDisable
                        ? []
                        : [
                            {
                              validator: (_, value) =>
                                value && value.includes(".csv") ? Promise.resolve() : Promise.reject(),
                              message: t("validations.required"),
                            },
                          ]
                    }
                    getValueFromEvent={(e) => {
                      // Вызывает проверку валидации полей, после присвоения значения
                      setTimeout(() => form.validateFields(), 200);

                      return e;
                    }}
                  >
                    <UploadField
                      uploadRequest={(file) => addFile(file, "FreeBet")}
                      removeRequest={loyaltyRepository.deleteFile}
                      getRemoveEvent={() => {
                        setCountFreeBet(0);
                      }}
                      placeholder={({ loading } = {}) => (
                        <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>{t("loyalty.import")}</Button>
                      )}
                      listType={undefined}
                      disabled={isDisable}
                      validate={(file: File) => {
                        const typeError = !file.type.includes("csv");
                        const sizeError = !(file.size / 1024 <= 1024);
                        if (typeError || sizeError) {
                          dispatch(noticeActions.add({ message: t("validations.errorLoadFile"), type: "error" }));
                        }

                        return !typeError && !sizeError;
                      }}
                    />
                  </FormItem>

                  <SecondDesc type="secondary">{t("loyalty.freeBetByPhoneDesc2")}</SecondDesc>
                  <NotificationForm form={form} isDisable={isDisable} />
                </>
              );

            default:
              return null;
          }
        }}
      </Form.Item>

      <FormItem
        name={"WinnerText"}
        label={<RowLabel label={t("loyalty.infoForWinners")} />}
        // rules={[{ validator: required }]}
      >
        <Wysiwyg uploadRequest={imageRepository.upload} />
      </FormItem>
    </Container>
  );
};

const Container = styled.div``;

const SecondDesc = styled(Typography.Text)`
  display: block;
  margin-top: -20px;
  margin-bottom: 40px;
  width: 200px;
  font-size: 13px;
`;
