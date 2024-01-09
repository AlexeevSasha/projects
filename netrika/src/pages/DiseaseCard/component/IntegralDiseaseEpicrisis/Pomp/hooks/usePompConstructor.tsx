import React, { useMemo } from "react";
import { PompBlock } from "../PompBlock";
import { IPompResponse } from "../../../../../../common/interfaces/IPompResponse";

export const usePompConstructor = (pomps: IPompResponse[]): JSX.Element[] | null => {
  return useMemo(() => {
    if (pomps) {
      return pomps.map((item, index) => {
        return (
          <PompBlock
            key={"pompBlock_" + item.idPomp}
            id={"pompBlock_" + item.idPomp}
            index={index}
            pomp={item}
            showIconOpenBlock={true}
          />
        );
      });
    }
    return null;
  }, [pomps]);
};
