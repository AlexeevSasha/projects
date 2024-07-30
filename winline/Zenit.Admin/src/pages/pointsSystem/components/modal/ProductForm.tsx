import React, { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, InputNumber, Row } from "antd";
import { useTranslation } from "react-i18next";
import { ImageUpload } from "../../../../ui/formItemComponents/ImageUpload";
import type { IProduct } from "../../../../api/dto/pointsSystem";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";

interface IProps {
  data: IProduct | null;
  onClose: Function;
  onSave: (payload: IProduct, update?: boolean) => void;
  visible: boolean;
}

const entity = formsConstantsValidation.entity.product;
const uploadAction = `${process.env.REACT_APP_MOBILE}${process.env.REACT_APP_ADMIN}/product/image`;

const ProductForm = ({ data, onClose, onSave, visible }: IProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    form.resetFields();
    if (data) {
      form.setFieldsValue({
        name: data.name,
        total: data.total,
        priceInPoints: data.priceInPoints,
        image: data.image
      });
    }
  }, [data]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      if (data) {
        onSave({ id: data.id, ...values }, true);
      } else {
        onSave(values);
      }
      form.resetFields();
    });
  };

  return (
    <Drawer
      title={(data ? t("common.edit") : t("common.buttonsText.create")) + " " + t("pointsSystem.products.entity")}
      closable={false}
      destroyOnClose={true}
      onClose={closeDrawer}
      visible={visible}
      width={325}
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
          label={t("common.title")}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: entity.max,
              message: t("back:validations.MaxLengthExceeded", { max: entity.max })
            }
          ]}
          name={"name"}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              label={t("pointsSystem.products.priceInPoints")}
              required={false}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
              name={"priceInPoints"}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={formsConstantsValidation.default.minCount}
                max={formsConstantsValidation.default.maxCount}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("common.total")}
              required={false}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
              name={"total"}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={formsConstantsValidation.default.minCount}
                max={formsConstantsValidation.default.maxCount}
              />
            </Form.Item>
          </Col>
        </Row>
        <ImageUpload
          action={uploadAction}
          label={t("common.image")}
          updateImage={data?.image}
          form={form}
          name={"image"}
          entity={entity.image}
          mimeTypes={["image/jpeg", "image/png"]}
        />
      </Form>
    </Drawer>
  );
};

export default ProductForm;
