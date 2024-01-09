import { VotingBanner } from "./common/votingBanner";
import { MatchVoting } from "./matchVoting/matchVoting";
import { MonthVoting } from "./monthVoting/monthVoting";
import { SeasonVoting } from "./seasonVoting/seasonVoting";

const Voting = () => {
  return <></>;
};

Voting.MonthVoting = MonthVoting;
Voting.MatchVoting = MatchVoting;
Voting.Banner = VotingBanner;
Voting.SeasonVoting = SeasonVoting;

export { Voting };
