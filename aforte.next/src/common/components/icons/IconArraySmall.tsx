import styled from "astroturf/react";

type Props = {
  size?: "sm" | "md";
  rotate?: string;
};

export const IconArraySmall = ({ size = "sm", rotate = "0" }: Props) => {
  return (
    <Svg
      size={size}
      style={{ transform: `rotate(${rotate})` }}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 5L6 8.5L2.5 5"
        stroke="#5383C7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Svg = styled.svg<{ size: "sm" | "md" }>`
  &.size-sm {
    width: 12px;
    height: 13px;
  }
  &.size-md {
    width: 16px;
    height: 16px;
  }
`;
