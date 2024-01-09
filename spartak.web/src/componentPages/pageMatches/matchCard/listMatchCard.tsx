import { useMemo } from "react";
import styled from "styled-components";
import type { IBlocksOfMatch } from "../../../api/dto/IBlocksOfMatch";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { theme } from "../../../assets/theme/theme";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import { DesktopContainer } from "../../../components/containers/desktopContainer";
import { TabletContainer } from "../../../components/containers/tabletContainer";
import { MatchCard } from "./matchCard";

interface IProps {
  blockOfMatches?: IBlocksOfMatch;
  showScroll?: boolean;
  teamId?: string;
  type?: "tickets";
}

export const ListMatchCard = (props: IProps) => {
  const filterBlocks = useMemo(() => {
    const newArr: { key: string; value: IMatchDto }[] = [];

    if (props.blockOfMatches) {
      props.blockOfMatches["Past"] && newArr.push({ key: "Past", value: props.blockOfMatches["Past"] });
      props.blockOfMatches["Current"] && newArr.push({ key: "Current", value: props.blockOfMatches["Current"] });
      props.blockOfMatches["Future"] &&
        props.blockOfMatches["Future"].forEach((elem) => {
          newArr.push({ key: "Future", value: elem });
        });
    }

    return newArr;
  }, [props.blockOfMatches]);

  const matchBlocks = useMemo(
    () =>
      filterBlocks?.map(({ key, value }, index) => {
        return (
          <MatchCard
            type={props.type}
            key={key + index}
            size={filterBlocks.length > 2 ? (index === 1 ? "big" : "small") : "big"}
            matchInfo={value}
            matchKind={key}
            teamId={props.teamId}
          />
        );
      }),
    [filterBlocks]
  );

  return (
    <>
      <DesktopContainer>
        <CustomContainer>{matchBlocks}</CustomContainer>
      </DesktopContainer>

      <StyledTabletContainer>
        <ContainerHorizontalScroll showScroll={props.showScroll} scrollTo>
          <CustomContainer>{matchBlocks}</CustomContainer>
        </ContainerHorizontalScroll>
      </StyledTabletContainer>
    </>
  );
};

const CustomContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 4.17vw 1.25vw 7.3vw;
  height: fit-content;
  z-index: 2;

  > div {
    margin-right: 1.25vw;
  }
  > div:nth-last-child(1) {
    margin-right: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 15.78vw 0 3.13vw;

    > div {
      margin-right: 3.13vw;
    }
    > div:nth-last-child(1) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 45.87vw 0 3.13vw;

    > div {
      margin-right: 4.27vw;
      overflow: hidden;
    }
    > div:nth-last-child(1) {
      margin-right: 0;
    }
  }
`;

const StyledTabletContainer = styled(TabletContainer)`
  > div {
    align-items: center;
  }
`;
