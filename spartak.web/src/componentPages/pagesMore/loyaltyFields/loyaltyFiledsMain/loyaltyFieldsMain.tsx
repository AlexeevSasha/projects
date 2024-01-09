import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { WhoMembersLoyalty } from "./whoMembersLoyalty";
import { WhatIsDenary } from "./whatIsDenary";
import { UserLevels } from "./userLevels";
import { GettingDenary } from "./gettingDenary";
import { SpendingDenary } from "./spendingDenary";
import { LoyaltyMainDataType, Offers } from "../../../../../pages/more/loyalty/main";
import { LoyaltyFieldsOffers } from "../loyaltyFiledsOffers/loyaltyFieldsOffers";

type Props = {
  data: LoyaltyMainDataType;
  offers: Offers;
};

export const LoyaltyFieldsMain = (props: Props) => {
  return (
    <>
      <Content>
        <WhoMembersLoyalty {...props.data.whoMembersLoyalty} />
        <WhatIsDenary {...props.data.whatIsDenary} />
        <UserLevels {...props.data.userLevels} />
        <GettingDenary {...props.data.gettingDenary} />
        <SpendingDenary {...props.data.spendingDenary} />
        <LoyaltyFieldsOffers {...props.offers} />
      </Content>
    </>
  );
};

const Content = styled.div`
  padding: 4.17vw 8.75vw 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;

  & nav {
    column-gap: 2vw;
    overflow: auto;
    white-space: nowrap;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 4.27vw 0;
  }
`;
