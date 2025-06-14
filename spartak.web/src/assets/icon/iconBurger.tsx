import { theme } from "../theme/theme";

interface IProps {
  color?: string;
}

export const IconBurger = (props: IProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 12H20.25"
        stroke={props.color ?? `${theme.colors.white}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 6H20.25"
        stroke={props.color ?? `${theme.colors.white}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 18H20.25"
        stroke={props.color ?? `${theme.colors.white}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
