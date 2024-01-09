import { Button, Form, Switch, Table, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import { tournamentsActions } from "store/tournaments/tournaments";
import {
  draftTournaments,
  getTournamentTable,
  publishTournaments,
  saveTournamentTable,
} from "store/tournaments/tournamentsActionAsync";
import { tournamentTableSelector } from "store/tournaments/tournamentSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { RowLabel } from "ui/RowLabel";
import { getTourTableColumns } from "./tourTableColumns";
import { seasonsOptionsSelector } from "store/dictionary/dictionarySelectors";
import { SelectField } from "ui/SelectField";
import { Tournament } from "common/interfaces/tournaments";

interface IProps {
  tournament?: Tournament;
}

export const TableForm = ({ tournament }: IProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<any>();
  const seasonsOptions = useSelector(seasonsOptionsSelector);
  const table = useSelector(tournamentTableSelector);
  const [seasonId, setSeasonId] = useState(seasonsOptions[0].value?.toString());
  const [showTournamentTable, setShowTournamentTable] = useState(tournament?.ShowTournamentTable);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => getTourTableColumns(), []);

  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }

    if (showTournamentTable) {
      dispatch(
        saveTournamentTable({
          ...form.getFieldsValue(),
          ShowTournamentTable: showTournamentTable,
          Items: showTournamentTable ? form.getFieldValue("Items") : [],
          TournamentId: id,
          SeasonId: seasonId,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            (tournament?.Status !== "Published" ? draftTournaments : publishTournaments)({
              ...tournament,
              ShowTournamentTable: !!showTournamentTable,
            } as Tournament)
          );
          dispatch(noticeActions.add({ message: t("allPages.successPublish"), closable: true, timeout: 5000 }));
          id && seasonId && dispatch(getTournamentTable({ tournamentId: id, seasonId }));
          // Сохраняем значение отображения таблицы для публикации
          dispatch(tournamentsActions.setShowTable(!!showTournamentTable));
        });
    } else {
      dispatch(
        (tournament?.Status !== "Published" ? draftTournaments : publishTournaments)({
          ...tournament,
          ShowTournamentTable: showTournamentTable,
        } as Tournament)
      );
      // Сохраняем значение отображения таблицы для публикации
      dispatch(tournamentsActions.setShowTable(!!showTournamentTable));
    }
  };

  useEffect(() => {
    if (id && seasonId && showTournamentTable) {
      setLoading(true);
      dispatch(getTournamentTable({ tournamentId: id, seasonId })).then(() => setLoading(false));
    }

    return () => {
      dispatch(tournamentsActions.resetTable());
    };
  }, [id, seasonId, showTournamentTable]);

  // При запросе новых данных для таблицы, перезаписывает state формы
  useEffect(() => {
    form.setFieldsValue(table);
  }, [table]);

  return (
    <>
      <Row>
        <RowLabel label={t("allPages.main")} prompt={t("allPages.prompt")} />

        <>
          <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

          <BtnContainer>
            <Button type="primary" onClick={handleSubmit}>
              {t("allPages.buttonsText.save")}
            </Button>

            <Button onClick={() => form.resetFields()}>{t("allPages.buttonsText.cancel")}</Button>
          </BtnContainer>
        </>
      </Row>

      <SwitchWrapper>
        <Typography.Text>{t("tournaments.buildTable")}</Typography.Text>
        <Switch checked={showTournamentTable} onChange={setShowTournamentTable} />
      </SwitchWrapper>

      {showTournamentTable ? (
        <Row>
          <RowLabel label={t("allPages.season")} />

          <SelectField options={seasonsOptions} style={{ width: 256 }} value={seasonId} onChange={setSeasonId} />
        </Row>
      ) : null}

      {showTournamentTable ? (
        loading ? (
          <Loader />
        ) : (
          <Form form={form} requiredMark={false} labelAlign="left" style={{ marginRight: -104 }}>
            <Form.List name="Items">
              {(fields) => (
                <Table
                  columns={columns}
                  dataSource={fields}
                  rowKey={(entity) => entity.key}
                  locale={{ emptyText: <NoDataTable /> }}
                  pagination={false}
                  sticky
                />
              )}
            </Form.List>

            <Prompt>
              <Typography.Text>
                Для корректного отображения турнирной таблицы необходимо заполнить все ячейки.
              </Typography.Text>
              <Typography.Text>Все значения обязательны к заполнению.</Typography.Text>
              <Typography.Text>
                В значениях используются только числа, кроме “Мячи” где используется формат: Забитые-Пропущенные(15-12).
              </Typography.Text>
              <Typography.Text>
                <Typography.Text type="danger">Важно!</Typography.Text> Ранжирование команд происходит по данным
                проставленным в столбце - “Позиция”.
              </Typography.Text>
            </Prompt>
          </Form>
        )
      ) : null}
    </>
  );
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

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  & > *:first-child {
    margin-right: 40px;
  }
`;

const Prompt = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 24px;
`;
