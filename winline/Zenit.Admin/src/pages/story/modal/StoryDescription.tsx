import "video-react/dist/video-react.css";
import { useMemo, useState } from "react";
import { Checkbox, Descriptions, Divider, Drawer, Image, Modal, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import styled from "styled-components";
import type { IStory } from "../../../api/dto/content/story/story";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { useTranslation } from "react-i18next";
import { theme } from "../../../assets/theme/theme";
import { StateType } from "../../../core/redux/store";
import { useSelector } from "react-redux";
import { LinkTypes } from "../../../common/helpers/story/LinkTypes";
import { ControlBar, Player } from "video-react";

const { Text } = Typography;

interface IProps {
  onClose(): void;
  story: IStory | null;
}

export const StoryDescription = ({ onClose, story }: IProps) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [sourceUrl, setSourceUrl] = useState<string>();
  const [sourceType, setSourceType] = useState<string>();
  const { deepLinks } = useSelector((state: StateType) => state.commons);

  const linkName = deepLinks.find((item) => story?.additionalInfo?.linkValue === item?.link);

  const handleCancel = () => {
    setOpenModal(false);
    setSourceUrl("");
    setSourceType("");
  };

  const CurrentModal = () => {
    return (
      <Modal style={{ top: "20px", maxHeight: "800px" }} open={openModal} title={t("common.view")} footer={null} onCancel={handleCancel}>
        {sourceType === "video" ? (
          <Player muted autoPlay width={450} src={sourceUrl}>
            <ControlBar autoHide={false} />
          </Player>
        ) : (
          <img alt="story" style={{ width: "100%" }} src={sourceUrl} />
        )}
      </Modal>
    );
  };

  const storyComponents = useMemo(
    () =>
      story?.additionalInfo?.component?.map((component, i) => (
        <div key={i}>
          <Divider />
          <Descriptions column={1} title={t("story.additional") + " " + `${i + 1}`}>
            <Descriptions.Item label={t("common.heading")}>{component.title}</Descriptions.Item>
            <Descriptions.Item label={t("common.text")}>{component.text}</Descriptions.Item>
            <Descriptions.Item label={t("common.textButton")}>{component.textButton ?? "-"}</Descriptions.Item>
            <Descriptions.Item label={t("story.description.buttonLink")}>
              {component.linkType === LinkTypes.DeepLink ? (
                deepLinks.find((link) => link.link === component.linkValue)?.link ?? "-"
              ) : (
                <a href={component.linkValue ?? ""}>{component.linkValue ?? "-"}</a>
              )}
            </Descriptions.Item>
            {component.imageUrl && (
              <>
                <Descriptions.Item label={t("common.image")}>{component.imageUrl ? t("common.yes") : t("common.no")}</Descriptions.Item>
                <Descriptions.Item>
                  <Image
                    key={i}
                    onClick={() => {
                      setOpenModal(true);
                      setSourceUrl(component.imageUrl);
                      setSourceType("image");
                    }}
                    preview={{ visible: false }}
                    width={"100px"}
                    src={component.imageUrl}
                  />
                  <CurrentModal />
                </Descriptions.Item>
              </>
            )}
            {component.videoUrl && (
              <>
                <Descriptions.Item label={t("story.video")}>
                  {component.videoUrl && (
                    <a
                      onClick={() => {
                        setOpenModal(true);
                        setSourceUrl(component.videoUrl);
                        setSourceType("video");
                      }}
                    >
                      {t("common.view")}
                    </a>
                  )}
                  <CurrentModal key={i} />
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        </div>
      )),
    [story]
  );

  return (
    <Drawer title={t("story.description.title")} closable={true} destroyOnClose={true} onClose={onClose} visible={!!story} width={560}>
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.id")}>{story?.id}</Descriptions.Item>
        <Descriptions.Item label={t("common.status")}>
          {story?.contentStatus && t(`common.statuses.neutral.${story?.contentStatus.toLowerCase()}`)}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>{getFormatedDate(story?.createdUtc)}</Descriptions.Item>
        <Descriptions.Item label={t("story.publishedBefore")}>{getFormatedDate(story?.endPublication)}</Descriptions.Item>
        <Descriptions.Item label={t("story.autoPlay")}>
          <span>
            <Checkbox checked={story?.additionalInfo?.isAutoPlayStory} disabled />
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t("common.heading") + " " + t("story.preview").toLowerCase()}>
          {story?.additionalInfo?.previewTitle ? story?.additionalInfo?.previewTitle : t("common.missing")}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.image") + " " + t("story.preview").toLowerCase()}>{""}</Descriptions.Item>
        <Descriptions.Item>
          <UploadCustom>
            {story?.additionalInfo?.imageMiniUrl ? (
              <>
                <Image
                  onClick={() => {
                    setOpenModal(true);
                    setSourceUrl(story.additionalInfo.imageMiniUrl);
                    setSourceType("image");
                  }}
                  preview={{ visible: false }}
                  width={"100px"}
                  src={story?.additionalInfo?.imageMiniUrl}
                />
                <CurrentModal />
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
      <Divider />
      <Descriptions column={1} title={t("story.main")}>
        <Descriptions.Item label={t("common.heading")}>{story?.name}</Descriptions.Item>
        <Descriptions.Item label={t("common.text")}>{story?.additionalInfo?.text}</Descriptions.Item>
        <Descriptions.Item label={t("common.textButton")}>{story?.additionalInfo?.textButton ?? "-"}</Descriptions.Item>
        <Descriptions.Item label={t("story.description.buttonLink")}>
          {story?.additionalInfo?.linkType === LinkTypes.HyperLink ? (
            <a href={story?.additionalInfo.linkValue ?? ""}>{story?.additionalInfo.linkValue ?? "-"}</a>
          ) : (
            linkName?.link ?? "-"
          )}
        </Descriptions.Item>
        {story?.additionalInfo?.imageUrl && (
          <>
            <Descriptions.Item label={t("common.image")}>
              {story?.additionalInfo.imageUrl ? t("common.yes") : t("common.no")}
            </Descriptions.Item>
            <Descriptions.Item>
              <Image
                onClick={() => {
                  setOpenModal(true);
                  setSourceUrl(story.additionalInfo.imageUrl);
                  setSourceType("image");
                }}
                preview={{ visible: false }}
                width={"100px"}
                src={story?.additionalInfo?.imageUrl}
              />
              <CurrentModal />
            </Descriptions.Item>
          </>
        )}
        {story?.additionalInfo?.videoUrl && (
          <>
            <Descriptions.Item label={t("story.video")}>
              {story?.additionalInfo.videoUrl && (
                <a
                  onClick={() => {
                    setOpenModal(true);
                    setSourceUrl(story.additionalInfo.videoUrl);
                    setSourceType("video");
                  }}
                >
                  {t("common.view")}
                </a>
              )}
              <CurrentModal />
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
      {storyComponents}
    </Drawer>
  );
};

const UploadCustom = styled.div`
  position: relative;
  background: ${theme.colors.lightGrayWhite};
  border: 1px dashed ${theme.colors.grayLightWhite};
  width: 100px;
  min-height: 100px;
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

const CustomLink = styled.a`
  color: gray !important;
  text-decoration: none;
`;
