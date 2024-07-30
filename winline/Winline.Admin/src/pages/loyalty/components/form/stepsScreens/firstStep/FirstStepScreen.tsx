import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { DatePicker, Form, Image, Input, Select } from "antd";
import promotionExample from "../../../../../../assets/images/promotionExample.png";
import { LoyaltyFormTitle } from "../../../../../../ui/LoyaltyFormTitle";
import { useTranslation } from "react-i18next";
import type { IFirstStep } from "../../../../../../common/interfaces/ILoyaltyForm";
import { LoyaltyTitleLayout } from "../../../../../../ui/LoyaltyTitleLayout";
import { ImageUpload } from "../../../../../../ui/formItemComponents/ImageUpload";
import { formsConstantsValidation } from "../../../../../../common/constants/formsConstantsValidation";
import { useSelector } from "react-redux";
import { StateType, useAppDispatch } from "../../../../../../core/redux/store";
import { IClub } from "../../../../../../api/dto/IClub";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { getEventsThunk } from "../../../../../../modules/loyalty/loyaltyActionAsync";
import { getClubsThunk } from "../../../../../../modules/commons/commonsActionAsync";

const { RangePicker } = DatePicker;
const { Option } = Select;

export const FirstStepScreen = ({ form, edit, imageUrl }: IFirstStep) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const clubs = useSelector((state: StateType) => state.commons.clubs);

  useEffect(() => {
    dispatch(getClubsThunk());
  }, []);

  const projectOptions = useMemo(
    () =>
      clubs.map((project: IClub) => (
        <Option key={project.id} value={project.id}>
          {project.clubName}
        </Option>
      )),
    [clubs]
  );

  const handleChange = (value: string) => {
    dispatch(getEventsThunk(value));
  };

  return (
    <MainBlock>
      <FirstBlock>
        <LoyaltyTitleLayout description={t("loyaltyForm.firstStep.systemName")} title={t("common.title")}>
          <Form.Item
            name={"name"}
            rules={[
              {
                required: true,
                message: t("validations.required")
              },
              {
                max: formsConstantsValidation.entity.loyalty.max,
                message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.loyalty.max })
              }
            ]}
          >
            <Input placeholder={t("common.text")} disabled={false} />
          </Form.Item>
        </LoyaltyTitleLayout>
        <LoyaltyTitleLayout title={t("common.project")} select>
          <Form.Item
            name={"clubId"}
            rules={[
              {
                required: true,
                message: t("validations.required")
              }
            ]}
          >
            <Select disabled={edit && true} onChange={handleChange} placeholder={t("common.selectPlaceholder")}>
              {projectOptions}
            </Select>
          </Form.Item>
        </LoyaltyTitleLayout>
        <LoyaltyTitleLayout title={t("loyaltyForm.firstStep.date.title")}>
          <Form.Item rules={[{ required: true, message: t("validations.required") }]} name={"rangeDate"}>
            <RangePicker
              disabledDate={(current) => {
                return current && current < moment().endOf("day").add(-1, "d");
              }}
              showTime={{ format: "HH:mm" }}
              format={formsConstantsValidation.dateTimeFormat}
            />
          </Form.Item>
        </LoyaltyTitleLayout>
        <LoyaltyTitleLayout title={t("common.heading")}>
          <Form.Item
            name={"title"}
            rules={[
              {
                required: true,
                message: t("validations.required")
              },
              {
                max: formsConstantsValidation.entity.loyalty.max,
                message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.loyalty.max })
              },
              {
                min: formsConstantsValidation.entity.loyalty.min,
                message: t("validations.minLengthLess", { min: formsConstantsValidation.entity.loyalty.min })
              }
            ]}
          >
            <Input placeholder={t("common.text")} disabled={false} />
          </Form.Item>
        </LoyaltyTitleLayout>
        <LoyaltyTitleLayout title={t("loyalty.desc")}>
          <Form.Item
            rules={[
              {
                required: true,
                message: t("validations.required")
              },
              {
                max: formsConstantsValidation.textarea.max.loyalty,
                message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.textarea.max.loyalty })
              }
            ]}
            name={"description"}
          >
            <TextArea rows={4} placeholder={t("loyalty.desc")} disabled={false} />
          </Form.Item>
        </LoyaltyTitleLayout>
        <LoyaltyTitleLayout title={t("common.image")}>
          <ImgFormBlock>
            <ImageUpload
              form={form}
              label={""}
              updateImage={imageUrl}
              name={"imageUploader"}
              action={`${process.env.REACT_APP_ADMIN}/Loyalty/AddImage`}
              entity={{ width: 1029, height: 462, size: 2 }}
              mimeTypes={["image/png", "image/jpg", "image/jpeg"]}
            />
          </ImgFormBlock>
        </LoyaltyTitleLayout>
      </FirstBlock>
      <SecondBlock>
        <ImgBlock>
          <LoyaltyFormTitle style={{ marginBottom: "8px" }}>{t("loyaltyForm.firstStep.exampleTitle")}</LoyaltyFormTitle>
          <Image preview={false} src={promotionExample} alt={"promotionExample"} />
        </ImgBlock>
      </SecondBlock>
    </MainBlock>
  );
};

const MainBlock = styled.div`
  display: flex;
  grid-gap: 80px;
`;

const FirstBlock = styled.div`
  @media screen and (max-width: 1250px) {
    width: 40%;
  }
`;

const DividerBlock = styled.div`
  display: flex;
  width: inherit;
  align-items: center;
  grid-gap: 16px;
  padding-right: 28px;
`;

const DownLoadBlock = styled.div`
  margin-top: 30px;
  display: flex;
  grid-gap: 40px;
`;

const SecondBlock = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 40px;
`;

const ImgFormBlock = styled.div`
  display: flex;
  grid-gap: 40px;
`;

const ImgBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
