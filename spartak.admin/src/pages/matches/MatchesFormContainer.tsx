import { Button, Form, Layout, Modal, Tabs, Tag, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { deepMerge } from "common/helpers/deepMerge";
import { Match } from "common/interfaces/matches";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { matchActions } from "store/match/match";
import {
  draftMatch,
  getMatchById,
  getMatchLineUp,
  getRuStatMatches,
  getTeams,
  publishMatch,
} from "store/match/matchActionAsync";
import { matchLoadingSelector, matchSelector } from "store/match/matchsSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { RowLabel } from "ui/RowLabel";
import { Events } from "./Events";
import { LineUpForm } from "./LineUpForm";
import { MatchesForm } from "./MatchesForm";
import { ScoreForm } from "./ScoreForm";
import { noticeActions } from "../../store/notice/notice";
import { getClubsPlayersByFilter } from "../../store/clubsPlayers/clubsPlayersActionAsync";
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { CustomDivider } from "../../ui/CustomDivider";
import { HeaderText } from "../../ui/HeaderText";
import { Redirect } from "../../ui/Redirect";
import { noticeSelector } from "../../store/notice/noticeSelector";

const { Header, Content } = Layout;
const { Title } = Typography;

export const MatchesFormContainer = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.includes("create");
  const { t } = useTranslation();
  const [form] = Form.useForm<Match>();
  const [values, setValues] = useState<Match | undefined>();
  const [selectTeams, setSelectTeams] = useState<{ select1?: string; select2?: string }>();
  const dispatch = useAppDispatch();
  const match = useSelector(matchSelector);
  const isLoading = useSelector(matchLoadingSelector);
  const notice = useSelector(noticeSelector);
  const status = isCreate ? "None" : match?.IsDraft ? "Draft" : match?.IsDraft === undefined ? "Loading" : "Published";
  // console.log("match---MAIN----->", match);
  // console.log("form-------->", form.getFieldsValue());

  useEffect(() => {
    selectTeams?.select1 &&
      dispatch(
        getClubsPlayersByFilter({
          Status: "Published",
          pageSize: 100,
          AnyInTeamArray:
            selectTeams?.select1 || selectTeams?.select2
              ? Object.values(selectTeams).filter((value) => !!value)
              : undefined,
        })
      );
  }, [selectTeams]);

  useEffect(() => {
    if (!!match?.infoHome && !!match?.infoGuest) {
      dispatch(
        getRuStatMatches({
          teamId:
            match?.infoGuest?.Team?.Type === "OwnTeam" ? match?.infoGuest?.Team?.Id : match?.infoHome?.Team?.Id || "",
          date: match.MatchStartDateTime,
        })
      );
    }

    return () => {
      dispatch(matchActions.resetRuStat());
    };
  }, [match]);

  const currentValues = useRef<Match>();
  const initialValues = useMemo(() => {
    const formValues = (match && { ...match, VisitorsNumber: match.VisitorsNumber || null }) || ({} as Match);
    currentValues.current = formValues;

    return formValues;
  }, [match]);

  const handleTabClick = (key: string) => {
    ["match", "score"].includes(key) && setValues(deepMerge<Match>(values || {}, form.getFieldsValue()));
    navigate(`/${routePaths.matches(id || routePaths.form.create, key)}`);
  };

  const submitForm = async ({ draft, operation }: { draft?: boolean; operation?: "publish" | "draft" }) => {
    const homeTeam = form.getFieldValue("infoHome")?.TeamId;
    const guestTeam = form.getFieldValue("infoGuest")?.TeamId;
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }
    if (
      (isCreate && pathname.split("/")[3] !== "match") ||
      (pathname.split("/")[3] !== "match" && !homeTeam && !guestTeam)
    ) {
      !notice.length &&
        dispatch(
          noticeActions.add({
            message: t("validations.fillMatchFieldsMessage"),
            type: "error",
          })
        );
    } else if (homeTeam && guestTeam && homeTeam === guestTeam) {
      !notice.length &&
        dispatch(
          noticeActions.add({
            message: t("validations.sameMatchTeams"),
            type: "error",
            timeout: 3000,
          })
        );
    } else {
      const { ConcededGoal, ConcededPenaltyGoal, ScoredGoal, ScoredPenaltyGoal } = form.getFieldsValue().infoHome || {};
      const formData = deepMerge<Match>(
        {
          ...values,
          Id: id,
          infoGuest: {
            ...(values?.infoGuest || {}),
            ConcededGoal: ScoredGoal,
            ConcededPenaltyGoal: ScoredPenaltyGoal,
            ScoredGoal: ConcededGoal,
            ScoredPenaltyGoal: ConcededPenaltyGoal,
          },
        },
        {
          ...form.getFieldsValue(),
          VisitorsNumber: form.getFieldValue("VisitorsNumber") || 0,
        }
      );

      dispatch((draft ? draftMatch : publishMatch)(formData))
        .unwrap()
        .then((res) => {
          isCreate && navigate(`/${routePaths.matches(res.Id, "match")}`);
          !!operation && navigate("/matches");
          dispatch(
            noticeActions.add({
              message: t(
                operation
                  ? operation === "publish"
                    ? "matches.successPublishAlert"
                    : "matches.successDraftAlert"
                  : "allPages.allDataSave"
              ),
            })
          );
        });
    }
  };

  const publishDraftMatch = ({ draft, operation }: { draft?: boolean; operation?: "publish" | "draft" }) => {
    Modal.confirm({
      title: <HeaderText>{t("allPages.confirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(draft ? "matches.draftModalText" : "matches.publishModalText"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm({ draft, operation }),
    });
  };

  useEffect(() => {
    dispatch(getTeams());

    if (!isCreate && id) {
      dispatch(getMatchById(id))
        .unwrap()
        .then((res) => {
          setValues(res);
          setSelectTeams({
            select1: res.infoHome?.Team?.Id,
            select2: res.infoGuest?.Team?.Id,
          });
        });
    }

    return () => {
      dispatch(matchActions.resetMatch());
    };
  }, [id, pathname]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleCancel = () => {
    form.resetFields();
    currentValues.current = initialValues;
  };

  useEffect(() => {
    !isCreate &&
      match?.Id &&
      !!((match?.infoGuest?.Team && match?.infoHome?.Team) || match?.MatchInfoStat?.every((elem) => elem.Team?.Id)) &&
      dispatch(getMatchLineUp(match?.Id));
  }, [match]);

  return (
    <>
      {!isCreate && match?.MatchType !== "Custom" && pathname.includes("event") ? (
        match ? (
          <Header
            style={{
              padding: "12px 24px 0",
              background: theme.colors.white,
              height: "56px",
            }}
          >
            <CardTitle level={4}>{t("matches.broadcast")}</CardTitle>
          </Header>
        ) : null
      ) : (
        <HeaderContent>
          <HeaderTop>
            <TitleContainer>
              <CustomLink to={`/${routePaths.matches()}`} onClick={() => form.resetFields()}>
                <ArrowLeftOutlined />
                <span>{t("media.back")}</span>
              </CustomLink>

              <CustomDivider type="vertical" />
              <CardTitle level={4}>{t(isCreate ? "matches.addMatchTitle" : "allPages.edit")}</CardTitle>
              {status !== "Loading" && !isCreate && (
                <Status>
                  <Tag color={statusColors[status]}>{t(`allPages.statuses.${status}`)}</Tag>
                </Status>
              )}
            </TitleContainer>

            <ButtonContainer>
              <Button onClick={() => navigate(`/${routePaths.matches()}`)}>{t(`allPages.buttonsText.cancel`)}</Button>

              <Button
                style={{
                  color: theme.colors.red1,
                  borderColor: theme.colors.red1,
                }}
                onClick={() => publishDraftMatch({ draft: true, operation: "draft" })}
              >
                {t(`allPages.buttonsText.draft`)}
              </Button>

              <Button type="primary" onClick={() => publishDraftMatch({ operation: "publish" })}>
                {t(`allPages.buttonsText.publish`)}
              </Button>
            </ButtonContainer>
          </HeaderTop>

          <Tabs defaultActiveKey={pathname.split("/").slice(-1)[0]} onChange={handleTabClick}>
            <Tabs.TabPane tab={t("matches.match")} key="match" />
            <Tabs.TabPane tab={t("matches.score")} key="score" />
            <Tabs.TabPane tab={t("matches.lineUp")} key="lineUp" />
            <Tabs.TabPane tab={t("matches.event")} key="event" />
          </Tabs>
        </HeaderContent>
      )}

      <Content style={{ padding: 24, margin: 0 }}>
        <FormWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <Form form={form} requiredMark={false} labelAlign="left" initialValues={initialValues}>
              <Form.Item
                shouldUpdate={(_, current) => {
                  currentValues.current = current;

                  return true;
                }}
              >
                {() =>
                  form.isFieldsTouched() && currentValues.current !== initialValues ? (
                    <FormHeader>
                      <RowLabel label={t("allPages.main")} />
                      <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                      <BtnContainer>
                        <Button type="primary" onClick={() => submitForm({ draft: match ? match.IsDraft : true })}>
                          {t("allPages.buttonsText.save")}
                        </Button>

                        <Button onClick={handleCancel}>{t("allPages.buttonsText.cancel")}</Button>
                      </BtnContainer>
                    </FormHeader>
                  ) : null
                }
              </Form.Item>

              <Routes>
                {match?.MatchType === "InStat" && !pathname.includes("event") ? (
                  <Route path="*" element={<Redirect path="event" />} />
                ) : (
                  [
                    <Route
                      key="1"
                      path="match"
                      element={<MatchesForm selectTeams={selectTeams} setSelectTeams={setSelectTeams} form={form} />}
                    />,
                    <Route key="2" path="score" element={<ScoreForm form={form} />} />,
                  ]
                )}
              </Routes>
            </Form>
          )}

          <Routes>
            <Route path="lineUp" element={<LineUpForm />} />
            <Route path="event" element={<Events match={match} isLoading={isLoading} />} />
          </Routes>
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

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;

const FormWrapper = styled.div`
  background: ${theme.colors.white};
  padding: 24px 128px 24px 24px;
  overflow: auto;
  height: 100%;
`;

const FormHeader = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;
