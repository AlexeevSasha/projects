import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { IMediaShort } from "../../../../api/dto/IMedia";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { DropdownList } from "../../../../components/dropdownList/dropdownList";
import { VotingDataType } from "../../interfaces/VotingT";
import { PopupAfterVoting } from "../common/popupAfterVoting";
import { PromotionRules } from "../common/promotionRules";
import { VotingCardsList } from "../common/votingCardsList";
import { VotingModal } from "../common/votingModal";
import { VotingPlayerCard } from "../common/votingPlayerCard";
import { VotingSectionTitle } from "../common/votingSectionTitle";
import { langVoting } from "../lang/langVoting";
import { VotingNews } from "../monthVoting/votingNews";
import { SeasonVotingBanner } from "./seasonVotingBanner";
import { SeasonVotingConditions } from "./seasonVotingConditions";
import { SeasonVotingHeader } from "./seasonVotingHeader";

type Props = {
  voting: VotingDataType;
  onVote: (Id: VotingDataType["Variants"][0]["Id"]) => void;
  news: IMediaShort[] | null;
};

// Экспортировать вне модуля только через конструкцию Voting.[Component]
export const SeasonVoting = ({ voting, onVote, news }: Props) => {
  const { locale = "ru" } = useRouter();
  const size = useMemo(() => {
    return voting.Variants.length % 3 === 1 ? 4 : 3;
  }, [voting]);

  return (
    <>
      <SeasonVotingHeader voting={voting} />

      <Content>
        <VotingModal voting={voting} />
        <SeasonVotingBanner />
        <SeasonVotingConditions isVote={!!voting.UserVariantId} />
        <VotingSectionTitle>
          {voting.UserVariantId ? <PopupAfterVoting /> : null}
          {langVoting[locale].playersBlockTitle}{" "}
          <span style={{ textTransform: "uppercase" }}>
            {/* {lang[locale].monthList.declination[new Date(voting.Month).getMonth()]} */}
          </span>
        </VotingSectionTitle>
        <VotingCardsList row={size}>
          {voting.Variants.map((elem) => (
            <VotingPlayerCard
              key={elem.Id}
              {...elem}
              active={voting.UserVariantId === elem.Id}
              onVote={onVote}
              size={size}
            />
          ))}
        </VotingCardsList>

        {news ? <VotingNews news={news} title={langVoting[locale].newsTitle} /> : null}

        <DropdownList customTitle={<SubHeader>{langVoting[locale].rulesTitle}</SubHeader>} className="rules">
          <PromotionRules />
        </DropdownList>
      </Content>
    </>
  );
};

const Content = styled(ContainerContent)`
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    .rules {
      margin-bottom: 16vw;
    }
  }
`;

const SubHeader = styled.h3`
  font-weight: 700;
  font-size: 2.08vw;
  margin: 0.05vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
