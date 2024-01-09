import React from "react";
import { BlockTriplePhoto } from "../../../../components/blockTriplePhoto/blockTriplePhoto";
import { ContainerContent } from "../../../../components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";

export const FoodCourtBlockTriplePhoto = () => {
  return (
    <StyledContainer>
      <BlockTriplePhoto
        first={"/images/services/RestaurantSeats_v1.0.0.png"}
        second={"/images/services/RestaurantTable_v1.0.0.png"}
        main={"/images/services/SportBarSeats_v1.0.0.png"}
      />
      <BlockTriplePhoto
        left
        first={"/images/services/SportBarArea_v1.0.0.png"}
        second={"/images/services/RestaurantHall_v1.0.0.png"}
        main={"/images/services/RestaurantArea_v1.0.0.png"}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerContent)`
  gap: 0.21vw;
  flex-direction: column;
  section:first-of-type {
    direction: rtl;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
  }
`;
