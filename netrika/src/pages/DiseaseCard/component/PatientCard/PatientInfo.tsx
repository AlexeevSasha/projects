import { IPatient } from "common/interfaces/patient/IPatient";
import moment from "moment";
import React from "react";
import { MetaTags } from "react-meta-tags";
import { Divider } from "common/ui/Divider";
import { FlexContainer } from "common/ui/FlexContainer";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { capitalizeFirstLetter } from "../../../../common/helpers/capitalizeFirstLetter";

interface IProps {
  patient?: IPatient;
  showFIO: boolean;
}

export const PatientInfo = React.memo((props: IProps) => {
  return (
    <>
      <MetaTags>
        <title>Пациент {props.showFIO && props.patient ? props.patient.name : ""}</title>
      </MetaTags>
      {props.patient ? (
        <>
          <CardHeader>{props.showFIO ? props.patient.name + " " : ""}</CardHeader>

          <InfoBlock>
            {capitalizeFirstLetter(props.patient.gender.slice(0, 3))}., {props.patient.ageDescription} (
            {props.patient.birthDate
              ? moment(props.patient.birthDate).format("DD.MM.YYYY") +
                (props.patient.deathDate ? ` - ${moment(props.patient.deathDate).format("DD.MM.YYYY")}` : "")
              : null}
            )
          </InfoBlock>

          <Divider />

          {(props.patient.firstVisitDate || props.patient.lastVisitDate) && (
            <>
              <FlexContainer direction="row" spacing={10} justify="space-between" fullWidth>
                {props.patient.firstVisitDate ? (
                  <FlexContainer alignItems="start" spacing={5}>
                    <VisitTitle>Первый визит</VisitTitle>
                    <VisitDate>
                      {moment(props.patient.firstVisitDate).format("DD.MM.YYYY")}
                      {props.patient?.firstVisitLpu && `(${props.patient?.firstVisitLpu})`}
                    </VisitDate>
                  </FlexContainer>
                ) : null}
                {props.patient.lastVisitDate ? (
                  <FlexContainer alignItems="start" spacing={5}>
                    <VisitTitle>Последний визит</VisitTitle>
                    <VisitDate>
                      {moment(props.patient.lastVisitDate).format("DD.MM.YYYY")}
                      {props.patient?.lastVisitLpu && `(${props.patient?.lastVisitLpu})`}
                    </VisitDate>
                  </FlexContainer>
                ) : null}
              </FlexContainer>
              <Divider />
            </>
          )}

          {(props.patient.snilsNumber || props.patient.policyUniteNumber || props.patient.phone) && (
            <>
              <InfoTitle>
                {props.patient.snilsNumber && (
                  <>
                    <span>СНИЛС </span>
                    <span>{props.patient.snilsNumber}</span>
                  </>
                )}
                {props.patient.policyUniteNumber && (
                  <>
                    <span>ОМС </span>
                    <span>{props.patient.policyUniteNumber}</span>
                  </>
                )}
                {props.patient.phone && (
                  <>
                    <span>Телефон </span>
                    <span>{props.patient.phone}</span>
                  </>
                )}
              </InfoTitle>
              <Divider />
            </>
          )}
        </>
      ) : null}
    </>
  );
});

const CardHeader = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  color: ${theme.colors.textPrimary};
`;

const InfoBlock = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: ${theme.colors.textPrimary};
`;

const VisitTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.colors.textSecondary};
`;

const VisitDate = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.colors.textPrimary};
`;

const InfoTitle = styled.div`
  span:nth-child(odd) {
    color: ${theme.colors.hightBlue};
    margin-right: 5px;
  }
  span:nth-child(even) {
    color: ${theme.colors.black};
    margin-right: 20px;
  }
`;
