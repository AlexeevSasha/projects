import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CustomSelect, SelectOption } from "../../../components/select/select";
import styled from "styled-components";
import { ContainerContent } from "../../../components/containers/containerContent";
import { theme } from "../../../assets/theme/theme";
import { lang } from "../../../../public/locales/lang";
import { useRouter } from "next/router";
import { ThemeContext } from "../../../core/themeProvider";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { ICategory } from "../../../api/dto/ICategory";

const arrYear = new Array(new Date().getFullYear() - 1992).fill(1);

interface IProps {
  categoryList: ICategory[];
}

export const MediaNav = (props: IProps) => {
  const { locale = "ru", push, pathname, query } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const [mediaTypeValue, setMediaTypeValue] = useState<SelectOption | null>({
    value: (query.mediaType || "").toString(),
    label: lang[locale].mediaType.default[(query.mediaType || "").toString()],
  });
  const [categoryValue, setCategoryValue] = useState<SelectOption | null>({
    value: (query.category || "").toString(),
    label: (query.category || "").toString(),
  });
  const [monthValue, setMonthValue] = useState<SelectOption | null>({
    value: (query.month || "").toString(),
    label: lang[locale].monthList.default[(query.month || "").toString()],
  });
  const [yearValue, setYearValue] = useState<SelectOption | null>({
    value: (query.year || "").toString(),
    label: (query.year || "").toString(),
  });

  const changeMediaType = useCallback(
    (val: SelectOption | null) => {
      push({ pathname, query: { ...query, mediaType: val?.value, category: "0" } }, undefined, { scroll: false });
    },
    [query]
  );

  const mediaOptions = useMemo(() => {
    return ["All", "News", "Gallery", "Video"].map(
      (item): SelectOption => ({
        value: item,
        label: lang[locale].mediaType.default[item],
      })
    );
  }, [locale]);

  const categoryOptions = useMemo(() => {
    const sortedCategoryList = props.categoryList
      // .filter((x) => getLocalValue(x.CategoryName, "ru").includes("Академи"))
      .sort((a, b) => (getLocalValue(a.CategoryName, locale) > getLocalValue(b.CategoryName, locale) ? 1 : -1));

    return new Array(sortedCategoryList.length + 1).fill(1).map((_, index): SelectOption => {
      if (index == 0) return { value: "0", label: lang[locale].mediaVideoAllCategory };
      return {
        value: sortedCategoryList[index - 1]?.Id,
        label: getLocalValue(sortedCategoryList[index - 1]?.CategoryName, locale),
      };
    });
  }, [locale, props.categoryList]);

  const changeCategory = useCallback(
    (val: SelectOption | null) => {
      push({ pathname, query: { ...query, category: val?.value } }, undefined, { scroll: false });
    },
    [push, pathname, query]
  );

  useEffect(() => {
    if (query.year && query.month && query.mediaType) {
      setMediaTypeValue({
        value: (query.mediaType || "").toString(),
        label: lang[locale].mediaType.default[(query.mediaType || "").toString()],
      });
      setMonthValue({
        value: (query.month || "").toString(),
        label: lang[locale].monthList.default[(query.month || "").toString()],
      });
      setYearValue({
        value: (query.year || "").toString(),
        label: (query.year || "").toString(),
      });
      setCategoryValue(categoryOptions.find((cat) => cat.value == query.category) || categoryOptions[0]);
    }
  }, [query, categoryOptions]);

  const monthOptions = useMemo(() => {
    if (yearValue?.value && +yearValue?.value == new Date().getFullYear()) {
      return new Array(new Date().getMonth() + 1)
        .fill(1)
        .map(
          (_, index): SelectOption => ({
            value: index.toString(),
            label: lang[locale].monthList.default[index],
          })
        )
        .reverse();
    } else {
      return new Array(12)
        .fill(1)
        .map(
          (_, index): SelectOption => ({
            value: index.toString(),
            label: lang[locale].monthList.default[index],
          })
        )
        .reverse();
    }
  }, [yearValue]);

  const changeMonth = useCallback(
    (val: SelectOption | null) => {
      push({ pathname, query: { ...query, month: val?.value } }, undefined, { scroll: false });
    },
    [query]
  );

  const yearOptions = useMemo(() => {
    const year = new Date().getFullYear();

    return arrYear.map(
      (_, index): SelectOption => ({
        value: (year - index).toString(),
        label: (year - index).toString(),
      })
    );
  }, []);

  const changeYear = useCallback(
    (val: SelectOption | null) => {
      if (val?.value && +val?.value == new Date().getFullYear()) {
        setMonthValue({
          value: new Date().getMonth().toString(),
          label: lang[locale].monthList.default[new Date().getMonth().toString()],
        });
        push({ pathname, query: { ...query, month: new Date().getMonth(), year: val.value } }, undefined, {
          scroll: false,
        });
      } else {
        push({ pathname, query: { ...query, year: val?.value } }, undefined, {
          scroll: false,
        });
      }
    },
    [query]
  );

  return (
    <StyledNav>
      <ContainerSelect>
        <CustomSelect
          options={mediaOptions}
          onSelect={changeMediaType}
          value={mediaTypeValue}
          id="MediaTypeMenu"
          lightStyle={!isDarkTheme}
        />
      </ContainerSelect>
      <ContainerSelect>
        <CustomSelect
          lightStyle={!isDarkTheme}
          options={categoryOptions}
          onSelect={changeCategory}
          value={categoryValue}
          id="MediaNavMenu0"
        />
      </ContainerSelect>
      <ContainerSelect>
        <CustomSelect
          options={monthOptions}
          onSelect={changeMonth}
          value={monthValue}
          id="MediaNavMenu1"
          lightStyle={!isDarkTheme}
        />
      </ContainerSelect>
      <ContainerSelect>
        <CustomSelect
          options={yearOptions}
          onSelect={changeYear}
          value={yearValue}
          id="MediaNavMenu2"
          lightStyle={!isDarkTheme}
        />
      </ContainerSelect>
    </StyledNav>
  );
};

const StyledNav = styled(ContainerContent)`
  justify-content: flex-end;
  column-gap: 1.25vw;
  padding-top: 4.17vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 6.4vw;
    row-gap: 6.4vw;
    flex-direction: column;
  }
`;

const ContainerSelect = styled.div`
  display: flex;
  width: 12.71vw;
  text-transform: capitalize;

  .react-select__control {
    border: none;
  }
  .react-select__menu {
    z-index: 3;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 50%;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
  }
`;
