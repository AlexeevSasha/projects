import { theme } from "common/styles/theme";
import React from "react";

interface IProps {
  active?: boolean;
}

export const IconRegisterRouter: React.FC<IProps> = React.memo(({ active }) => {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.215 8.39667L8.91333 9.69833C8.29 9.06583 7.685 8.25 7.2725 7.00333L9.05083 6.55417C9.34417 7.37 9.75667 7.92917 10.215 8.39667ZM11.3333 3.66667L7.66667 0L4 3.66667H6.76833C6.78667 4.40917 6.84167 5.07833 6.9425 5.65583L8.72083 5.20667C8.65667 4.76667 8.61083 4.24417 8.60167 3.66667H11.3333ZM20.5 3.66667L16.8333 0L13.1667 3.66667H15.9075C15.8158 7.04 14.7342 8.02083 13.5792 9.05667C13.1208 9.46 12.6533 9.9 12.25 10.4775C11.9383 10.0283 11.5808 9.67083 11.2142 9.34083L9.92167 10.6333C10.7742 11.4125 11.3333 12.045 11.3333 13.75V18.3333H13.1667V13.75C13.1667 11.8983 13.8175 11.3117 14.8075 10.4225C16.0725 9.28583 17.6308 7.87417 17.7408 3.66667H20.5V3.66667Z"
        fill={active ? theme.colors.green : theme.colors.hightBlue}
        stroke={active ? theme.colors.green : theme.colors.hightBlue}
      />
    </svg>
  );
});
