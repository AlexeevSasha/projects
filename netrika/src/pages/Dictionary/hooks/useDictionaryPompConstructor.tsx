import React, { useMemo } from "react";
import { PompBlock } from "../component/Pomp/PompBlock";
import { IDictionaryPomp } from "../../../common/interfaces/dictionary/IDictionaryPomp";

export const useDictionaryPompConstructor = (pomps: IDictionaryPomp[]): JSX.Element[] | null => {
  return useMemo(() => {
    if (!pomps) return null;

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
  }, [pomps]);
};
