import { Button, Form, Image, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../core/redux/store";
import { updateImageInfoPageThunk } from "../../../../../modules/content/infoPage/imageInfoPage/imageInfoPageActionAsync";

interface IProps {
  setImgData?: any | null;
  imgData: any;
}

export const ImageModalForm = React.memo(({ setImgData, imgData }: IProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.resetFields();
  }, [imgData]);

  const handleCancel = () => {
    form.resetFields();
    setImgData(null);
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(
        updateImageInfoPageThunk({
          ...imgData,
          ...values
        })
      );
      handleCancel();
    });
  };

  return (
    <>
      <Modal
        visible={imgData !== null}
        onCancel={handleCancel}
        onOk={handleOk}
        title={t("common.buttonsText.edit") + " " + t("common.image").toLowerCase()}
        width={425}
        footer={[
          <>
            <Button onClick={() => handleCancel()} disabled={!imgData}>
              {t("common.buttonsText.cancel")}
            </Button>
            <Button type="primary" htmlType={"submit"} onClick={handleOk} disabled={!imgData}>
              {t("common.buttonsText.save")}
            </Button>
          </>
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <Image preview={false} width={200} src={imgData && imgData?.additionalInfo.path} style={{ marginBottom: "16px" }} />
          <Form form={form} layout="vertical">
            <Form.Item label={t("marketing.infoPages.form.fileName")} required={false} name={"name"} initialValue={imgData?.name}>
              <Input size={"middle"} maxLength={150} />
            </Form.Item>
            <Form.Item label={t("marketing.infoPages.tag")} required={false} name={"tag"} initialValue={imgData?.tag}>
              <Input size={"middle"} maxLength={150} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
});
