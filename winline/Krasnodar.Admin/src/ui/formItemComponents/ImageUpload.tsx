import React, { FC, useEffect, useMemo, useState } from "react";
import { Form, FormInstance, Modal, Typography, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { IConfigImage } from "../../api/dto/IConfigImage";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadChangeParam } from "antd/lib/upload/interface";
import { getToken } from "../../common/helpers/getToken";

const { Text } = Typography;

const getBase64 = async (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface IProps {
  updateImage?: string | undefined;
  label: string;
  form: FormInstance;
  name: any;
  action: string;
  entity: IConfigImage;
  mimeTypes: string[];
  disabled?: boolean;
  config?: IConfigImage | null;
  validationDependence?: boolean;
  hasPreview?: boolean;
}

// eslint-disable-next-line complexity
export const ImageUpload: FC<IProps> = ({
  updateImage,
  label,
  form,
  name,
  action,
  entity,
  mimeTypes,
  disabled,
  config,
  validationDependence,
  hasPreview
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [removed, setRemoved] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [resetValidation, setResetValidation] = useState<boolean>(validationDependence || false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setResetValidation(true);
    setImageUrl("");
  }, [validationDependence]);

  useEffect(() => {
    if (hasPreview) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: updateImage
        }
      ]);
    }
  }, [updateImage]);

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      form.setFieldsValue({ [name]: null });

      return;
    }
    if (info.file.status === "done") {
      form.setFieldsValue({ [name]: info.file.response });
    } else {
      setResetValidation(false);
      form.resetFields([name]);
    }
    setLoading(false);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleRemove = async (info: UploadFile) => {
    setFileList([]);

    return new Promise<boolean>((resolve) => {
      setRemoved(true);
      resolve(removed);
    });
  };

  const beforeUpload = async (file: { type: string; size: number }) => {
    const isAllowedType = mimeTypes.includes(file.type);
    const isLtSize = file.size / 1024 / 1024 < (entity.size || 10);
    const image = !config ? entity : config;

    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);

      reader.onload = () => {
        const img = document.createElement("img");
        if (typeof reader.result === "string") {
          img.src = reader.result;
          img.onload = () => {
            const isEqWH = image.height === img.height && image.width === img.width;

            if (!isEqWH || !isAllowedType || !isLtSize) {
              setResetValidation(false);
              setTimeout(() => setResetValidation(true), 4000);
            } else {
              setImageUrl(img.src);
            }
            setIsValid(isEqWH && isAllowedType && isLtSize);
            resolve(isEqWH && isAllowedType && isLtSize);
          };
        }
      };
    });
  };

  const uploadButton = useMemo(() => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>{t("common.upload")}</div>
      </div>
    );
  }, [loading]);

  return (
    <>
      <ContainerStyled>
        <Form.Item name={name} label={label} required={false} rules={[{ required: true, message: t("validations.required") }]}>
          <Upload
            name="formFile"
            listType="picture-card"
            action={process.env.REACT_APP_API + action}
            headers={{
              Authorization: `Bearer ${getToken()}`
            }}
            showUploadList={!!hasPreview}
            fileList={hasPreview && updateImage && !imageUrl ? fileList : undefined}
            onRemove={hasPreview ? handleRemove : undefined}
            onPreview={hasPreview ? handlePreview : undefined}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            disabled={disabled}
          >
            {!loading && !hasPreview && isValid && (imageUrl || updateImage) ? (
              <img src={imageUrl || `${updateImage}`} alt="image" style={{ width: "100%" }} />
            ) : hasPreview && (imageUrl || (updateImage && !removed)) ? undefined : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        {hasPreview && (
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        )}
        {!disabled && (
          <Text type={isValid || resetValidation ? "secondary" : "danger"} style={{ paddingBottom: "20px" }}>
            {t("common.imagesDesc", config || entity)}
          </Text>
        )}
      </ContainerStyled>
    </>
  );
};

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
