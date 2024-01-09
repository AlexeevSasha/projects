import moment from "moment";
import React, { FC } from "react";
import styled from "styled-components";
import { IDeathInfo } from "../../../../../common/interfaces/IDeathInfo";
import { theme } from "../../../../../common/styles/theme";

interface IProps {
  deathInfo: IDeathInfo;
}

export const DeathInfoBlock: FC<IProps> = ({ deathInfo }) => {
  return (
    <>
      <Container>
        <LeftColumn>
          <div>
            <b>Причина смерти:</b> {deathInfo?.deathReason}
          </div>
        </LeftColumn>
        <RightColumn>
          <div>{moment(deathInfo.deathDate).format("DD.MM.YYYY")}</div>
          {deathInfo.organization ? <div>{deathInfo.organization}</div> : null}
          {deathInfo.meddocDoctor ? <div>{deathInfo.meddocDoctor}</div> : null}
        </RightColumn>
      </Container>
      {deathInfo.deathDate && (
        <BlockLine>
          <NameParam>Дата смерти</NameParam>
          <ValueParam>{moment(deathInfo.deathDate).format("DD.MM.YYYY")}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.deathReasonImmediate && (
        <BlockLine>
          <NameParam>Непосредственная причина смерти:</NameParam>
          <ValueParam>{deathInfo.deathReasonImmediate}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.deathReasonIntermediate && (
        <BlockLine>
          <NameParam>Промежуточная причина смерти:</NameParam>
          <ValueParam>{deathInfo.deathReasonIntermediate}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.deathReasonInitial && (
        <BlockLine>
          <NameParam>Первоначальная причина смерти:</NameParam>
          <ValueParam>{deathInfo.deathReasonInitial}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.deathReasonExternal && (
        <BlockLine>
          <NameParam>Внешняя причина смерти:</NameParam>
          <ValueParam>{deathInfo.deathReasonExternal}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.deathReasonPrenatal && (
        <BlockLine>
          <NameParam>Основная причина смерти плода или ребенка:</NameParam>
          <ValueParam>{deathInfo.deathReasonPrenatal}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.codeMainPrenatal && (
        <BlockLine>
          <NameParam>Основное заболевание плода или ребенка:</NameParam>
          <ValueParam>{deathInfo.codeMainPrenatal}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.codeOtherPrenatal && (
        <BlockLine>
          <NameParam>Дополнительное заболевание плода или ребенка:</NameParam>
          <ValueParam>{deathInfo.codeOtherPrenatal}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.deathReasonMother && (
        <BlockLine>
          <NameParam>Основная причина смерти матери:</NameParam>
          <ValueParam>{deathInfo.deathReasonMother}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.codeMainMotherFetalDeath && (
        <BlockLine>
          <NameParam>Основное заболевание матери, повлиявшее на смерть плода:</NameParam>
          <ValueParam>{deathInfo.codeMainMotherFetalDeath}</ValueParam>
        </BlockLine>
      )}
      {deathInfo.codeOtherMotherFetalDeath && (
        <BlockLine>
          <NameParam>Дополнительное заболевание матери, повлиявшее на смерть плода:</NameParam>
          <ValueParam>{deathInfo.codeOtherMotherFetalDeath}</ValueParam>
        </BlockLine>
      )}
    </>
  );
};

const BlockLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 12px;
`;

const NameParam = styled.span`
  color: ${theme.colors.textSecondary};
`;

const ValueParam = styled.span`
  text-align: right;
  justify-self: flex-end;
`;
const Container = styled.div`
  display: grid;
  grid: auto / 2fr 1fr;
  grid-gap: 15px;
  margin: 10px 0 5px 0;
  &:first-child {
    margin-top: 0;
  }
`;
const LeftColumn = styled.div<{ color?: string }>`
  display: flex;
  flex-flow: column;
  position: relative;
  color: ${({ color }) => color};
`;
const RightColumn = styled.div`
  display: flex;
  flex-flow: column;
  /* font-weight: bold; */
  text-align: end;
`;
