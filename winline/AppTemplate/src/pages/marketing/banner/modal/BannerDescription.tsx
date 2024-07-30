import { useLayoutEffect, useState } from "react";
import { Checkbox, Descriptions, Divider, Drawer, Tag, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";
import { ButtonForImage } from "../components/CustomButton";
import { IBanner, IBannerButton } from "../../../../api/dto/content/IBanner";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { theme } from "../../../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StateType } from "../../../../core/redux/store";

const { Text, Title } = Typography;

interface IProps {
  onClose(): void;
  bannerDes: IBanner | null;
}

export const BannerDescription = ({ onClose, bannerDes }: IProps) => {
  const { t } = useTranslation();
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);

  const { deepLinks } = useSelector((state: StateType) => state.commons);

  useLayoutEffect(() => {
    const tt = document.getElementById("imageDes") as HTMLImageElement | null;
    if (tt) {
      tt.onload = () => {
        setImageHeight(tt?.clientHeight);
      };
    }
  }, [bannerDes?.additionalInfo?.image]);

  return (
    <Drawer
      title={t("common.id") + `${bannerDes?.id}`}
      headerStyle={{ borderBottom: "none" }}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!bannerDes}
      width={560}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.title")}>{bannerDes?.name}</Descriptions.Item>
        <Descriptions.Item label={t("common.status")}>
          {bannerDes?.contentStatus && t(`common.statuses.${bannerDes?.contentStatus.toLowerCase()}`)}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>{getFormatedDate(bannerDes?.createdUtc)}</Descriptions.Item>
        <Descriptions.Item label={t("marketing.publishBefore")}>
          {bannerDes?.publishBefore ? getFormatedDate(bannerDes?.publishBefore) : t("marketing.indefinitely")}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.image")}>
          <UploadCustom>
            {bannerDes?.additionalInfo?.image ? (
              <>
                <span style={{ position: "absolute", top: -30 }}>
                  <ButtonForImage formValues={bannerDes} srcData={bannerDes?.additionalInfo?.image} imageHeight={imageHeight} />
                </span>
                <ImageSource id="imageDes" style={{ width: "inherit" }} src={bannerDes?.additionalInfo?.image} />
              </>
            ) : (
              <UploadText>
                <PictureOutlined />
                <Text type={"secondary"}>none</Text>
              </UploadText>
            )}
          </UploadCustom>
        </Descriptions.Item>
      </Descriptions>
      {bannerDes?.additionalInfo?.bannerInfo?.map((button: IBannerButton, i: number) => (
        <div key={i}>
          <Divider />
          <Descriptions column={1} title={t("common.button") + " " + `${i + 1}`}>
            <Descriptions.Item label={t("common.textButton")}>{button.title}</Descriptions.Item>
            {bannerDes?.additionalInfo?.bannerInfo.length === 1 && (
              <Descriptions.Item label={t("marketing.banner.halfScreen")}>
                <span>
                  <Checkbox checked={button?.fullWidth} disabled />
                </span>
              </Descriptions.Item>
            )}
            <Descriptions.Item label={t("marketing.buttonLink")}>
              {button.linkType === "DeepLink" ? (
                <span>{deepLinks.find((link) => link.link === button.linkValue)?.name}</span>
              ) : (
                <span>{button.linkValue}</span>
              )}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions column={3}>
            <Descriptions.Item label={t("marketing.banner.indent") + " X"}>{button.xPoint + "%"}</Descriptions.Item>
            <Descriptions.Item label={t("marketing.banner.indent") + " Y"}>{button.yPoint + "%"}</Descriptions.Item>
            <Descriptions.Item label={t("marketing.banner.height") + " " + t("marketing.banner.button")}>
              {button.length + "%"}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions column={2}>
            <Descriptions.Item label={t("marketing.banner.textColor") + " " + t("marketing.banner.button")}>
              <Tag
                title={button.color}
                style={{ fontSize: "12px", padding: "10px 20px", border: `1px solid ${theme.colors.middleGray}` }}
                color={button.color}
              />
            </Descriptions.Item>
            <Descriptions.Item label={t("marketing.banner.backgroundColor") + " " + t("marketing.banner.button")}>
              <Tag
                title={button.backGroundColor}
                style={{ fontSize: "12px", padding: "10px 20px", border: `1px solid ${theme.colors.middleGray}` }}
                color={button.backGroundColor}
              />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions column={1}>
            <Descriptions.Item label={t("marketing.banner.transparent")}>
              <span>
                <Checkbox checked={button?.transparentBackGround} disabled />
              </span>
            </Descriptions.Item>
          </Descriptions>
        </div>
      ))}
    </Drawer>
  );
};

const ImgBlockText = styled.div<{ long?: boolean }>`
  width: 100%;
  padding-bottom: 10px;
`;

const ButtonItems = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UploadCustom = styled.div`
  position: relative;
  background: ${theme.colors.lightGrayWhite};
  border: 1px dashed ${theme.colors.grayLightWhite};
  width: 100%;
  min-height: 124px;
`;

const UploadText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30%;
  left: 35%;

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
  ${SourceStyles};
  width: 512px !important;
`;
