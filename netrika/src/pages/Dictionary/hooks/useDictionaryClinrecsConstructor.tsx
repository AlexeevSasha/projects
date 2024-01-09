import React, { useMemo } from "react";
import { ClinrecBlock } from "../component/Clinrec/ClinrecBlock";
import { IDictionaryClinrec } from "../../../common/interfaces/dictionary/IDictionaryClinrec";

export const useDictionaryClinrecsConstructor = (clinrecs: IDictionaryClinrec[]): JSX.Element[] | null => {
  return useMemo(() => {
    if (!clinrecs) return null;

    return clinrecs.map((item, index) => {
      return (
        <ClinrecBlock
          ItemIndex={index}
          key={"clinrecBlock_" + item.idClinrec}
          id={"clinrecBlock_" + item.idClinrec}
          clinrec={item}
          showIconOpenBlock={true}
        />
      );
    });
  }, [clinrecs]);
};
