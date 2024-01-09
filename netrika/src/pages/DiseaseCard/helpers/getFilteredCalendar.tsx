import { IMedicalViolationsDayInfo } from "common/interfaces/medical/IMedicalViolationsDayInfo";
import { IMedicalViolationsMonthInfo } from "common/interfaces/medical/IMedicalViolationsMonthInfo";
import { IPompResponse } from "common/interfaces/IPompResponse";

interface FilterCases {
  calendar?: IMedicalViolationsMonthInfo[];
  month?: IMedicalViolationsDayInfo[];
  pomp: IPompResponse[];
  setIsFiltered: (value: boolean) => void;
  isOpen: (value: string) => boolean;
}

export const getFilteredCalendar = (props: FilterCases) => {
  const graphs = props.pomp.map((item) => item.graphs);

  const filterItems = (items: (IMedicalViolationsMonthInfo | IMedicalViolationsDayInfo)[] | undefined) => {
    if (items?.length) {
      return items.filter((item) => {
        if (item.cases.length) {
          return item.cases?.some((caseItem) => {
            return graphs?.some((graph) => {
              const currentGraph = graph.find((g) => props.isOpen(`card_pompGraph_${g.idGraph}`));
              props.setIsFiltered(graph?.some((g) => props.isOpen(`card_pompGraph_${g.idGraph}`)));
              if (currentGraph && caseItem.diagnosisCodes.length) {
                return caseItem.diagnosisCodes?.some((code) =>
                  currentGraph.mkb10?.some((mkbCode) => mkbCode.split(".")[0] === code.split(".")[0])
                );
              }
              return false;
            });
          });
        }
        return false;
      });
    }
    return [];
  };

  if (props.calendar) {
    return filterItems(props.calendar);
  } else if (props.month) {
    return filterItems(props.month);
  }

  return [];
};
