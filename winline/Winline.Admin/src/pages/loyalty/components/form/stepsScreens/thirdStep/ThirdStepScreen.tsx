import { Form, Input, InputNumber, Select } from "antd";
import { useTranslation } from "react-i18next";
import { LoyaltyTitleLayout } from "../../../../../../ui/LoyaltyTitleLayout";
import styled from "styled-components";
import { useEffect, useMemo } from "react";
import { FileUpload } from "../../../../../../ui/formItemComponents/FileUpload";
import { IThirdStep } from "../../../../../../common/interfaces/ILoyaltyForm";
import { formsConstantsValidation } from "../../../../../../common/constants/formsConstantsValidation";
import { useSelector } from "react-redux";
import { StateType } from "../../../../../../core/redux/store";

const { Option } = Select;

const entity = formsConstantsValidation.entity.loyalty;

export const ThirdStepScreen = ({ ...props }: IThirdStep) => {
  const { t } = useTranslation();
  const loyaltyTypes = useSelector((state: StateType) => state.loyalty.type);
  const typeOptions = useMemo(
    () =>
      loyaltyTypes.map((type: string) => (
        <Option key={type} value={type}>
          {t(`loyaltyForm.thirdStep.awards.${type}`)}
        </Option>
      )),
    [loyaltyTypes]
  );

  useEffect(() => {
    if (props.typeAwardId === "freebet") {
      props.form.resetFields(["voucherQuantity", "couponQuantity", "externalLink", "buttonText"]);
      props.setFreebet(true);
      props.setVoucher(false);
      props.setCoupon(false);
      props.setLink(false);
    } else if (props.typeAwardId === "voucherToTheBox") {
      props.form.resetFields(["uploadFileFreebet", "couponQuantity", "externalLink", "buttonText"]);
      props.setVoucher(true);
      props.setFreebet(false);
      props.setCoupon(false);
      props.setLink(false);
    } else if (props.typeAwardId === "couponForMerchandise") {
      props.form.resetFields(["uploadFileFreebet", "voucherQuantity", "externalLink", "buttonText"]);
      props.setCoupon(true);
      props.setVoucher(false);
      props.setFreebet(false);
      props.setLink(false);
    } else {
      props.form.resetFields(["uploadFileFreebet", "voucherQuantity", "couponQuantity"]);
      props.setLink(true);
      props.setCoupon(false);
      props.setVoucher(false);
      props.setFreebet(false);
    }
  }, [props.typeAwardId]);

  const handleSelectChange = (value: string) => {
    props.setTypeAwardId(value);
    props.setStepCount(1);
  };

  const handleVoucherChange = (value: number) => {
    props.setVoucherValue(value);
  };

  const handleCouponChange = (value: number) => {
    props.setCouponValue(value);
  };

  useEffect(() => {
    if (!props.coupon) {
      props.setCouponValue(0);
    }
    if (!props.voucher) {
      props.setVoucherValue(0);
    }
    if (!props.freebet) {
      props.setFreebetFile("");
    }
    if (!props.link) {
      props.setExternalLink("");
      props.setButtonText("");
    }
  }, [props.coupon, props.voucher, props.link, props.freebet]);

  return (
    <MainBlock>
      <LoyaltyTitleLayout title={t("common.type")} third>
        <Form.Item rules={[{ required: true, message: t("validations.required") }]} name={"typeAwardId"}>
          <Select disabled={props.edit ? true : false} onChange={handleSelectChange} placeholder={t("common.selectPlaceholder")}>
            {typeOptions}
          </Select>
        </Form.Item>
      </LoyaltyTitleLayout>
      {props.typeAwardId === "couponForMerchandise" ? (
        <LoyaltyTitleLayout title={t("loyaltyForm.thirdStep.count")} description={t("loyaltyForm.thirdStep.countDesc")} third>
          <Form.Item name={"couponQuantity"} rules={[{ required: true, message: t("validations.required") }]}>
            <InputNumber
              disabled={props.edit ? true : false}
              style={{ width: "100%" }}
              placeholder="0"
              formatter={(value) => `${value}`.replace(/[^0-9]/g, "")}
              onChange={handleCouponChange}
              min={formsConstantsValidation.default.minCount}
              max={formsConstantsValidation.default.maxCount}
            />
          </Form.Item>
        </LoyaltyTitleLayout>
      ) : props.typeAwardId === "freebet" ? (
        <LoyaltyTitleLayout
          title={t("loyaltyForm.thirdStep.freebet.title")}
          description={t("loyaltyForm.thirdStep.freebet.description1")}
          description2={t("loyaltyForm.thirdStep.freebet.description2")}
          third
        >
          <FileUpload
            label=""
            setValue={props.setFreebetFile}
            disabled={props.edit ? true : false}
            action={`${process.env.REACT_APP_ADMIN}/Loyalty/AddFile?fileContentType=Awards`}
            form={props.form}
            maxCount={1}
            types="CSV"
            name={"uploadFileFreebet"}
            mimeTypes={["text/csv"]}
            fileList={
              props.freebetFile
                ? [
                    {
                      uid: "-1",
                      name: props.freebetFile?.slice(props.freebetFile.lastIndexOf("/") + 1),
                      status: "done",
                      url: props.freebetFile
                    }
                  ]
                : undefined
            }
          />
        </LoyaltyTitleLayout>
      ) : props.typeAwardId === "voucherToTheBox" ? (
        <LoyaltyTitleLayout
          title={t("loyaltyForm.thirdStep.voucher.title")}
          description={t("loyaltyForm.thirdStep.voucher.description1")}
          description2={t("loyaltyForm.thirdStep.voucher.description2")}
          third
        >
          <Form.Item name={"voucherQuantity"} rules={[{ required: true, message: t("validations.required") }]}>
            <InputNumber
              disabled={props.edit ? true : false}
              style={{ width: "100%" }}
              placeholder="0"
              formatter={(value) => `${value}`.replace(/[^0-9]/g, "")}
              onChange={handleVoucherChange}
              min={formsConstantsValidation.default.minCount}
              max={formsConstantsValidation.entity.loyalty.maxCount}
            />
          </Form.Item>
        </LoyaltyTitleLayout>
      ) : props.typeAwardId === "externalReference" ? (
        <div>
          <LoyaltyTitleLayout
            title={t("common.link")}
            description={t("loyaltyForm.thirdStep.link.linkDescription")}
            description2={t("loyaltyForm.thirdStep.link.linkDescription2")}
            third
          >
            <Form.Item
              name={"externalLink"}
              rules={[
                {
                  type: "url",
                  message: t("validations.invalidUri")
                },
                {
                  required: true,
                  message: t("validations.required")
                },
                {
                  max: formsConstantsValidation.link.max,
                  message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max })
                }
              ]}
            >
              <Input
                disabled={props.edit ? true : false}
                placeholder={t("loyaltyForm.thirdStep.link.linkPlaceholder")}
                size={"middle"}
                onChange={(e) => props.setExternalLink(e.target.value)}
              />
            </Form.Item>
          </LoyaltyTitleLayout>
          <div style={{ height: "20px" }} />
          <LoyaltyTitleLayout title={t("common.textButton")} description={t("loyaltyForm.thirdStep.link.buttonDescription")} third>
            <Form.Item
              name={"buttonText"}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                },
                {
                  max: entity.buttonText.max,
                  message: t("validations.maxLengthExceeded", { max: entity.buttonText.max })
                }
              ]}
            >
              <Input
                disabled={props.edit ? true : false}
                placeholder={t("loyaltyForm.thirdStep.link.buttonPlaceholder")}
                size={"middle"}
                onChange={(e) => props.setButtonText(e.target.value)}
              />
            </Form.Item>
          </LoyaltyTitleLayout>
        </div>
      ) : (
        ""
      )}
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
