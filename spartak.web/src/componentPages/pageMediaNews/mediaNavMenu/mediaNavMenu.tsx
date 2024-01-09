import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ICategory } from "../../../api/dto/ICategory";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import { INavMenuList } from "../../../components/header/component/getMenuItems";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { CustomSelect, SelectOption } from "../../../components/select/select";
import { ThemeContext } from "../../../core/themeProvider";

interface IProps {
  subMenuList: INavMenuList[];
  categoryList: ICategory[];
}

export const MediaNavMenu = (props: IProps) => {
  const { locale = "ru", query, push, pathname } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const [monthValue, setMonthValue] = useState<SelectOption | null>({
    value: (query.month || "").toString(),
    label: lang[locale].monthList.default[(query.month || "").toString()],
  });
  const [yearValue, setYearValue] = useState<SelectOption | null>({
    value: (query.year || "").toString(),
    label: (query.year || "").toString(),
  });
  const [categoryValue, setCategoryValue] = useState<SelectOption | null>({
    value: (query.category || "").toString(),
    label: (query.category || "").toString(),
  });

  useEffect(() => {
    if (query.year && query.month) {
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
  }, [query]);

  const categoryOptions = useMemo(() => {
    const sortedCategoryList = props.categoryList
      // .filter((x) => !getLocalValue(x.CategoryName, "ru").includes("Академи"))
      .sort((a, b) => (getLocalValue(a.CategoryName, locale) > getLocalValue(b.CategoryName, locale) ? 1 : -1));

    return new Array(sortedCategoryList.length + 1).fill(1).map((_, index): SelectOption => {
      if (index == 0) return { value: "0", label: lang[locale].mediaVideoAllCategory };
      return {
        value: sortedCategoryList[index - 1]?.Id,
        label: getLocalValue(sortedCategoryList[index - 1]?.CategoryName, locale),
      };
    });
  }, [locale]);

  const changeCategory = useCallback(
    (val: SelectOption | null) => {
      push({ pathname, query: { ...query, category: val?.value } }, undefined, { scroll: false });
    },
    [push, pathname, query]
  );

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
    [push, pathname, query]
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
        push({ pathname, query: { ...query, year: val?.value } }, undefined, { scroll: false });
      }
    },
    [push, pathname]
  );

  return (
    <NavMenuContainer>
      <ContainerHorizontalScroll>
        <NavMenu menuList={props.subMenuList} noTheme usePrevQueryParam />
      </ContainerHorizontalScroll>
      <GroupSelect>
        <CategorySelect>
          <CustomSelect
            lightStyle={!isDarkTheme}
            options={categoryOptions}
            onSelect={changeCategory}
            value={categoryValue}
            id="MediaNavMenu0"
          />
        </CategorySelect>
        <ContainerSelect>
          <CustomSelect
            lightStyle={!isDarkTheme}
            options={monthOptions}
            onSelect={changeMonth}
            value={monthValue}
            id="MediaNavMenu1"
          />
        </ContainerSelect>
        <ContainerSelect>
          <CustomSelect
            lightStyle={!isDarkTheme}
            options={yearOptions}
            onSelect={changeYear}
            value={yearValue}
            id="MediaNavMenu2"
          />
        </ContainerSelect>
      </GroupSelect>
    </NavMenuContainer>
  );
};

const arrYear = new Array(new Date().getFullYear() - 1992).fill(1);

const NavMenuContainer = styled(ContainerContent)`
  padding: 4.17vw 0 2.08vw;
  z-index: 10;

  nav > a {
    color: ${({ theme }) => theme.colors.white_black};

    :hover {
      border-bottom-color: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 6.4vw;
    flex-direction: column;
  }
`;

const GroupSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1.25vw;
  grid-row-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-top: 3.13vw;
    margin-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContainerSelect = styled.div`
  width: 12.71vw;
  text-transform: capitalize;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;
const CategorySelect = styled(ContainerSelect)`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-start: 1;
    grid-column-end: 3;
  }
`;
