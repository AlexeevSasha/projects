import React from "react";
import { PageProps } from "../../../pages/_app";
import { IMatchDto } from "../../api/dto/IMatchDto";
import { GetLayout } from "../../components/layout/getLayout";
import { SectionMatchInfo } from "../../components/sectionMatchInfo/sectionMatchInfo";
import { ForthcomingMatchTimer } from "../pageMatchInfo/forthcomingMatchTimer/forthcomingMatchTimer";
import { MatchInfoNavBar } from "../pageMatchInfo/matchInfoNavBar/matchInfoNavBar";
import { getLocalValue } from "../../assets/helpers/getLocalValue";

export type ProfileLayoutsProps = PageProps & {
  match?: IMatchDto;
  banner: string;
};

export const MatchInfoLayout = (page: JSX.Element, { match, banner, ...props }: ProfileLayoutsProps) => {
  const futureMatch = match?.Date ? new Date(match?.Date) > new Date() : true;

  return GetLayout(
    <>
      {match &&
        (futureMatch ? (
          <ForthcomingMatchTimer match={match} />
        ) : (
          <SectionMatchInfo match={match} bannerSrc={getLocalValue(banner, "ru")} />
        ))}
      <MatchInfoNavBar hideSelect />
      {page}
    </>,
    props
  );
};
