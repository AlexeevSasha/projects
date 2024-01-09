import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { LocaleType } from "../../api/dto/LocaleType";
import { getDateFromString, toISOString } from "../../assets/constants/date";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { Close } from "../../assets/icon/close";
import { theme } from "../../assets/theme/theme";
import { InputDate } from "../../components/input/inputDate";
import { CustomSelect } from "../../components/select/select";
import { ThemeContext } from "../../core/themeProvider";

type FilterType = {
  date: string;
  type: string;
};

export interface IFilterDataExcursion {
  TypeName: LocaleType;
  TypeId: number;
}

interface IProps {
  filterData?: IFilterDataExcursion[];
}

export const ToursFilter = ({ filterData }: IProps) => {
  const { query, push, locale = "ru" } = useRouter();
  const { control } = useForm<FilterType>();
  const { isDarkTheme } = useContext(ThemeContext);

  const { field: date } = useController({
    control,
    name: "date",
    defaultValue: query.date as string,
  });
  const { field: type } = useController({ control, name: "type", defaultValue: query.type as string });

  const options = useMemo(
    () =>
      filterData
        ? [
            { value: "allEvents", label: lang[locale].tickets.allEvents },

            ...filterData.map((item) => ({
              value: `${item.TypeId}`,
              label: getLocalValue(item.TypeName, locale),
            })),
          ]
        : [
            { value: "allEvents", label: lang[locale].tickets.allEvents },
            { value: "excursionTours", label: lang[locale].tickets.excursionTours },
            { value: "individualTours", label: lang[locale].tickets.individualTours },
            { value: "tourWithLegend", label: lang[locale].tickets.tourWithLegend },
            { value: "VIPTours", label: lang[locale].tickets.VIPTours },
          ],
    [filterData]
  );

  return (
    <GroupSelect>
      <InputDate
        value={getDateFromString(date.value)}
        onChange={(value: Date) => {
          const dateValue = value ? toISOString(value) : undefined;
          date.onChange(dateValue);
          push({ query: { ...query, date: dateValue } }, undefined, { scroll: false });
        }}
        dayPlaceholder={lang[locale].tickets.all}
        format={!date.value ? "dd MM yyy" : undefined}
        clearIcon={date.value ? <Close /> : null}
        locale={locale}
        lightStyle={!isDarkTheme}
      />

      <Select
        id="ticketsTourType"
        options={options}
        value={options.find(({ value }) => value === type.value) || options[0]}
        onChange={(value) => {
          type.onChange(value);
          push({ query: { ...query, type: value as string } }, undefined, { scroll: false });
        }}
        lightStyle={!isDarkTheme}
      />
    </GroupSelect>
  );
};

const GroupSelect = styled.form`
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-top: 3.13vw;
    margin-bottom: 5.22vw;
  }

  & > label {
    width: 12.7vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 50%;
    }
  }

  & .react-date-picker__wrapper {
    border: none;
  }

  & .react-date-picker__inputGroup__day::placeholder {
    color: ${theme.colors.white};
  }
`;

const Select = styled(CustomSelect)`
  width: 12.71vw;

  & .react-select__control {
    border: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 50%;
  }
`;
