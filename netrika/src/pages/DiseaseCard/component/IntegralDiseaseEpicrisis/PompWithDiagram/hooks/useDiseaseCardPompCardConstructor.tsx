import React, { useMemo } from "react";
import { IPompResponse } from "../../../../../../common/interfaces/IPompResponse";
import { PompBlock } from "../PompBlock";

export const useDiseaseCardPompCardConstructor = (pomps: IPompResponse[]): JSX.Element[] | null => {
  return useMemo(() => {
    if (pomps) {
      return pomps.map((item) => {
        return (
          <PompBlock
            key={`pompBlock_${item.idPomp}`}
            id={`pompBlock_${item.idPomp}`}
            pomp={item}
            showIconOpenBlock={true}
          />
        );
      });
    }
    return null;
  }, [pomps]);
};
