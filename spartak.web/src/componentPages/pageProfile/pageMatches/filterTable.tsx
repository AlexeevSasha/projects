import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ISeasonNoLocate } from "../../../api/dto/ITournamentAndSeasons";
import { theme } from "../../../assets/theme/theme";
import { CustomSelect } from "../../../components/select/select";
import { ThemeContext } from "../../../core/themeProvider";

type Props = {
  seasonList: ISeasonNoLocate[];
  SeasonId: string;
};

export const FilterTable = ({ SeasonId, seasonList }: Props) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const seasonOptions = useMemo(() => {
    const options = (seasonList || []).map(({ Id, Name }) => ({
      value: Id,
      label: Name,
    }));

    options.unshift({ value: "", label: lang[locale].profileMatches.allSeasons });

    return options;
  }, [seasonList]);

  const router = useRouter();
  const handleChange = (newValue: any) => {
    const SeasonId = newValue as string;
    console.log(SeasonId);
    {
      router.push(
        {
          pathname: router.pathname,
          query: { page: 1, SeasonId: SeasonId as string },
        },
        undefined,
        { scroll: false, shallow: true }
      );
    }
  };

  return (
    <SelectsBlock>
      <CustomSelect
        lightStyle={!isDarkTheme}
        value={seasonOptions.find(({ value }) => value === SeasonId)}
        defaultValue={seasonOptions[1]}
        onChange={handleChange}
        options={seasonOptions}
        placeholder={lang[locale].profileMatches.season}
        isDisabled={seasonOptions.length < 2}
      />
    </SelectsBlock>
  );
};

const SelectsBlock = styled.div`
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    gap: 2.13vw;
  }
`;
