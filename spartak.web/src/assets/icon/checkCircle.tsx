import React, { DetailedHTMLProps, SVGAttributes } from "react";

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & { title?: string };

export const CheckCircleIcon = ({ title, ...props }: Props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.2198 4.30587C22.6032 4.70343 22.5917 5.33649 22.1941 5.71985L12.8607 14.7198C12.4734 15.0934 11.8598 15.0934 11.4725 14.7198L6.80586 10.2198C6.4083 9.83648 6.3968 9.20342 6.78016 8.80586C7.16352 8.4083 7.79658 8.3968 8.19414 8.78016L12.1666 12.6108L20.8059 4.28015C21.2034 3.8968 21.8365 3.90831 22.2198 4.30587Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0302 3.2C7.15678 3.2 3.20605 7.13989 3.20605 12C3.20605 16.8601 7.15678 20.8 12.0302 20.8C16.5716 20.8 20.3129 17.3779 20.8005 12.9791C20.8675 12.3753 21.4126 11.9399 22.0181 12.0067C22.6236 12.0734 23.0602 12.617 22.9932 13.2209C22.3834 18.722 17.7086 23 12.0302 23C5.93841 23 1 18.0751 1 12C1 5.92487 5.93841 1 12.0302 1C13.0916 1 14.1197 1.14981 15.0936 1.43007C15.6789 1.5985 16.0165 2.20822 15.8476 2.79192C15.6787 3.37562 15.0673 3.71225 14.482 3.54382C13.7049 3.32019 12.8826 3.2 12.0302 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
};
