import React, { FC, useEffect, useMemo, useState } from "react";
import { Button, Form, FormInstance, message, Typography, Upload } from "antd";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { IConfigImage } from "../../api/dto/IConfigImage";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/lib/upload/interface";
import { getToken } from "../../common/helpers/getToken";
import { Loader } from "../Loader";

const { Text } = Typography;

interface IProps {
  label: string;
  form: FormInstance;
  name: string;
  action: string;
  maxCount?: number;
  mimeTypes: string[];
  disabled?: boolean;
  types: string;
  setValue: Function;
  fileList?: UploadFile<any>[];
}

export const FileUpload: FC<IProps> = ({ label, form, name, action, mimeTypes, maxCount, disabled, types, setValue, fileList }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      form.setFieldsValue({ [name]: null });

      return;
    }
    if (info.file.status === "done") {
      form.setFieldsValue({ [name]: info.file.response });
      setValue(info.file.response);
      setVisible(true);
    } else {
      form.resetFields([name]);
      setVisible(false);
    }
    if (info.file.status === "error") {
      setIsValid(false);
      setVisible(true);
    }

    setLoading(false);
  };

  const beforeUpload = async (file: { type: string; size: number }) => {
    const isAllowedType = mimeTypes.includes(file.type);

    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);

      reader.onload = () => {
        if (!isAllowedType) {
          setIsValid(false);
          message.error(t("validations.invalidTypeFile", { types }));
        }
        setIsValid(isAllowedType);
        resolve(isAllowedType);
      };
    });
  };

  const validationFile = async () => {
    if (!isValid) {
      return Promise.reject();
    }

    return Promise.resolve();
  };

  return (
    <>
      <ContainerStyled>
        <Form.Item
          name={name}
          label={label}
          required={false}
          rules={[{ required: disabled === false ? true : false, message: t("validations.required") }, { validator: validationFile }]}
        >
          <Upload
            name="formFile"
            action={process.env.REACT_APP_API + action}
            headers={{
              Authorization: `Bearer ${getToken()}`
            }}
            disabled={disabled}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            maxCount={maxCount}
            showUploadList={isValid || visible ? true : false}
            fileList={fileList}
          >
            {loading && <Loader />}
            <Button danger={isValid ? false : true} disabled={disabled} icon={<UploadOutlined />}>
              Импорт
            </Button>
          </Upload>
        </Form.Item>
      </ContainerStyled>
    </>
  );
};

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
