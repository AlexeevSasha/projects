import { theme } from "../theme/theme";

interface IProps {
  grayDark?: boolean;
}

export const IconTikTok = (props: IProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7052 3C16.1579 5.56494 17.1468 6.75239 20 7.15341V10.1038C18.4082 10.1038 17.0267 9.67411 15.9154 8.84342V15.0306C15.9154 18.6111 12.4185 22.3516 7.43294 20.5184C2.44735 18.6851 2.55323 9.33038 9.99879 9.33038V12.3953C7.41594 12.3953 6.39475 15.2597 8.19677 16.9211C9.99879 18.5825 12.6418 17.1216 12.6418 15.0306V3H15.7052Z"
        stroke={props.grayDark ? theme.colors.grayDark : "white"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
