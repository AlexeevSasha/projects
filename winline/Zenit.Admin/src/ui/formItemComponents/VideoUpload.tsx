import { FC, useEffect, useMemo, useState } from "react";
import { Form, FormInstance, Typography, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { IConfigImage } from "../../api/dto/IConfigImage";
import { getToken } from "../../common/helpers/getToken";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";

const { Text } = Typography;

interface IProps {
  updateVideo?: string | null;
  label: string;
  form: FormInstance;
  name: any;
  action: string;
  entity: IConfigImage;
  mimeTypes: string[];
  disabled?: boolean;
  config?: IConfigImage | null;
  initialValue?: string | null;
  validationDependence?: boolean;
  accept?: string;
  required?: boolean;
  changedType?: boolean;
  clearChangedType?: () => void;
}

export const VideoUpload: FC<IProps> = ({
  updateVideo,
  label,
  form,
  name,
  action,
  entity,
  mimeTypes,
  disabled,
  config,
  initialValue,
  validationDependence,
  accept,
  required = true,
  changedType,
  clearChangedType
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>("");
  const [updatedVideo, setUpdatedVideo] = useState<string | null>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isUploaded, setIsUploaded] = useState<boolean>();
  const [resetValidation, setResetValidation] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (changedType) {
      setVideoUrl(null);
      clearChangedType?.();
      setLoading(false);
    }
    clearChangedType?.();
  }, [changedType]);

  useEffect(() => {
    setResetValidation(true);
    setVideoUrl("");
  }, [validationDependence]);

  useEffect(() => {
    if (videoUrl) {
      setUpdatedVideo(null);
    } else {
      setUpdatedVideo(`${updateVideo}`);
      data.src = `${updateVideo}`;
    }
  }, [videoUrl, updateVideo]);

  const data = document.createElement("video");

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      form.setFieldsValue({ [name]: null });
      setVideoUrl(null);
      setUpdatedVideo(null);
      setIsUploaded(false);

      return;
    }

    if (info.file.status === "done") {
      data.src = info.file.response;
      if (info.file.type && info.file.size) {
        const isAllowedType = mimeTypes.includes(info.file.type);
        const isLtSize = info.file.size / 1024 / 1024 < (entity.size || 10);

        data.onloadedmetadata = () => {
          const isEqWH = entity.height === data.videoHeight && entity.width === data.videoWidth;
          if (!isEqWH) {
            setResetValidation(false);
            setTimeout(() => setResetValidation(true), 4000);
          }
          if (isEqWH && isAllowedType && isLtSize) {
            setVideoUrl(data.src);
            setIsUploaded(true);
            form.setFieldsValue({ [name]: data.src });
          }

          setIsValid(isEqWH && isAllowedType && isLtSize);
        };
      }
    } else {
      setResetValidation(false);
      form.resetFields([name]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isUploaded === false && resetValidation) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isUploaded, resetValidation, loading]);

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
            accept={accept}
            action={process.env.REACT_APP_API + action}
            maxCount={1}
            headers={{
              Authorization: `Bearer ${getToken()}`
            }}
            showUploadList={false}
            onChange={handleChange}
            disabled={disabled}
          >
            {!loading && isValid && (videoUrl || updateVideo) ? (
              <StyledVideo>
                <source src={videoUrl || `${updatedVideo}`} />
              </StyledVideo>
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        {!disabled && (
          <Text type={isValid || resetValidation ? "secondary" : "danger"} style={{ paddingBottom: "20px" }}>
            {t("story.form.videoDesc", config || entity)}
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

const StyledVideo = styled.video`
  height: 100px;
`;
