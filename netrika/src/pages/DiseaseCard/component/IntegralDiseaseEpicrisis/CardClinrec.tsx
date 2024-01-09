import React, { useContext } from "react";
import { Card } from "../../../../common/components/Card/Card";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { IClinrec } from "../../../../common/interfaces/clinrec/IClinrec";
import { useClinrecsConstructor } from "./Clinrec/hooks/useClinrecsConstructor";
import { useDiseaseCardClinrecsConstructor } from "./ClinrecDiseaseCard/hooks/useDiseaseCardClinrecsConstructor";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";

interface IProps {
  clinrecs: IClinrec[];
  loading: boolean;
  isCard?: boolean;
  showStatus?: boolean;
}
export const CardClinrec: React.FC<IProps> = (props: IProps) => {
  const { hideStatusCounter } = useContext(IsOpenCardContext);
  const { loadingClinrecSelects } = useSelector(dictionaryClinrecPompSelector);

  const clinrecs = useClinrecsConstructor(props.clinrecs);
  const diseaseCardClinrecs = useDiseaseCardClinrecsConstructor(props.clinrecs);

  if (!props?.clinrecs?.length) return null;

  return props.isCard && !!props.clinrecs.length ? (
    <Card
      id={"clinrecs"}
      title={hideStatusCounter ? "Клинические рекомендации" : "Выполнение клинических рекомендаций"}
      max_height={600}
      isEmpty={false}
      overflowY={"scroll"}
    >
      {props.loading || loadingClinrecSelects ? <IconLoading /> : diseaseCardClinrecs}
    </Card>
  ) : (
    <div id={"clinrecs"}>{clinrecs}</div>
  );
};
