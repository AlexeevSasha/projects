import { useMemo } from "react";
import { Checkbox, Descriptions, Divider, Drawer, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";
import { IStory } from "../../../../api/dto/content/IStory";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { theme } from "../../../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { StateType } from "../../../../core/redux/store";
import { useSelector } from "react-redux";

const { Text, Title } = Typography;

interface IProps {
  onClose(): void;
  story: IStory | null;
}

export const StoryDescription = ({ onClose, story }: IProps) => {
  const { t } = useTranslation();
  const { deepLinks } = useSelector((state: StateType) => state.commons);

  const linkName = deepLinks.find((item) => story?.additionalInfo?.linkValue === item?.link);

  const storyComponents = useMemo(
    () =>
      story?.additionalInfo?.componentInfo?.map((component, i) => (
        <div key={i}>
          <Divider />
          <Descriptions column={1}>{t("marketing.story.description.componentsTitle") + " " + `${i + 1}`}</Descriptions>
          <Descriptions.Item label={t("common.heading")}>{component.title}</Descriptions.Item>
          <Descriptions.Item label={t("common.text")}>{component.text}</Descriptions.Item>
          {component.linkValue && (
            <Descriptions.Item label={t("common.link")}>
              {component.linkType === "DeepLink" ? (
                <span>{deepLinks.find((link) => link.link === component.linkValue)?.name}</span>
              ) : (
                <span>{component.linkValue}</span>
              )}
            </Descriptions.Item>
          )}
          {component.textButton && <Descriptions.Item label={t("common.textButton")}>{component.textButton}</Descriptions.Item>}
          <Descriptions.Item label={t("marketing.story.description.additionalImage") + " " + "1080х1920"}>
            <UploadCustom>
              <ImageSource style={{ width: "inherit" }} src={component.imageId} />
            </UploadCustom>
          </Descriptions.Item>
        </div>
      )),
    [story]
  );

  return (
    <Drawer
      title={t("common.id") + ": " + `${story?.id}`}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!story}
      width={560}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.status")}>
          {story?.contentStatus && t(`common.statuses.${story?.contentStatus.toLowerCase()}`)}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>{getFormatedDate(story?.createdUtc)}</Descriptions.Item>
        <Descriptions.Item label={t("marketing.publishBefore")}>
          {story?.publishBefore ? getFormatedDate(story?.publishBefore) : t("marketing.indefinitely")}
        </Descriptions.Item>
        <Descriptions.Item label={t("marketing.story.autoPlay")}>
          <span>
            <Checkbox checked={story?.additionalInfo?.isAutoPlayStory} disabled />
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t("marketing.story.crmTemplate")}>
          <span>
            <Checkbox checked={story?.additionalInfo?.isTemplate} disabled />
          </span>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.heading")}>{story?.name}</Descriptions.Item>
        <Descriptions.Item label={t("common.heading") + " " + t("marketing.story.preview")}>
          {story?.additionalInfo?.previewTitle ? story?.additionalInfo?.previewTitle : t("common.missing")}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.text")}>{story?.additionalInfo?.text}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        <Descriptions.Item label={t("marketing.buttonLink")}>
          {story?.additionalInfo.linkType === "HyperLink" ? (
            <CustomLink href={story?.additionalInfo.linkValue ?? ""}>{story?.additionalInfo.linkValue ?? "-"}</CustomLink>
          ) : (
            <span>{linkName?.name ?? "-"}</span>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.textButton")}>
          {story?.additionalInfo?.textButton ? story?.additionalInfo?.textButton : "-"}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <ImgBlock>
        <Descriptions layout="vertical" column={2}>
          <Descriptions.Item label={t("marketing.story.main")}>
            <UploadCustom>
              {story?.additionalInfo?.image ? (
                <ImageSource style={{ width: "inherit" }} src={story?.additionalInfo?.image} />
              ) : (
                <UploadText>
                  <PictureOutlined />
                  <Text type={"secondary"}>none</Text>
                </UploadText>
              )}
            </UploadCustom>
          </Descriptions.Item>
          <Descriptions.Item label={t("marketing.story.additional")}>
            <UploadCustom>
              {story?.additionalInfo.imageMini ? (
                <ImageSource style={{ width: "inherit" }} src={story?.additionalInfo.imageMini} />
              ) : (
                <UploadText>
                  <PictureOutlined />
                  <Text type={"secondary"}>none</Text>
                </UploadText>
              )}
            </UploadCustom>
          </Descriptions.Item>
        </Descriptions>
      </ImgBlock>
      {storyComponents}
    </Drawer>
  );
};

const ImgBlockText = styled.div<{ long?: boolean }>`
  width: ${(props) => (props.long ? "150px" : "100px")};
  padding-bottom: 10px;
`;

const ImgBlock = styled.div`
  display: flex;
  grid-gap: 10%;
`;

const UploadCustom = styled.div`
  position: relative;
  background: ${theme.colors.lightGrayWhite};
  border: 1px dashed ${theme.colors.grayLightWhite};
  width: 124px;
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
  ${SourceStyles}
`;

const CustomLink = styled.a`
  color: gray !important;
  text-decoration: none;
`;
