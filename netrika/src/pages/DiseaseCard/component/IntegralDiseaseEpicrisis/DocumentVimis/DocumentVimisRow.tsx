import {
  IRemdDocumentsIemkDoc,
  IRemdDocumentsOdliOdiiDoc,
} from "../../../../../common/interfaces/IDiseaseCardDocument";
import { TableGroup, TableRow } from "../../../../../common/components/SimpleTable";
import moment from "moment/moment";
import { IconEye } from "../../../../../common/components/Icon/IconEye";
import React, { useCallback, useState } from "react";
import { MyLink } from "../CardDocuments";

interface IProps {
  documents: (IRemdDocumentsIemkDoc | IRemdDocumentsOdliOdiiDoc)[];
  title: string;
  columnCount: number;
  isActive?: boolean;
}

export const DocumentVimisRow = ({ documents, title, columnCount, ...props }: IProps) => {
  const [openDocuments, setOpenDocuments] = useState(props.isActive || false);

  const toggleOpen = useCallback(() => setOpenDocuments((prev) => !prev), []);

  return (
    <TableGroup title={title} isOpen={openDocuments} columnCount={columnCount} onClick={toggleOpen}>
      {documents.map((doc, i) => {
        let doctor = "";
        let organization = "";
        if ("doctor" in doc) {
          doctor = `${doc?.doctor || ""}${doc.position ? ` - ${doc.position}` : ""}`;
          organization = doc?.organization || "";
        }
        if ("practitionerRoleFio" in doc) {
          doctor = doc?.practitionerRoleFio || "";
          organization = doc?.practitionerRoleOrganization || "";
        }
        return (
          <TableRow
            key={doc.triggerPointCode || "" + i}
            cells={[
              /* Резервируем колонку под иконки группы */
              { id: "groupBtnColumn", content: "" },
              {
                id: i + "triggerPointCode",
                content: `№ ${doc.triggerPointCode} ${doc.triggerPointName}`,
              },
              { id: i + "document.condition", content: doc.condition },
              {
                id: "doctor",
                content: doctor,
              },
              {
                id: "organization",
                content: organization,
              },
              { id: i + "document.status", content: doc.status },
              { id: i + "document.callbackMessage", content: doc.callbackMessage },

              {
                id: i + "registrySmsDate",
                content: <>{doc.registrySmsDate ? moment(doc.registrySmsDate).format("DD.MM.YYYY") : "Нет данных"}</>,
              },

              {
                id: i + "recipientSystem",
                content: <>{doc.recipientSystem || "Нет данных"}</>,
              },
              {
                id: i + "actions",
                content: doc.url && (
                  <MyLink style={{ width: "26px" }} href={doc.url} target="_blank">
                    <IconEye />
                  </MyLink>
                ),
              },
            ]}
          />
        );
      })}
    </TableGroup>
  );
};
