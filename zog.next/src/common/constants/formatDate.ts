export const formatDate = (date: Date | string | undefined, formatString: string) => {
  if (!date) return "invalid date";

  const newDate = typeof date === "string" ? new Date(date) : date;

  if (newDate.getDate()) {
    return (
      formatString
        .replace("dddd", padZero(Math.floor(+newDate / 1000 / 60 / 60 / 24))) //дни для таймеров
        .replace("dd", padZero(newDate.getDate()))
        // .replace("DD", padZero(newDate.getDate() - 1))
        //   .replace("mmmm", lang[locale].monthList.default[newDate.getMonth()])
        //   .replace("MMMM", lang[locale].monthList.declination[newDate.getMonth()])
        .replace("MM", padZero(newDate.getMonth() + 1))
        .replace("yyyy", String(newDate.getFullYear()))
        .replace("yy", String(newDate.getFullYear()).substring(2))
        .replace("HH", padZero(newDate.getHours()))
        .replace("mm", padZero(newDate.getMinutes()))
        .replace("ss", padZero(newDate.getSeconds()))
    );
    //   .replace("ww", getDayOfWeek(+padZero(newDate.getDay()), locale));
  } else {
    return "invalid date";
  }
};

const padZero = (n: number): string => (n < 10 ? `0${n}` : String(n));
