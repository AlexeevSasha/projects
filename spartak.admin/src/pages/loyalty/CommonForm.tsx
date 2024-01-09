import { DatePicker, Form, Input, Typography } from "antd";
import { imageRepository } from "api/imageRepository";
import { loyaltyRepository } from "api/loyaltyRepository";
import { required } from "common/helpers/validators/required";
import { requiredMinMax } from "common/helpers/validators/requiredMinMax";
import moment from "moment";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { RowLabel } from "ui/RowLabel";
import { Wysiwyg } from "ui/Wisiwyg/Wysiwyg";

export const CommonForm = () => {
  const { t } = useTranslation();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [["link"]],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <Container>
      <Content>
        <FormItem
          name="Name"
          label={<RowLabel label={t("loyalty.name")} prompt={t("loyalty.systemName")} />}
          rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 64) }]}
        >
          <Input placeholder={t("loyalty.text")} />
        </FormItem>

        <FormItem name="DateRange" rules={[{ validator: required }]} label={<RowLabel label={t("loyalty.date")} />}>
          <DatePicker.RangePicker
            showTime
            placeholder={[t("loyalty.startDate"), t("loyalty.endDate")]}
            disabledDate={(date) => +date - +moment().set({ seconds: -1 }) < 0}
          />
        </FormItem>

        <FormItem
          name="Title"
          label={<RowLabel label={t("loyalty.loyaltyTitle")} />}
          rules={[{ validator: (_, value) => requiredMinMax(_, value, 4, 64) }]}
        >
          <Input placeholder={t("loyalty.text")} />
        </FormItem>

        <FormItem
          name="Description"
          label={<RowLabel label={t("loyalty.desc")} />}
          rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 3000) }]}
        >
          <Wysiwyg
            uploadRequest={imageRepository.upload}
            placeholder={t("loyalty.desc")}
            customModulse={modules}
            height={"150px"}
          />
        </FormItem>

        <FormItem
          name="ImageUrl"
          rules={[{ validator: required }]}
          required={true}
          label={<RowLabel label={t("loyalty.image")} />}
        >
          <ImageField
            validation={{
              width: 1029,
              height: 462,
              size: 2048,
              format: ["png"],
              exact: true,
            }}
            uploadRequest={loyaltyRepository.addImage}
            removeRequest={loyaltyRepository.deleteImage}
          />
        </FormItem>

        <FormItem label={<RowLabel label={""} />} style={{ marginTop: -40 }}>
          <Typography.Text type="secondary" style={{ fontSize: 13, maxWidth: 300 }}>
            {t("allPages.form.uploadDesc", {
              format: "png",
              width: "1029",
              height: "462",
              size: "2",
            })}
          </Typography.Text>
        </FormItem>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: 570px;

  & .ant-form-item {
    justify-content: space-between;
  }

  & textarea {
    height: 120px;
  }
`;

const ImgWrapper = styled.div`
  margin-left: 80px;

  & > div:first-child {
    font-size: 14px;
    color: #0e2833;
    margin-bottom: 8px;
  }
`;

export const FormItem = styled(Form.Item)`
  grid-gap: 40px;

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
      content: unset;
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
    display: none;
  }
`;
