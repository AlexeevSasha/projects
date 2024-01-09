import React, { useMemo } from "react";
import { IClinrec } from "../../../../../../common/interfaces/clinrec/IClinrec";
import { ClinrecBlock } from "../ClinrecBlock";

export const useClinrecsConstructor = (clinrecs: IClinrec[]): JSX.Element[] | null => {
  return useMemo(() => {
    if (clinrecs) {
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
    }
    return null;
  }, [clinrecs]);
};
