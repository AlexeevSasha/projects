import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { DropdownList } from "../../components/dropdownList/dropdownList";
import { ExcursionCard } from "./excursionCard";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import { EmptyScreenMatches } from "../pageMatches/emptyScreenMatches/emptyScreenMatches";
import { formatDate } from "../../assets/constants/date";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { ThemeContext } from "../../core/themeProvider";
import { IExcursion } from "../../api/dto/IEscursionTour";

interface Iprops {
  excursions?: IExcursion[];
  setLoading: (val: boolean) => void;
}

export const Excursions = ({ excursions, setLoading }: Iprops) => {
  const { locale = "ru", query } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const sortedArr = excursions
    ?.filter((item) => new Date(item.ExcursionDate) > new Date() && item)
    ?.sort((a, b) => +new Date(a?.ExcursionDate) - +new Date(b?.ExcursionDate));

  const result: { [key: string]: IExcursion[] } =
    sortedArr?.reduce((acc, item) => {
      const splitItem = item.ExcursionDate?.split("T");
      const key = splitItem[0];

      return { ...acc, [key]: [...(acc[key] || []), item] };
    }, {} as { [key: string]: IExcursion[] }) || {};

  const resultKeys = Object.keys(result);

  const renderCard = useMemo(
    () => (key: string) =>
      result[key]
        ?.sort((a, b) => b.TypeId - a.TypeId)
        ?.map((elem, index) =>
          elem.Limit > 0 ? (
            <ExcursionCard
              key={`${elem}:${index}`}
              name={getLocalValue(elem.Name, locale)}
              date={formatDate(elem.ExcursionDate as string, "HH:mm", locale)}
              limit={elem.Limit}
              nameType={getLocalValue(elem.SeatrootName, locale)}
              id={elem.InfoTechId}
              setLoading={setLoading}
            />
          ) : null
        ),
    [query]
  );
  return (
    <Container>
      {sortedArr?.length ? (
        resultKeys.map((key) =>
          result[key].length ? (
            <DropdownList key={key} title={`${formatDate(key as string, "dd MMMM yyyy, ww", locale)} `} defaultState>
              <CardContainer>{renderCard(key)}</CardContainer>
            </DropdownList>
          ) : null
        )
      ) : (
        <EmptyScreenMatches
          text={lang[locale].tickets.infoAbouttoursLater}
          title={lang[locale].tickets.noTours}
          srcImg={`/images/tickets/tickets${isDarkTheme ? "Black" : "White"}.svg`}
        />
      )}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  margin-bottom: 7.29vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
  }
`;
