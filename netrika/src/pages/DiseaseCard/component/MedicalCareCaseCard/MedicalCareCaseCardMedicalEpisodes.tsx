import React, { FC, useCallback } from "react";
import { Card } from "../../../../common/components/Card/Card";
import styled from "styled-components";
import { TableHead } from "../../../../common/components/Table/TableHead";
import { IMedicalCareCaseCardGetSteps } from "../../../../common/interfaces/medical/IMedicalCareCaseCardGetSteps";
import { IconContainerFloatingmes, Tbody, Td, Tr } from "common/components/Table/UIcomponent/UIcomponent";
import { theme } from "common/styles/theme";
import { IconLoading } from "common/components/Icon/IconLoading";
import { IconEye } from "common/components/Icon/IconEye";
import moment from "moment";
import { IntegralDiseaseEpicrisisApiRequest } from "../../../../api/integralDiseaseEpicrisisApiRequest";
import { errorPopup } from "../../../../common/helpers/toast/error";
import { saveAs } from "file-saver";

interface IProps {
  steps: IMedicalCareCaseCardGetSteps[];
  loadingSteps: boolean;
}

const tableHead = [
  { name: "Начало", value: "start" },
  { name: "Завершение", value: "end" },
  { name: "Отделение, врач", value: "hospitalDepartment" },
  { name: "Документы", value: "medDocs" },
];

export const MedicalCareCaseCardMedicalEpisodes: FC<IProps> = (props: IProps) => {
  const onDownloadDocument = useCallback(async (medDocViewId: string, fileName = "Без имени") => {
    try {
      const result = await new IntegralDiseaseEpicrisisApiRequest().getViewDocument(medDocViewId);
      // @ts-ignore
      if (result?.isError) {
        throw result;
      } else {
        if (result) {
          saveAs(result as Blob, fileName);
        }
      }
    } catch (error) {
      errorPopup(error.message);
    }
  }, []);

  return (
    <Card
      id={"medical_episodes"}
      title={"Эпизоды медицинского обслуживания"}
      close={true}
      isEmpty={props.steps.length === 0}
    >
      {props.loadingSteps ? (
        <IconLoading />
      ) : props.steps.length === 0 ? (
        <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>Нет данных для отображения</div>
      ) : (
        <CustomBorderGreen>
          <TableHead tableHead={tableHead}>
            <Tbody>
              {props.steps.map((body, index) => (
                <Tr key={`${body.stepBizKey}_${index}`} id={`row_${index}`}>
                  <Td id={"row_" + index + "_column_start"}>
                    {body.dateStart ? moment(body.dateStart).format("DD.MM.YYYY") : "Н/Д"}
                  </Td>
                  <Td id={"row_" + index + "_column_end"}>
                    {body.dateEnd ? moment(body.dateEnd).format("DD.MM.YYYY") : "Н/Д"}
                  </Td>
                  <Td id={"row_" + index + "_column_hospitalDepartment"}>
                    {body.hospitalDepartment} {body?.hospitalDepartment && body?.doctorName.trim() ? ", " : null}
                    {body.doctorName} ({body.doctorPosName})
                  </Td>
                  <Td id={"row_" + index + "_column_medDocs"}>
                    {body.medDocs.map((medDoc, ind) => (
                      <DocBlock key={`${medDoc.url}_${ind}`}>
                        {medDoc.header}
                        {medDoc.medDocViewId && (
                          <IconContainerFloatingmes
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onDownloadDocument(medDoc.medDocViewId, medDoc.header);
                            }}
                            id={"open_settings"}
                            title={"Открыть вложение"}
                            position="left"
                          >
                            <IconEye />
                          </IconContainerFloatingmes>
                        )}
                      </DocBlock>
                    ))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableHead>
        </CustomBorderGreen>
      )}
    </Card>
  );
};

const DocBlock = styled.span`
  display: flex;
  justify-content: space-between;
  .iconFloatingmes {
    align-self: center;
  }
`;

const CustomBorderGreen = styled.div`
  border: 1px solid ${theme.colors.green};
  border-radius: 10px;
  margin-bottom: 25px;
  padding: 0 5px 0;
  overflow: hidden;
`;
