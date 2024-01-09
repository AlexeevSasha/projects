import React from "react";
import { IBlocksOfMatch } from "../../api/dto/IBlocksOfMatch";
import { theme } from "../../assets/theme/theme";
import { ContainerWithBackgroundImg } from "../../components/containers/containerWithBackgroundImg";
import { ListMatchCard } from "../pageMatches/matchCard/listMatchCard";
import { useWindowSize } from "../../core/hooks/UseWindowSize";

interface IProps {
  blockOfMatches?: IBlocksOfMatch;
  showScroll?: boolean;
}

export const SectionHelloTickets = (props: IProps) => {
  const { width = 1920 } = useWindowSize(true);

  return (
    <ContainerWithBackgroundImg
      gradient={theme.gradients.first}
      src={width < 1200 ? "/images/tickets/tabletTickets_v1.0.0.jpg" : "/images/tickets/desktopTickets_v1.0.0.jpg"}
      position="center"
    >
      <ListMatchCard type={"tickets"} blockOfMatches={props.blockOfMatches} showScroll={props.showScroll} />
    </ContainerWithBackgroundImg>
  );
};
