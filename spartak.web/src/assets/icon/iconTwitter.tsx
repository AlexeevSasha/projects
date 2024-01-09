import { theme } from "../theme/theme";

interface IProps {
  grayDark?: boolean;
}
export const IconTwitter = (props: IProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.50002 18.75C4.50002 18.75 8.25002 18 9.00002 15.75C9.00002 15.75 3.00002 13.5 4.50002 5.25C4.50002 5.25 7.50002 9 12 9.75V8.25027C12.0001 7.38867 12.2968 6.55337 12.8403 5.8848C13.3838 5.21624 14.1409 4.75517 14.9843 4.57913C15.8277 4.40309 16.7061 4.5228 17.4716 4.91814C18.2371 5.31348 18.8432 5.96034 19.188 6.74997L22.5 6.75L19.5 9.75C19.5 15 15.75 20.25 9.00002 20.25C6.00002 20.25 4.50002 18.75 4.50002 18.75Z"
        stroke={props.grayDark ? theme.colors.grayDark : "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
