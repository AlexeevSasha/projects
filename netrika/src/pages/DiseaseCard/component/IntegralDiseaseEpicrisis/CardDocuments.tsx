import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { theme } from "common/styles/theme";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { selectDocuments } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { Card } from "../../../../common/components/Card/Card";
import { styled } from "../../../../common/styles/styled";
import { SimpleTable, TableHeaderItem } from "common/components/SimpleTable";
import {
  IRemdDocumentsEvent,
  IRemdDocumentsIemk,
  IRemdDocumentsIemkDoc,
  IRemdDocumentsOdii,
  IRemdDocumentsOdli,
  IRemdDocumentsOdliOdiiDoc,
} from "common/interfaces/IDiseaseCardDocument";
import { DocumentVimisRow } from "./DocumentVimis/DocumentVimisRow";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardDocuments: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { documents: documentEvents, loadingDocuments } = useSelector(selectDocuments);

  const sortDocument = useMemo(() => {
    if (!documentEvents || !documentEvents.length) return [];
    if (!isPreview) return documentEvents;

    return documentEvents.sort((a, b) => {
      const dateA = moment(a?.iemk?.caseOpenAt, "YYYY-MM-DD");
      const dateB = moment(b?.iemk?.caseOpenAt, "YYYY-MM-DD");
      return dateB.diff(dateA);
    });
  }, [documentEvents, isPreview]);

  const openCard = useCallback(async () => {
    if (!documentEvents.length) {
      await dispatch(DiseaseCardEpicrisisThunk.getDocuments(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, documentEvents.length]);

  const getTitle = useCallback(<T extends keyof IRemdDocumentsEvent>(key: T, document: IRemdDocumentsEvent[T]) => {
    if (!document) return "";
    let title = "";
    switch (key) {
      case "iemk":
        const iemkDocument = document as IRemdDocumentsIemk;
        title = `${iemkDocument.caseCaseTypeId} от ${moment(iemkDocument.caseOpenAt).format("DD.MM.YYYY")}`;
        break;
      case "odii":
        const odiiDocument = document as IRemdDocumentsOdii;
        title = `${odiiDocument.diagnosticReportDisplay} от ${moment(odiiDocument.odiiDiagnosticReportCreated).format(
          "DD.MM.YYYY"
        )}`;
        break;
      case "odli":
        const odliDocument = document as IRemdDocumentsOdli;
        title = `${odliDocument.diagnosticReportDisplay} от ${moment(odliDocument.odliDiagnosticReportCreated).format(
          "DD.MM.YYYY"
        )}`;
    }
    return title;
  }, []);

  return (
    <Card
      id={"documents"}
      title={"Документы ВИМИС"}
      max_height={600}
      isEmpty={!!sortDocument.length}
      onClick={openCard}
      contentWrapperStyle={{ display: "flex", overflow: "hidden", justifyContent: "center" }}
    >
      {loadingDocuments ? (
        <IconLoading />
      ) : sortDocument.length ? (
        <SimpleTable headers={tableHeaders} hideTheadPaddingTop={true}>
          {sortDocument.map((event, index) => {
            const content = Object.entries(event).map(([key, value]) => {
              const documents = (event[key]?.documents as (IRemdDocumentsIemkDoc | IRemdDocumentsOdliOdiiDoc)[]) || [];
              return (
                <DocumentVimisRow
                  isActive={isPreview && !index}
                  key={index + key}
                  title={getTitle(key as keyof IRemdDocumentsEvent, value)}
                  columnCount={tableHeaders.length}
                  documents={documents}
                />
              );
            });

            return <React.Fragment key={index}>{content}</React.Fragment>;
          })}
        </SimpleTable>
      ) : (
        <div style={{ color: theme.colors.opacityGray }}>Нет данных</div>
      )}
    </Card>
  );
};

const tableHeaders: TableHeaderItem[] = [
  { title: "", id: "openGroupBtn", style: { width: "20px" } },
  {
    title: "Триггерная точка",
    id: "triggerPointCode",
    style: { whiteSpace: "normal", width: "16%" },
  },
  // До уточнения хар-к диагноза
  // { title: "Диагноз", id: "diagnose" },
  { title: "Документ", id: "condition", style: { width: "15%" } },
  { title: "Медработник", id: "doctor", style: { width: "15%" } },
  { title: "Организация", id: "organization", style: { width: "15%" } },
  { title: "Статус", id: "status", style: { width: "10%" } },
  { title: "Комментарий к статусу", id: "callbackMessage", style: { whiteSpace: "break-spaces", width: "15%" } },

  {
    title: "Дата выгрузки",
    id: "registrySmsDate",
    style: { whiteSpace: "normal", width: "75px" },
  },
  {
    title: "Система-получатель",
    id: "recipientSystem",
    style: { whiteSpace: "break-spaces", width: "70px" },
  },
  { title: "", id: "Actions", style: { width: "30px" } },
];

export const MyLink = styled.a`
  color: ${theme.colors.green};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-decoration: none;

  svg {
    margin-left: 10px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:hover {
    svg {
      path {
        fill: ${theme.colors.green};
      }
    }
  }
`;
