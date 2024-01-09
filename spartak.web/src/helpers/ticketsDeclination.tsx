import { useRouter } from "next/router";
import { lang } from "../../public/locales/lang";

export const TicketsDeclination = (amount: number) => {
  const { locale = "ru" } = useRouter();
  return `${amount} ${lang[locale].ticketsDeclination.ticket}${
    amount % 100 > 4
      ? lang[locale].ticketsDeclination.genitivePluralEnding
      : amount % 100 > 1
      ? lang[locale].ticketsDeclination.genitiveSingleEnding
      : ""
  }`;
};
