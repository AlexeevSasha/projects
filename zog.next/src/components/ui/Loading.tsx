import { useRouter } from "next/router";
import { getLanguage } from "../../../public/locales/lang";

export const Loading = () => {
  const { locale } = useRouter();

  return <div>{getLanguage(locale).common.loading}...</div>;
};
