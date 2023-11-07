import { IPrimaryOrderDescription } from "../interfaces/PrimaryOrder";

interface IProps {
  title: string;
  descriptionTitle: string;
  diagnosisTitle: string;
  primaryOrderDescription: IPrimaryOrderDescription;
}

export const PrimaryOrderAnswer = ({
  title,
  primaryOrderDescription,
  diagnosisTitle,
  descriptionTitle,
}: IProps) => {
  return (
    <div className={" flex flex-col gap-2 pt-2 pb-2 "}>
      <div className={"text-lg font-medium"}>{title}</div>
      <div>{primaryOrderDescription.indicate}</div>
      {primaryOrderDescription.description && (
        <div>
          <i className={" underline "}>{descriptionTitle}:</i> {primaryOrderDescription.description}
        </div>
      )}
      {primaryOrderDescription.diagnosis && (
        <div>
          <i className={"underline "}>{diagnosisTitle}:</i> {primaryOrderDescription.diagnosis}
        </div>
      )}
    </div>
  );
};
