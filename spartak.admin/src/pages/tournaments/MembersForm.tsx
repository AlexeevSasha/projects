import { Button } from "antd";
import { tournamentsRepository } from "api/tournamentsRepository";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { seasonsOptionsSelector, teamsOptionsSelector } from "store/dictionary/dictionarySelectors";
import styled from "styled-components";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";

export const MembersForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const teamsOptions = useSelector(teamsOptionsSelector);
  const seasonsOptions = useSelector(seasonsOptionsSelector);
  const [showSave, setShowSave] = useState(false);
  const [seasonId, setSeasonId] = useState(seasonsOptions[0].value?.toString());
  const [currentValues, setCurrentValues] = useState<string[]>([]);
  const initialValues = useRef<string[]>();

  const getTeams = () => {
    if (id && seasonId) {
      tournamentsRepository.getTeams(id, seasonId).then((res) => {
        const newRes = res.map(({ Id }) => Id);
        setCurrentValues(newRes);
        initialValues.current = newRes;
      });
    }
  };

  useEffect(() => {
    getTeams();
  }, [seasonId]);

  const saveTeams = () => {
    if (id && seasonId) {
      tournamentsRepository.saveTeams(id, seasonId, currentValues).then(() => {
        setShowSave(false);
      });
    }
  };

  return id ? (
    <>
      <Row>
        <RowLabel label={t("allPages.main")} prompt={t("allPages.prompt")} />

        {showSave ? (
          <>
            <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

            <BtnContainer>
              <Button type="primary" onClick={saveTeams}>
                {t("allPages.buttonsText.save")}
              </Button>

              <Button
                onClick={() => {
                  setCurrentValues(initialValues.current || []);
                  setShowSave(false);
                }}
              >
                {t("allPages.buttonsText.cancel")}
              </Button>
            </BtnContainer>
          </>
        ) : null}
      </Row>
      <Row>
        <RowLabel label={t("allPages.season")} />

        <SelectField
          options={seasonsOptions}
          style={{ width: 256 }}
          defaultValue={seasonsOptions[0]}
          onChange={setSeasonId}
        />
      </Row>
      <Row>
        <RowLabel label={t("tournaments.teamsList")} prompt={t("tournaments.inTournament")} />

        <SelectField
          allowClear
          mode="multiple"
          options={teamsOptions}
          style={{ width: 744 }}
          onChange={(val) => {
            setShowSave(true);
            setCurrentValues(val);
          }}
          value={currentValues}
        />
      </Row>
    </>
  ) : null;
};

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;
