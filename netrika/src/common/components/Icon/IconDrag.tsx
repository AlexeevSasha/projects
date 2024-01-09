import React from "react";

interface IProps {
  width?: number;
  height?: number;
}

export const IconDrag = React.memo((props: IProps) => (
  <svg
    width={`${props.width || 6}`}
    height={`${props.height || 10}`}
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="1" cy="5" r="1" fill="#878990" />
    <circle cx="5" cy="5" r="1" fill="#878990" />
    <circle cx="1" cy="1" r="1" fill="#878990" />
    <circle cx="5" cy="1" r="1" fill="#878990" />
    <circle cx="1" cy="9" r="1" fill="#878990" />
    <circle cx="5" cy="9" r="1" fill="#878990" />
  </svg>
));
