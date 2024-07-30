import { FC, useEffect, useMemo, useState } from "react";
import { Form, FormInstance, Typography, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { IConfigImage } from "../../api/dto/IConfigImage";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/lib/upload/interface";
import { getToken } from "../../common/helpers/getToken";

const { Text } = Typography;

interface IProps {
  updateImage?: string | null;
  label: string;
  form: FormInstance;
  name: any;
  action: string;
  entity: IConfigImage;
  mimeTypes: string[];
  disabled?: boolean;
  config?: IConfigImage | null;
  validationDependence?: boolean;
  initialValue?: string | null;
  orientation?: string;
  required?: boolean;
  accept?: string;
  changedType?: boolean;
  clearChangedType?: () => void;
}

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
  accept,
  initialValue,
  orientation = "horizontal",
  required = true,
  changedType,
  clearChangedType
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [resetValidation, setResetValidation] = useState<boolean>(validationDependence || false);

  useEffect(() => {
    setResetValidation(true);
    setImageUrl("");
  }, [validationDependence]);

  useEffect(() => {
    if (changedType) {
      setImageUrl(null);
      clearChangedType?.();
      setLoading(false);
    }
    clearChangedType?.();
  }, [changedType]);

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
  const { t } = useTranslation();

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
            if (!isAllowedType || !isLtSize || !isEqWH) {
              setResetValidation(false);
              setTimeout(() => setResetValidation(true), 4000);
            } else {
              setImageUrl(img.src);
            }
            setIsValid(isAllowedType && isLtSize && isEqWH);
            resolve(isAllowedType && isLtSize && isEqWH);
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
        <Form.Item
          name={name}
          label={label}
          required={false}
          initialValue={initialValue}
          rules={[{ required, message: t("validations.required") }]}
        >
          <Upload
            name="formFile"
            listType="picture-card"
            showUploadList={false}
            accept={accept}
            action={process.env.REACT_APP_API + action}
            headers={{
              Authorization: `Bearer ${getToken()}`
            }}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            disabled={disabled}
          >
            {!loading && isValid && (imageUrl || updateImage) ? (
              <StyledImage orientation={orientation} src={imageUrl || `${updateImage}`} alt="image" />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
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
const StyledImage = styled.img<{ orientation?: string }>`
  width: ${({ orientation }) => (orientation === "horizontal" ? "100%" : "auto")};
  height: ${({ orientation }) => (orientation === "horizontal" ? "auto" : "100px")};
`;
