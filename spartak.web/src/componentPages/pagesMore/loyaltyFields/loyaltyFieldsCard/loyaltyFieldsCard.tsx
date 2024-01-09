import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { NewConditions } from "./newConditions";
import { LoyaltyCardDataType } from "../../../../../pages/more/loyalty/card";

export const LoyaltyFieldsCard = ({ newConditions }: LoyaltyCardDataType) => {
  return (
    <>
      <Content>
        <NewConditions {...newConditions} />
      </Content>
    </>
  );
};

const Content = styled.div`
  padding: 0 8.75vw 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  margin-bottom: 6.25vw;

  & nav {
    column-gap: 2vw;
    overflow: auto;
    white-space: nowrap;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw;
    margin-bottom: 10.666vw;
  }
`;
