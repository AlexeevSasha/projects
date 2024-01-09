import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Tabs, Tag, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { mediaActions } from "store/media/media";
import { draftMedia, getMediaById, publishMedia } from "store/media/mediaActionAsync";
import { mediaSelector } from "store/media/mediaSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { CustomDivider } from "ui/CustomDivider";
import { HeaderText } from "ui/HeaderText";
import { InfoForm } from "./InfoForm";
import { PictureForm } from "./PictureForm";
import { TextForm } from "./TextForm";
import { VideoForm } from "./VideoForm";
import { getClubsTeamsByFilter } from "../../store/clubsTeams/clubsTeamsActionAsync";
import { TeamType } from "../../common/interfaces/teams";
import { getMediaSection } from "common/constants/media";
import { rightsSelector } from "store/auth/authSelectors";

const { Header, Content } = Layout;
const { Title } = Typography;

export const MediaForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.includes("create");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const media = useSelector(mediaSelector);
  const rights = useSelector(rightsSelector);
  const Section = getMediaSection(rights);

  const handleTabClick = (key: string) =>
    navigate(`/${routePaths.media}/${routePaths.form.edit(id || "create")}/${key}`);

  const publishDraftMethod = (draft?: boolean) => {
    Modal.confirm({
      title: <HeaderText>{t(`allPages.${draft ? "hideConfirmTitle" : "confirmTitle"}`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`media.${draft ? "hideConfirmText" : "confirmText"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () => {
        media?.Id &&
          dispatch((draft ? draftMedia : publishMedia)(media?.Id))
            .unwrap()
            .then(() => {
              dispatch(
                noticeActions.add({
                  message: t(`allPages.${draft ? "successHide" : "successPublish"}`),
                  closable: true,
                })
              );
              navigate(`/${routePaths.media}`);
            });
      },
    });
  };

  useEffect(() => {
    dispatch(
      getClubsTeamsByFilter({
        Status: "Published",
        TeamType: TeamType.own,
        pageSize: 100,
        // DisplayTeamInTheMedia: "true",
        Section,
      })
    );
  }, []);

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getMediaById(id));
    }

    return () => {
      dispatch(mediaActions.resetMedia());
    };
  }, [id]);

  const isPlanned = media && new Date(media?.PublishDateTime).getTime() > Date.now();

  return (
    <>
      <HeaderContent>
        <HeaderTop>
          <TitleContainer>
            <CustomLink to={`/${routePaths.media}`}>
              <ArrowLeftOutlined />
              <span>{t("media.back")}</span>
            </CustomLink>

            <CustomDivider type="vertical" />

            {media ? (
              <CardTitle level={4}>
                <CustomTitle title={media?.MediaHeader?.Ru || t("media.newsHeader")}>
                  {media?.MediaHeader?.Ru || t("media.newsHeader")}
                </CustomTitle>

                <Status>
                  <Tag color={media?.IsDraft ? "cyan" : isPlanned ? "gold" : "green"}>
                    {t(`allPages.statuses.${media?.IsDraft ? "Draft" : isPlanned ? "Planned" : "Published"}`)}
                  </Tag>
                </Status>
              </CardTitle>
            ) : isCreate ? (
              <CardTitle level={4}>{t("media.newsHeader")}</CardTitle>
            ) : null}
          </TitleContainer>

          <ButtonContainer>
            <Button onClick={() => navigate(`/${routePaths.media}`)}>{t(`allPages.buttonsText.cancel`)}</Button>

            <Button
              style={{ color: theme.colors.red1, borderColor: theme.colors.red1 }}
              onClick={() => publishDraftMethod(true)}
            >
              {t(`allPages.buttonsText.draft`)}
            </Button>

            <Button type="primary" form="mediaForm" htmlType="submit">
              {t(`allPages.buttonsText.publish`)}
            </Button>
          </ButtonContainer>
        </HeaderTop>

        <Tabs defaultActiveKey={pathname.split("/").slice(-1)[0]} onChange={handleTabClick}>
          <Tabs.TabPane tab={t("media.info")} key="info" />
          <Tabs.TabPane tab={t("media.text")} key="text" />
          <Tabs.TabPane tab={t("media.photo")} key="photo" />
          <Tabs.TabPane tab={t("media.video")} key="video" />
        </Tabs>
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <FormWrapper>
          <Routes>
            <Route path="info" element={<InfoForm publishDraftMethod={publishDraftMethod} />} />
            <Route path="text" element={<TextForm publishDraftMethod={publishDraftMethod} />} />
            <Route path="photo" element={<PictureForm publishDraftMethod={publishDraftMethod} />} />
            <Route path="video" element={<VideoForm publishDraftMethod={publishDraftMethod} />} />
          </Routes>
        </FormWrapper>
      </Content>
    </>
  );
});

const HeaderContent = styled(Header)`
  padding: 12px 24px 0;
  background: ${theme.colors.white};
  height: auto;

  #root & > div:nth-child(2) > div:first-child {
    margin: 0;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  height: 36px;
`;

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;

const CardTitle = styled(Title)`
  margin-bottom: 0 !important;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CustomTitle = styled.div`
  height: 28px;
  cursor: help;
  overflow: hidden;
`;

const FormWrapper = styled.div`
  background: ${theme.colors.white};
  padding: 24px 128px 24px 24px;
  overflow: auto;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
`;
