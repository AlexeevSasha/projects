import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ISeasonNoLocate } from "../../../api/dto/ITournamentAndSeasons";
import { IContactMatch } from "../../../api/dto/TicketDto";
import { profileMatchesRepository } from "../../../api/profileMatchesRepository";
import { formatDate } from "../../../assets/constants/date";
import { IconCheckMark } from "../../../assets/icon/iconCheckMark";
import { theme } from "../../../assets/theme/theme";
import { Pagination } from "../../../components/pagination/pagination";
import { Tooltip } from "../../../components/tooltip/tooltip";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { EmptyScreen } from "./emptyScreen";
import { FilterTable } from "./filterTable";

interface IProps {
  seasonList: ISeasonNoLocate[];
}

export const TableMatches = ({ seasonList }: IProps) => {
  const { locale = "ru", query } = useRouter();
  const [loading, setLoading] = useState(false);
  const currentPage = +(query.page || 1);
  const SeasonId = Object.keys(query).includes("SeasonId") ? (query.SeasonId as string) : seasonList?.[0]?.Id || "";
  const pageSize = 10;
  const countRef = useRef<number>(0);
  const matchesRef = useRef<IContactMatch[] | undefined>();

  useEffect(() => {
    setLoading(true);
    if (SeasonId !== undefined)
      profileMatchesRepository
        .fetchMatches({ pageSize, currentPage, SeasonId })
        .then((res) => {
          console.log(res);
          matchesRef.current = res.Items;
          countRef.current = res.Count;
          setLoading(false);
        })
        .catch(() => setLoading(false));
  }, [SeasonId, currentPage]);

  return (
    <Container>
      <TitleAndSelects>
        <Title>{lang[locale].profileMatches.title}</Title>

        <FilterTable SeasonId={SeasonId} seasonList={seasonList} />
      </TitleAndSelects>

      {loading ? (
        <LoadingScreen />
      ) : !!countRef.current ? (
        <>
          <Table>
            <THead>
              <Tr>
                <Th>{lang[locale].profileMatches.event}</Th>
                <Th>{lang[locale].profileMatches.eventDate}</Th>
                <Th>{lang[locale].profileMatches.pointsAwarded}</Th>
                <Th>{lang[locale].profileMatches.pointBurnDate}</Th>
                <Th>{lang[locale].profileMatches.status}</Th>
              </Tr>
            </THead>

            <TBody>
              {matchesRef.current?.map(({ Id, Bonus, BonusFinishDate, IsVisited, Match, Date, IsBonusFinished }) => (
                <Tr key={Id} IsBonusFinished={IsBonusFinished === true}>
                  <TdEvent>{Match}</TdEvent>

                  <TdEventDate>
                    <Label>{lang[locale].profileMatches.eventDate}</Label>
                    {Date ? formatDate(Date, "dd.MM.yyyy", locale) : "-"}
                  </TdEventDate>

                  <TdPoints IsBonusFinished={IsBonusFinished === true}>
                    <Label>{lang[locale].profileMatches.pointsAwarded}</Label>
                    <span>{Bonus}</span>
                    {IsBonusFinished && (
                      <InfoTooltip>
                        <Tooltip position="bottom">{lang[locale].profileMatches.bornTooltip}</Tooltip>
                      </InfoTooltip>
                    )}
                  </TdPoints>

                  <TdResetPoints>
                    <Label>{lang[locale].profileMatches.pointBurnDate}</Label>
                    {BonusFinishDate ? formatDate(BonusFinishDate, "dd.MM.yyyy", locale) : "-"}
                  </TdResetPoints>

                  <TdStatus>
                    {!IsVisited && <StatusUnvisited>{lang[locale].profileMatches.notVisited}</StatusUnvisited>}

                    {IsVisited && (
                      <StatusVisited>
                        <CheckMark /> {lang[locale].profileMatches.visited}
                      </StatusVisited>
                    )}
                  </TdStatus>
                </Tr>
              ))}
            </TBody>
          </Table>

          <Pagination itemsCount={countRef.current} shallow currentPage={currentPage} />
        </>
      ) : (
        <EmptyScreen />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.white_black};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 16px;
  }
`;

const THead = styled.thead`
  background: ${({ theme }) => theme.colors.blackLight_red};

  & > tr {
    border: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const TBody = styled.tbody`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    border-top: 0.05vw solid ${theme.colors.grayDark};
  }
`;

const Tr = styled.tr<{ IsBonusFinished?: boolean }>`
  border-bottom: ${({ theme }) => `0.05vw solid ${theme.colors.grayDark_gray1}`};
  color: ${({ theme, IsBonusFinished }) => (IsBonusFinished ? theme.colors.gray_grayDark1 : "unset")};

  & > *:first-child {
    width: 26.67vw;
    padding-left: 2.08vw;
  }

  & > * {
    width: 13.96vw;
    box-sizing: border-box;
    text-align: left;
    padding-left: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.3vw;

    & > *:first-child {
      width: auto;
    }

    & > * {
      width: 18.5658vw;
      padding-left: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: grid;
    grid-template-columns: 6fr 1fr 6fr 1fr 6fr;
    grid-template-rows: auto;
    row-gap: 4.8vw;
    column-gap: 1vw;
    grid-template-areas:
      "TdEvent TdEvent TdEvent TdStatus TdStatus"
      "TdEventDate TdEventDate TdPoints TdPoints TdResetPoints";
    padding: 6.4vw 0;
    font-size: 2.66vw;
  }
`;

const Th = styled.th`
  font-size: 0.83vw;
  color: ${({ theme }) => theme.colors.gray_white};
  font-weight: 700;
  text-transform: uppercase;
  height: 2.8125vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.3vw;
    font-weight: 500;
    height: 6.258vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0;
    height: auto;
  }
`;

const Td = styled.td`
  font-weight: 500;
  font-size: 1.25vw;
  height: 5.1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    height: 15.38vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding: 0;
    height: auto;
  }
`;

const TdEvent = styled(Td)`
  grid-area: TdEvent;
`;

const InfoTooltip = styled.div`
  position: relative;
  display: none;
  width: 2.08vw;
  float: left;
`;

const TdPoints = styled(Td)<{ IsBonusFinished?: boolean }>`
  grid-area: TdPoints;

  ${Tr}:hover & > span:nth-child(2) + div {
    display: flex;
  }

  & > span:nth-child(2) {
    cursor: ${({ IsBonusFinished }) => (IsBonusFinished ? "pointer" : "unset")};
  }
`;

const TdResetPoints = styled(Td)`
  grid-area: TdResetPoints;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: 10px;
  }
`;

const TdEventDate = styled(Td)`
  grid-area: TdEventDate;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: -5px;
  }
`;

const TdStatus = styled(Td)`
  grid-area: TdStatus;
`;

const StatusUnvisited = styled.span`
  font-size: 0.73vw;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  text-transform: uppercase;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.blackLight_white1};
  padding: 0.28vw 0.92vw;
  border-radius: 1.04vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    padding: 0.46vw 2.11vw;
    border-radius: 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    padding: 0.94vw 3.4vw;
    border-radius: 5.33vw;
  }
`;

const StatusVisited = styled(StatusUnvisited)`
  display: flex;
  align-items: center;
  color: ${theme.colors.green};
  background: ${theme.colors.greenOpacity};
  width: fit-content;
  margin: 0;
  padding: 0.28vw 0.78vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0.13vw 1.7vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0.27vw 4.01vw;

    margin-left: -10px;

    svg {
      display: block;
    }
  }
`;

const TitleAndSelects = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  width: 100%;
  padding: 4.17vw 0 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 5.22vw 0 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0 6.4vw;
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 2.08vw;
  font-weight: 700;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 6.4vw;
    font-size: 8.53vw;
  }
`;

const Label = styled.span`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
    color: ${theme.colors.gray};
    font-size: 2.67vw;
    padding-bottom: 2.13vw;
    text-transform: uppercase;
    white-space: nowrap;
  }
`;

const CheckMark = styled(IconCheckMark)`
  padding-right: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
