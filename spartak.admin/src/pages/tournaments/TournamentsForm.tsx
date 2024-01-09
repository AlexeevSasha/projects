import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, Layout, Modal, Tabs, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { deepMerge } from "common/helpers/deepMerge";
import { Tournament } from "common/interfaces/tournaments";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import { tournamentSelector } from "store/tournaments/tournamentSelectors";
import { tournamentsActions } from "store/tournaments/tournaments";
import { draftTournaments, getTournamentById, publishTournaments } from "store/tournaments/tournamentsActionAsync";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { CustomDivider } from "../../ui/CustomDivider";
import { InfoForm } from "./InfoForm";
import { MembersForm } from "./MembersForm";
import { TableForm } from "./TabelForm";

const { Header, Content } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

export const TournamentsForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<Tournament>();
  const { t } = useTranslation();
  const [values, setValues] = useState<Tournament | undefined>();
  const dispatch = useAppDispatch();
  const tournament = useSelector(tournamentSelector);

  const closeForm = () => {
    form.resetFields();
    navigate(`/${routePaths.tournaments()}`);
  };

  const handleTabClick = (key: string) => {
    setValues(deepMerge({ ...values }, form.getFieldsValue()));
    navigate(`/${routePaths.tournaments(id || routePaths.form.create, key)}`);
  };

  const showConfirm = (draft: boolean = false) => {
    confirm({
      title: <HeaderText>{t(draft ? "allPages.hideConfirmTitle" : "allPages.confirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`tournaments.${draft ? "hideConfirm" : "publishConfirm"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft, true),
    });
  };

  const submitForm = async (draft: boolean = false, operation?: boolean) => {
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }
    dispatch(
      (draft ? draftTournaments : publishTournaments)(
        deepMerge<Tournament>({ ...values, Id: id, SortOrder: 10 }, form.getFieldsValue())
      )
    )
      .unwrap()
      .then(({ Id }) => {
        dispatch(
          noticeActions.add({
            message: t(`allPages.${draft ? "successHide" : "successPublish"}`),
            closable: true,
          })
        );
        !operation && dispatch(getTournamentById(Id));
        !isCreate && !!operation && navigate(`/${routePaths.tournaments()}`);
        isCreate && navigate(`/${routePaths.tournaments(Id, "info")}`);
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getTournamentById(id))
        .unwrap()
        .then((res) => setValues(res));
    }

    return () => {
      dispatch(tournamentsActions.resetTournament());
    };
  }, [id]);

  // Если на форме таблиц изменить параметр отображения таблицы, то его нужно сохранить в общую форму, чтобы при публикации не потерять
  useEffect(() => {
    setValues(deepMerge({ ...values, ShowTournamentTable: tournament?.ShowTournamentTable }, form.getFieldsValue()));
  }, [tournament]);

  console.log("tournament", tournament);

  return (
    <>
      <HeaderContent>
        <HeaderTop>
          <TitleContainer>
            <CustomLink to={`/${routePaths.tournaments()}`} onClick={() => form.resetFields()}>
              <ArrowLeftOutlined />
              <span>{t("media.back")}</span>
            </CustomLink>

            <CustomDivider type="vertical" />
            <CardTitle level={4}>{t(isCreate ? "tournaments.addTournament" : "allPages.edit")}</CardTitle>
          </TitleContainer>

          <BtnContainer>
            <Button onClick={closeForm}>{t("allPages.buttonsText.cancel")}</Button>

            <Button
              onClick={() => showConfirm(true)}
              style={{ color: theme.colors.red1, borderColor: theme.colors.red1 }}
            >
              {t("allPages.buttonsText.draft")}
            </Button>

            <Button type="primary" onClick={() => showConfirm()}>
              {t("allPages.buttonsText.publish")}
            </Button>
          </BtnContainer>
        </HeaderTop>

        <Tabs defaultActiveKey={pathname.split("/").slice(-1)[0]} onChange={handleTabClick}>
          <Tabs.TabPane tab={t("tournaments.info")} key="info" />
          <Tabs.TabPane tab={t("tournaments.members")} key="members" disabled={!id || !!tournament?.InStatId} />
          <Tabs.TabPane tab={t("tournaments.table")} key="table" disabled={!id || !!tournament?.InStatId} />
        </Tabs>
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <FormWrapper>
          {!isCreate && !tournament ? (
            <Loader />
          ) : (
            <>
              <Routes>
                <Route
                  path="info"
                  element={
                    <InfoForm
                      tournament={tournament}
                      form={form}
                      values={values}
                      setValues={setValues}
                      submitForm={submitForm}
                    />
                  }
                />
                <Route path="members" element={<MembersForm />} />
                <Route path="table" element={<TableForm tournament={tournament} />} />
              </Routes>
            </>
          )}
        </FormWrapper>
      </Content>
    </>
  );
});

const CardTitle = styled(Title)`
  margin-bottom: 0 !important;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
  display: flex;
  align-items: center;
`;

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
  height: 36px;
  align-items: center;
  gap: 16px;
`;

const FormWrapper = styled.div`
  background: ${theme.colors.white};
  padding: 24px 128px 24px 24px;
  overflow: auto;
  height: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
