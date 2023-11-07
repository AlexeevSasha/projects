import { useRouter } from "next/router";
import { getLanguage } from "../../../public/locales/lang";

interface IProps {
  show?: boolean;
  fixed?: boolean;
}

const LoadingScreen = ({ show = true, fixed }: IProps) => {
  const { locale } = useRouter();
  return (
    <div
      className={`fullScreen fixed z-10 bg-amber-50  transition-opacity duration-500 ease-in-out ${
        show ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      } ${fixed ? "fixed top-0" : ""}  `}
    >
      {getLanguage(locale).common.loading}...
    </div>
  );
};

export default LoadingScreen;
