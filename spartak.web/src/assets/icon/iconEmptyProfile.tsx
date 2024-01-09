import styled, { CSSProperties } from "styled-components";
import { theme } from "../theme/theme";

interface IProps {
  style?: CSSProperties;
  onClick?: () => void;
  color?: string;
}

export const IconEmptyProfile = (props: IProps) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style}
      onClick={props.onClick}
    >
      <circle cx="12" cy="12" r="11" fill="#0D1116" stroke={props.color ?? `${theme.colors.white}`} strokeWidth="2" />
      <path
        d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z"
        stroke={props.color ?? `${theme.colors.white}`}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M5.93677 17.4994C6.55149 16.4354 7.4354 15.5519 8.49969 14.9376C9.56399 14.3234 10.7712 14 12 14C13.2289 14 14.4361 14.3234 15.5003 14.9377C16.5646 15.552 17.4485 16.4355 18.0632 17.4995"
        stroke={props.color ?? `${theme.colors.white}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
const Svg = styled.svg`
  circle {
    fill: ${(props) => props.theme.colors.black_redDark};
  }
`;
