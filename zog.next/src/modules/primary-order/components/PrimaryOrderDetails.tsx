import { IPrimaryOrder } from "../interfaces/PrimaryOrder";
import { PrimaryOrderAnswer } from "./PrimaryOrderAnswer";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  primaryOrder: IPrimaryOrder;
}

export const PrimaryOrderDetails = ({ primaryOrder }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).primaryOrder;
  return (
    <div className={"mb-4"}>
      <hr />
      <div className={"flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.full_name}</div>
        <span>-</span>
        <div>{primaryOrder.name}</div>
      </div>
      <hr />
      <div className={"flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.phone_number} </div>
        <span>-</span>
        <div>{primaryOrder.phone}</div>
      </div>
      <hr />
      <div className={"flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.email} </div>
        <span>-</span>
        <div>{primaryOrder.email}</div>
      </div>
      <hr />
      <div className={"flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.communication_method}</div>
        <span>-</span>
        <div>{primaryOrder.messenger}</div>
      </div>
      <hr />
      <div className={"flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.time_zone} </div>
        <span>-</span>
        <div>{primaryOrder.timeZone}</div>
      </div>
      <hr />
      <PrimaryOrderAnswer
        title={`1. ${lang.inflammatory_processes}`}
        primaryOrderDescription={primaryOrder.inflammation}
        diagnosisTitle={lang.diagnosis_from_list}
        descriptionTitle={lang.specify_which}
      />
      <hr />
      <PrimaryOrderAnswer
        title={`2. ${lang.pressure}`}
        primaryOrderDescription={primaryOrder.pressure}
        diagnosisTitle={lang.diagnosis_from_list}
        descriptionTitle={lang.pathology_description}
      />
      <hr />
      <PrimaryOrderAnswer
        title={`3. ${lang.tumors}`}
        primaryOrderDescription={primaryOrder.tumor}
        diagnosisTitle={lang.diagnosis_from_list}
        descriptionTitle={lang.pathology_description}
      />
      <hr />
      <PrimaryOrderAnswer
        title={`4. ${lang.vascular_diseases}`}
        primaryOrderDescription={primaryOrder.cardiovascular}
        diagnosisTitle={lang.diagnosis_from_list}
        descriptionTitle={lang.pathology_description}
      />
      <hr />
      <PrimaryOrderAnswer
        title={`5. ${lang.visual_ailments}`}
        primaryOrderDescription={primaryOrder.vision}
        diagnosisTitle={lang.diagnosis_from_list}
        descriptionTitle={lang.pathology_description}
      />
      <hr />
      <PrimaryOrderAnswer
        title={`5. ${lang.joint_diseases}`}
        primaryOrderDescription={primaryOrder.joints}
        diagnosisTitle={lang.diagnosis_from_list}
        descriptionTitle={lang.pathology_description}
      />
    </div>
  );
};
