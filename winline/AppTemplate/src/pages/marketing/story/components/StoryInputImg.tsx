/* eslint-disable no-unused-expressions */
import React, { FC, useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { FormInstance, Typography } from "antd";
import { theme } from "../../../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { validationSourceFormat, validationSourceSizes } from "../../../../common/helpers/story/validationStory";

const { Text } = Typography;

interface IProps {
  src?: string;
  storyForUpdateImage: string | File | undefined;
  imgText: string;
  setSizeError: Function;
  setAcceptError: Function;
  setSrsData?: Function;
  form: FormInstance;
  fieldName: string | string[] | any;
  mini?: boolean;
  bannerImg?: boolean;
}

interface BannerImgProps {
  banner?: boolean;
}

export const StoryInputImg: FC<IProps> = ({
  src,
  storyForUpdateImage,
  imgText,
  setSizeError,
  setAcceptError,
  setSrsData,
  form,
  fieldName,
  mini,
  bannerImg
}) => {
  const { t } = useTranslation();
  const [imageValue, setImageValue] = useState("");

  const addImage = useCallback(
    async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const file = target.files?.[0];
      if (file) {
        // 100MB (в байтах) и размер 1080Х1920
        if (await validationSourceFormat(file, mini)) {
          setSizeError({ size: false, mini: false });
          setAcceptError(true);
          setImageValue("");
        } else if (!(await validationSourceSizes(file, mini, bannerImg))) {
          setAcceptError(false);
          setSizeError({ size: true, mini: mini });
          setImageValue("");
        } else {
          if (typeof fieldName === "string") {
            form.validateFields([fieldName]);
            form.setFieldsValue({ [fieldName]: file });
          } else {
            form.validateFields(fieldName);
            form.setFieldValue(fieldName, file);
          }
          src && URL.revokeObjectURL(src);
          setSizeError({ size: false, mini: false });
          setAcceptError(false);
          setSrsData?.({ src: URL.createObjectURL(file), file });
        }
      } else {
        setSrsData?.({ src: "", file: null });
      }
      setTimeout(() => setSizeError({ size: false, mini: false }), 6000);
      setTimeout(() => setAcceptError(false), 6000);
    },
    [setAcceptError, setSizeError, mini, fieldName, form]
  );

  return (
    <LabelContainer banner={bannerImg ? true : false}>
      <Text>{imgText}</Text>
      <UploadCustom banner={bannerImg ? true : false}>
        <input
          accept={mini ? ".jpeg, .jpg, .png" : ".jpg, .jpeg, .png, .gif"}
          onChange={(e) => {
            addImage(e);
            setImageValue(e.target.value);
          }}
          value={imageValue}
          id={mini ? "fileImage" : "fileImageMini"}
          type="file"
          style={{ display: "none" }}
        />
        {!src && !storyForUpdateImage ? (
          <UploadText banner={bannerImg ? true : false}>
            <PlusOutlined />
            <Text type={"secondary"}>{t("common.upload")}</Text>
          </UploadText>
        ) : (
          <ImageSource id="customImg" src={src || `${storyForUpdateImage}`} />
        )}
      </UploadCustom>
    </LabelContainer>
  );
};

const LabelContainer = styled.label<BannerImgProps>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: ${(props) => (props.banner ? "100%" : "124px")};

  & > span {
    margin-bottom: 8px;
  }
`;

const UploadCustom = styled.div<BannerImgProps>`
  position: relative;
  background: ${theme.colors.grayLightWhite};
  border: 1px dashed ${theme.colors.grayLightWhite};
  width: ${(props) => (props.banner ? "512px" : "124px")};
  min-height: 124px;
`;

const UploadText = styled.div<BannerImgProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30%;
  left: ${(props) => (props.banner ? "45%" : "25%")};

  & svg {
    margin-bottom: 10px;
    width: 32px;
    height: 32px;
    fill: ${theme.colors.middleGray};
  }
`;

const SourceStyles = css`
  width: inherit;
  height: inherit;
  object-fit: cover;
`;

const ImageSource = styled.img`
  ${SourceStyles}
`;
