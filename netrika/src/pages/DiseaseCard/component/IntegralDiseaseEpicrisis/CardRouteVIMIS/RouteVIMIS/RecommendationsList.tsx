import React from "react";
import { BorderGreen } from "../../../../style/BorderGreen";
import { TableHead } from "../../../../../../common/components/Table/TableHead";
import { BlockTitle } from "./styles";
import { IPatientRouteRecommendation } from "../../../../../../common/interfaces/patient/IPatientRouteRecommendation";
import { Tbody, Td, Tr } from "../../../../../../common/components/Table/UIcomponent/UIcomponent";
import moment from "moment";
import { IconEye } from "../../../../../../common/components/Icon/IconEye";
import { TableQuestions } from "./TableQuestions";
import { drawer } from "../../../../../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "дата рекомендации", value: "" },
  { name: "текст рекомендации", value: "" },
  { name: "Анкета", value: "" },
];

type Recommendation = IPatientRouteRecommendation & { recommendationDate?: Date | string };

interface IProps {
  recommendations: Recommendation[];
}

export const RecommendationsList: React.FC<IProps> = (props) => {
  const openDrawerQuestions = (index: number | null) => {
    drawer.open(<TableQuestions questions={index !== null ? props?.recommendations?.[index]?.questions : []} />);
  };

  return (
    <>
      <BlockTitle>Перечень рекомендаций</BlockTitle>
      <BorderGreen hidePadding>
        <TableHead tableHead={tableHead}>
          <Tbody>
            {props?.recommendations?.map((rec, index) => (
              <Tr key={index}>
                <Td>{rec?.recommendationDate && moment(rec.recommendationDate).format("DD MMMM YYYY")}</Td>
                <Td>{rec?.recommendationText}</Td>
                <Td onClick={() => !!rec.questions?.length && openDrawerQuestions(index)}>
                  {!!rec.questions?.length && <IconEye />}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableHead>
      </BorderGreen>
    </>
  );
};
