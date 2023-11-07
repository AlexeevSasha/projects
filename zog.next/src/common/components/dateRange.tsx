import React, { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { enStaticRanges, ruStaticRanges } from "../constants/localDateRange";
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/router";

interface IDataRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface IProps {
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  onChange: (startDate: Date, endDate: Date) => void;
}

export const DateRange = ({ startDate, endDate, onChange }: IProps) => {
  const { locale } = useRouter();
  const [date, setDate] = useState<IDataRange>({
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
    key: "selection",
  });

  const handlerChange = (item: RangeKeyDict) => {
    const data = item.selection as IDataRange;
    setDate(data);
    onChange(data.startDate, data.endDate);
  };

  return (
    <DateRangePicker
      months={1}
      locale={locale === "en" ? enLocale : ruLocale}
      direction="vertical"
      scroll={{ enabled: true }}
      ranges={[date]}
      onChange={(item) => handlerChange(item)}
      staticRanges={locale === "en" ? enStaticRanges : ruStaticRanges}
      inputRanges={[]}
    />
  );
};
