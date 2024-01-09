import { DatePicker, Form, FormInstance, InputNumber } from "antd";
import { required } from "common/helpers/validators/required";
import { Match } from "common/interfaces/matches";
import moment from "moment";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import {
  seasonsOptionsSelector,
  stadiumsOptionsSelector,
  tournamentsOptionsSelector,
} from "store/dictionary/dictionarySelectors";
import { getRuStatMatches } from "store/match/matchActionAsync";
import { ruStatMatchesSelector, teamsListSelector, teamsOptionsSelector } from "store/match/matchsSelectors";
import styled from "styled-components";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";

interface IProps {
  selectTeams?: { select1?: string; select2?: string };
  setSelectTeams: Dispatch<SetStateAction<{ select1?: string; select2?: string } | undefined>>;
  form: FormInstance<Match>;
}

export const MatchesForm = ({ selectTeams, setSelectTeams, form }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const stadiums = useSelector(stadiumsOptionsSelector);
  const teamsOptions = useSelector(teamsOptionsSelector);
  const teamsList = useSelector(teamsListSelector);
  const ruStatMatches = useSelector(ruStatMatchesSelector);
  const tournamentsOptions = useSelector(tournamentsOptionsSelector);
  const seasonsOptions = useSelector(seasonsOptionsSelector);

  const handleSelectTeam = useCallback(
    (value: string, kind: "select1" | "select2") => {
      if (value === selectTeams?.select1 || value === selectTeams?.select2) {
        return;
      }
      setSelectTeams((prev) => (prev ? { ...prev, [kind]: value } : { [kind]: value }));

      // При выборе новой команды надо сбрасывать ruStat id и делать заново запрос на получение игры
      form.setFieldsValue({ ...form.getFieldsValue(), InStatId: undefined });
      const team1 =
        kind === "select1"
          ? teamsList.find((elem) => elem.Id === value)
          : teamsList.find((elem) => elem.Id === selectTeams?.select1);
      const team2 =
        kind === "select2"
          ? teamsList.find((elem) => elem.Id === value)
          : teamsList.find((elem) => elem.Id === selectTeams?.select2);
      if (team1?.TeamType === "OwnTeam" || team2?.TeamType === "OwnTeam") {
        dispatch(
          getRuStatMatches({
            teamId: team1?.TeamType === "OwnTeam" ? team1?.Id : team2?.Id || "",
            date: form.getFieldValue("MatchStartDateTime"),
          })
        );
      }
    },
    [selectTeams, setSelectTeams]
  );

  const handleChangeTime = useCallback(() => {
    // При выборе времени надо сбрасывать ruStat id и делать заново запрос на получение игры
    form.setFieldsValue({
      ...form.getFieldsValue(),
      InStatId: undefined,
      // Очистка секунд из даты начала матча
      MatchStartDateTime: form.getFieldValue("MatchStartDateTime")?.replace(/\:[0-9]{2}\./g, ":00."),
    });
    const team1 = teamsList.find((elem) => elem.Id === selectTeams?.select1);
    const team2 = teamsList.find((elem) => elem.Id === selectTeams?.select2);
    if (team1?.TeamType === "OwnTeam" || team2?.TeamType === "OwnTeam") {
      dispatch(
        getRuStatMatches({
          teamId: team1?.TeamType === "OwnTeam" ? team1?.Id : team2?.Id || "",
          date: form.getFieldValue("MatchStartDateTime"),
        })
      );
    }
  }, [selectTeams, setSelectTeams]);

  return (
    <>
      <FormItem
        name="MatchStartDateTime"
        label={<RowLabel label={t("matches.dateTime") + " *"} prompt={t("allPages.dateTimeHelp")} />}
        getValueFromEvent={(date) => date?.zone(-180).milliseconds(0).toISOString()}
        getValueProps={(date) => ({ value: date ? moment(date).zone(-180) : undefined })}
        rules={[{ validator: required }]}
      >
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format={"YYYY-MM-DD HH:mm"}
          placeholder={t("matches.dateTime")}
          style={{ width: 256 }}
          onChange={handleChangeTime}
        />
      </FormItem>

      <FormItem
        name="TournamentId"
        label={<RowLabel label={t("allPages.tournament") + " *"} prompt={t("allPages.prompt")} />}
        rules={[{ validator: required }]}
      >
        <SelectField options={tournamentsOptions} style={{ width: 256 }} />
      </FormItem>

      <FormItem name="SeasonId" label={<RowLabel label={t("allPages.season")} />}>
        <SelectField options={seasonsOptions} style={{ width: 256 }} />
      </FormItem>

      <FormItem
        name="StadiumId"
        label={<RowLabel label={t("matches.stadium") + " *"} prompt={t("allPages.prompt")} />}
        rules={[{ validator: required }]}
      >
        <SelectField options={stadiums} style={{ width: 256 }} />
      </FormItem>

      <FormItem
        name={["infoHome", "TeamId"]}
        label={<RowLabel label={t("matches.TeamOne") + " *"} prompt={t("matches.homeTeam")} />}
        rules={[{ validator: required }]}
      >
        <SelectField
          options={teamsOptions}
          onChange={(value) => handleSelectTeam(value, "select1")}
          style={{ width: 256 }}
        />
      </FormItem>

      <FormItem
        name={["infoGuest", "TeamId"]}
        label={<RowLabel label={t("matches.TeamTwo") + " *"} prompt={t("matches.quest")} />}
        rules={[{ validator: required }]}
      >
        <SelectField
          options={teamsOptions}
          onChange={(value) => handleSelectTeam(value, "select2")}
          style={{ width: 256 }}
        />
      </FormItem>

      <FormItem name="InStatId" label={<RowLabel label={t("matches.RuStatId")} />}>
        <SelectField options={ruStatMatches || []} style={{ width: 256 }} />
      </FormItem>

      <FormItem
        name="VisitorsNumber"
        label={<RowLabel label={t("matches.spectators")} prompt={t("matches.numOfPeople")} />}
      >
        <InputNumber style={{ width: 256 }} min={1} />
      </FormItem>
    </>
  );
};

const FormItem = styled(Form.Item)`
  grid-gap: 40px;

  #root & {
    margin-bottom: 40px;
  }

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }
  }

  & label > div:first-child::after {
    display: none;
  }
`;
