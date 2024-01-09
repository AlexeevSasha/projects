import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ISeasonsResults } from "../../../api/dto/IClubResults";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconRedPoint } from "../../../assets/icon/iconRedPoint";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { Pagination } from "../../../components/pagination/pagination";
import { TitleFromCMS } from "../../../ui/titleFromCMS/titleFromCMS";

interface IProps {
  results?: ISeasonsResults[];
}

const pageSize = 8;

export const ResultsHistory = ({ results }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [currentPage, setPage] = useState(1);

  const seasonsResults = results?.slice(currentPage * pageSize - pageSize, currentPage * pageSize);

  return seasonsResults ? (
    <Container>
      <TitleFromCMS>{lang[locale].footer.nav.seasonsResults}</TitleFromCMS>

      {seasonsResults?.sort().map((item, i) => (
        <ResultsList key={"season" + i}>
          <SeasonYearBlock>
            <span>
              {item.seasonStart}
              {item.seasonEnd && "/"}
            </span>
            <span>{item.seasonEnd}</span>
          </SeasonYearBlock>

          <BlockAchievements>
            <RoundAndPlace>
              {item.achievements?.map((elem, i) => (
                <RedPoint key={"achievement" + i}>
                  <IconRedPoint />

                  <ListItem>{getLocalValue(elem, locale)}</ListItem>
                </RedPoint>
              ))}
            </RoundAndPlace>
          </BlockAchievements>
        </ResultsList>
      ))}

      <Pagination
        currentPage={currentPage}
        itemsCount={results?.length || 0}
        pageSize={pageSize}
        onPageChange={({ selected }) => setPage(selected + 1)}
      />
    </Container>
  ) : null;
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  font-family: "FCSM Text", sans-serif;
  margin: 4.17vw auto 5.21vw auto;

  > h1 {
    color: ${(props) => props.theme.colors.white_black};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 10.43vw auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto;
  }
`;

const ResultsList = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 33% 66%;
  align-items: center;
  border-bottom: 0.05vw solid ${theme.colors.grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 35% 65%;
    border-bottom: 0.13vw solid ${theme.colors.grayDark};
    padding: 3.13vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 20.53vw auto;
    border-bottom: 0.27vw solid ${theme.colors.grayDark};
    align-items: unset;
    grid-gap: 4.27vw;
    padding: 4.27vw 0;
  }
`;

const SeasonYearBlock = styled.span`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;
  font-size: 2.08vw;
  color: ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    text-align: center;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-weight: 500;
    font-family: "FCSM Text", sans-serif;
    font-size: 4.8vw;
  }
`;

const BlockAchievements = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: auto;
    grid-gap: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 2.13vw;
  }
`;

const RoundAndPlace = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1.25vw 0;
  width: 100%;
  gap: 0.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-auto-flow: row;
    margin: 0;
    gap: 1.04vw;
    padding: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
    list-style: none;
  }
`;

const RedPoint = styled.li`
  list-style: none;
  position: relative;
  align-items: center;
  display: grid;
  grid-template-columns: 1.25vw auto;
  gap: 0.625vw;

  svg {
    height: 1.25vw;
    width: 1.25vw;
    padding-right: 0.42vw;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 3.13vw auto;
    gap: 1.04vw;

    svg {
      height: 3.13vw;
      width: 3.13vw;
      padding-right: 10.4vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: auto;
    gap: 2.13vw;

    svg {
      display: none;
    }
  }
`;

const ListItem = styled.span`
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;
  color: ${(props) => props.theme.colors.gray_black};
  font-weight: 500;
  line-height: 1.77vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    line-height: 4.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
`;
