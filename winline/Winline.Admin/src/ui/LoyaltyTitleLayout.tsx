import { LoyaltyFormTitle } from "./LoyaltyFormTitle";
import React, { FC } from "react";
import { LoyaltyFormDescription } from "./LoyaltyFormDescription";
import styled from "styled-components";

interface IProps {
  title: string;
  description?: string;
  description2?: string;
  select?: boolean;
  second?: boolean;
  third?: boolean;
  last?: boolean;
}

export const LoyaltyTitleLayout: FC<IProps> = (props) => (
  <MainContainer key={props.title} third={props.third} second={props.second} last={props.last}>
    <TitleDescriptionBlock second={props.second} third={props.third} last={props.last}>
      <LoyaltyFormTitle>{props.title}</LoyaltyFormTitle>
      {props.description && props.description2 ? (
        <LoyaltyFormDescription>
          <div>{props.description}</div>
          <div style={{ marginTop: "20px" }}>{props.description2}</div>
        </LoyaltyFormDescription>
      ) : (
        props.description && (
          <LoyaltyFormDescription>
            <div>{props.description}</div>
          </LoyaltyFormDescription>
        )
      )}
    </TitleDescriptionBlock>
    <Fields select={props.select} third={props.third} second={props.second}>
      {props.children}
    </Fields>
  </MainContainer>
);
export const MainContainer = styled.div<{ second?: boolean; third?: boolean; last?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.third ? "1fr 8fr" : props.second ? "1fr 6fr" : "1fr 2fr")};
  justify-content: ${(props) => (props.second ? "flex-start" : "space-between")};
  grid-gap: ${(props) => (props.second ? "40px" : props.third ? "70px" : props.last ? "60px" : "100px")};
  /* margin-bottom: ${(props) => (props.second ? "40px" : "28px")}; */
  @media screen and (max-width: 1250px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  :not(:last-child) {
    margin-bottom: ${(props) => (props.second ? "40px" : "20px")};
  }
`;

const TitleDescriptionBlock = styled.div<{ second?: boolean; third?: boolean; last?: boolean }>`
  width: ${(props) => (props.second || props.third ? "200px" : props.last ? "210px" : "auto")};
  @media screen and (max-width: 1250px) {
    width: auto;
  }
`;

const Fields = styled.div<{ select?: boolean; third?: boolean; second?: boolean }>`
  /* & > :first-child {
    margin-bottom: 12px;
  } */
  width: ${(props) => (props.second ? "370px" : props.third ? "330px" : "330px")};
  display: flex;
  flex-direction: column;
  ${(props) => props.select && "overflow: hidden"};
  @media screen and (max-width: 1250px) {
    width: auto;
  }
`;
