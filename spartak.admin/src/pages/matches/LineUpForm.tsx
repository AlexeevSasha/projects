import { CopyOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import { LineUpReferee, LineUpTeam, MatchLineUp, MatchPlayer } from "common/interfaces/matches";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { saveMatchLineUp } from "store/match/matchActionAsync";
import { lineUpSelector, matchLoadingSelector, matchSelector } from "store/match/matchsSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { PlayerType } from "../../common/interfaces/players";
import { noticeActions } from "../../store/notice/notice";
import { noticeSelector } from "../../store/notice/noticeSelector";
import { RefereeSettings } from "./RefereeSettings";
import { TeamSettings } from "./TeamSettings";

export const LineUpForm = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState<"Ru" | "En">("Ru");
  const dispatch = useAppDispatch();
  const match = useSelector(matchSelector);
  const lineUp = useSelector(lineUpSelector);
  const isLoading = useSelector(matchLoadingSelector);
  const [baseLocal, setBaseLocal] = useState<number>(0);
  const notice = useSelector(noticeSelector);

  const langOptions = useMemo(() => {
    return [
      { label: t("matches.ru"), value: "Ru" },
      { label: t("matches.en"), value: "En" },
    ];
  }, []);

  const initialValues = useMemo(
    () =>
      lineUp ||
      ({
        MatchId: match?.Id,
        Referee: {} as LineUpReferee,
        Teams: [
          { ...match?.infoHome?.Team, Players: [], IsHomeTeam: true },
          { ...match?.infoGuest?.Team, Players: [] },
        ],
      } as MatchLineUp),
    [lineUp, match]
  );

  const handlePlayerSave = (Players: MatchPlayer[], IsHomeTeam: boolean, Coach: LineUpTeam["Coach"]) => {
    const notRepeatPlayersLength = (playerType: "OwnPlayer" | "OppositePlayer") =>
      new Set(
        Players.filter((player) => player.PlayerType === playerType).map((elem) =>
          playerType === PlayerType.own ? elem.Id : elem.Name?.[lang]
        )
      ).size;

    if (match?.Id) {
      if (Players.length === notRepeatPlayersLength("OwnPlayer") + notRepeatPlayersLength("OppositePlayer")) {
        dispatch(
          saveMatchLineUp({
            ...initialValues,
            Teams: initialValues.Teams.map((team) => {
              return IsHomeTeam
                ? team.IsHomeTeam
                  ? { ...team, Players, Coach }
                  : team
                : !team.IsHomeTeam
                ? { ...team, Players, Coach }
                : team;
            }),
          })
        );
      } else {
        !notice.length &&
          dispatch(noticeActions.add({ message: t("validations.sameMatchTeamsEventsLineUp"), type: "error" }));
      }
    } else {
      dispatch(noticeActions.add({ message: t("validations.fillMatchFieldsMessage"), type: "error" }));
    }
  };

  const handleRefereeSave = (Referee: LineUpReferee) => {
    dispatch(saveMatchLineUp({ ...initialValues, Referee }));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Row>
        <RowLabel label={t("matches.locale")} />

        <div>
          <SelectField value={lang} options={langOptions} onChange={setLang} style={{ width: 256 }} />

          {lang === "En" && (
            <Fill onClick={() => setBaseLocal(baseLocal + 1)}>
              <CopyOutlined /> <span>{t("allPages.fillFromBasicLocale")}</span>
            </Fill>
          )}

          <Typography.Text style={{ padding: "8px 0 16px", display: "block", maxWidth: 580 }}>
            {t("matches.localePrompt")}
          </Typography.Text>
        </div>
      </Row>

      <Divider style={{ marginBottom: 40 }} />

      <TeamSettings
        baseLocal={baseLocal}
        onSave={(players, coach) => handlePlayerSave(players, true, coach)}
        team={initialValues.Teams.find(({ IsHomeTeam }) => IsHomeTeam) || ({} as LineUpTeam)}
        lang={lang}
      />

      <TeamSettings
        baseLocal={baseLocal}
        onSave={(players, coach) => handlePlayerSave(players, false, coach)}
        team={initialValues.Teams.find(({ IsHomeTeam }) => !IsHomeTeam) || ({} as LineUpTeam)}
        lang={lang}
      />

      <RefereeSettings
        onSave={handleRefereeSave}
        lang={lang}
        referee={initialValues.Referee}
        baseLocal={baseLocal}
        setBaseLocal={setBaseLocal}
        isTeamsIds={initialValues.Teams.every((team) => team.Id)}
      />
    </>
  );
};

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;

const Fill = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  & > *:last-child {
    margin-left: 11px;
  }
`;
