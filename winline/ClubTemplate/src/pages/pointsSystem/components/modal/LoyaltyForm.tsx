import React, { useEffect } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Button, DatePicker, Drawer, Form, InputNumber } from "antd";
import type { ILoyaltyProgram } from "../../../../api/dto/pointsSystem";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";

interface IProps {
  data: ILoyaltyProgram | null;
  onClose: () => void;
  onSave: (payload: ILoyaltyProgram) => void;
  visible: boolean;
}

const { RangePicker } = DatePicker;

const LoyaltyForm = ({ data, onClose, onSave, visible }: IProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue({
      points: data?.points,
      rangeDate: [moment(data?.startDate), moment(data?.endDate)]
    });
  }, [data, form]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      const dataInPayload = { startDate: values.rangeDate[0].toISOString(), endDate: values.rangeDate[1].toISOString(), ...values };
      delete dataInPayload["rangeDate"];
      onSave({ id: data?.id, ...dataInPayload });
    });
  };

  return (
    <Drawer
      title={t("common.buttonsText.edit") + " - " + t(`pointsSystem.loyalty.${data?.type}`)}
      closable={false}
      destroyOnClose={true}
      onClose={onClose}
      visible={visible}
      width={370}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t("pointsSystem.loyalty.points")}
          required={false}
          name={"points"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={formsConstantsValidation.default.minCount}
            max={formsConstantsValidation.default.maxCount}
            size={"middle"}
          />
        </Form.Item>
        <Form.Item
          required={false}
          label={t("pointsSystem.loyalty.rangeDate")}
          name={"rangeDate"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
        >
          <RangePicker format={formsConstantsValidation.dateTimeFormat} showTime />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default LoyaltyForm;
