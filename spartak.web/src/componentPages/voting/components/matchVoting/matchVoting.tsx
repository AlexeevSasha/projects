import { useRouter } from "next/router";
import styled from "styled-components";
import { IMatchDto } from "../../../../api/dto/IMatchDto";
import { IconWinline } from "../../../../assets/icon/iconWinline";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { SectionMatchInfo } from "../../../../components/sectionMatchInfo/sectionMatchInfo";
import { VotingDataType } from "../../interfaces/VotingT";
import { VotingCardsList } from "../common/votingCardsList";
import { VotingModal } from "../common/votingModal";
import { VotingPlayerCard } from "../common/votingPlayerCard";
import { VotingTimer } from "../common/votingTimer";
import { langVoting } from "../lang/langVoting";
import { MatchFooter } from "./matchFooter";

type Props = {
  voting: VotingDataType;
  onVote: (Id: VotingDataType["Variants"][0]["Id"]) => void;
  match: IMatchDto;
};

export const MatchVoting = ({ voting, onVote, match }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <SectionMatchInfo
        match={match}
        hideLine
        componentInHideLine={
          <IconContainer>
            <IconWinline heights={{ default: 2.97, descTop: 4.69, tablet: 9.33, mobile: 9.33 }} />
          </IconContainer>
        }
      />

      <Content>
        <VotingModal voting={voting} />
        <TitleContainer>
          <Title>{langVoting[locale].matchModalHeader}</Title>
          <VotingTimer voting={voting} />
        </TitleContainer>
        <VotingCardsList row={4}>
          {voting.Variants.map((elem) => (
            <VotingPlayerCard
              key={elem.Id}
              {...elem}
              active={voting.UserVariantId === elem.Id}
              onVote={onVote}
              size={4}
            />
          ))}
        </VotingCardsList>
        <MatchFooter />
      </Content>
    </>
  );
};

const Content = styled(ContainerContent)`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2.08vw;
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.27vw;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 700;
  font-size: 3.23vw;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin-bottom: 3.2vw;
  }
`;
