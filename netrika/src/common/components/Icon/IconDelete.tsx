import React from "react";
import { css, styled } from "../../styles/styled";
import { theme } from "common/styles/theme";

interface IProps {
  color?: string;
  notHover?: boolean;
}

export const IconDelete: React.FC<IProps> = React.memo((props) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      notHover={props.notHover}
    >
      <path
        d="M19.3759 3.16612H14.6972V2.41982C14.6972 1.08553 13.5876 0 12.2238 0H7.77624C6.41239 0 5.30282 1.08553 5.30282 2.41982V3.16612H0.624133C0.277393 3.16612 0 3.4375 0 3.77673C0 4.11595 0.277393 4.38734 0.624133 4.38734H1.7522V18.7344C1.7522 20.5345 3.25012 22 5.09015 22H14.9098C16.7499 22 18.2478 20.5345 18.2478 18.7344V4.38734H19.3759C19.7226 4.38734 20 4.11595 20 3.77673C20 3.4375 19.7226 3.16612 19.3759 3.16612ZM6.55109 2.41982C6.55109 1.75946 7.10125 1.22122 7.77624 1.22122H12.2238C12.8988 1.22122 13.4489 1.75946 13.4489 2.41982V3.16612H6.55109V2.41982ZM16.9995 18.7344C16.9995 19.8606 16.061 20.7788 14.9098 20.7788H5.09015C3.93897 20.7788 3.00046 19.8606 3.00046 18.7344V4.38734H17.0042V18.7344H16.9995Z"
        fill={props.color ? props.color : theme.colors.hightBlue}
      />
      <path
        d="M10.0001 18.5893C10.3468 18.5893 10.6242 18.318 10.6242 17.9787V7.18678C10.6242 6.84755 10.3468 6.57617 10.0001 6.57617C9.65337 6.57617 9.37598 6.84755 9.37598 7.18678V17.9742C9.37598 18.3134 9.65337 18.5893 10.0001 18.5893Z"
        fill={props.color ? props.color : theme.colors.hightBlue}
      />
      <path
        d="M5.92687 17.9159C6.27361 17.9159 6.551 17.6445 6.551 17.3053V7.8567C6.551 7.51748 6.27361 7.24609 5.92687 7.24609C5.58013 7.24609 5.30273 7.51748 5.30273 7.8567V17.3053C5.30273 17.6445 5.58475 17.9159 5.92687 17.9159Z"
        fill={props.color ? props.color : theme.colors.hightBlue}
      />
      <path
        d="M14.0734 17.9159C14.4201 17.9159 14.6975 17.6445 14.6975 17.3053V7.8567C14.6975 7.51748 14.4201 7.24609 14.0734 7.24609C13.7266 7.24609 13.4492 7.51748 13.4492 7.8567V17.3053C13.4492 17.6445 13.7266 17.9159 14.0734 17.9159Z"
        fill={props.color ? props.color : theme.colors.hightBlue}
      />
    </Svg>
  );
});

const Svg = styled.svg<{ notHover?: boolean }>`
  cursor: pointer;
  ${(props) =>
    props.notHover
      ? ""
      : css`
          :hover {
            path {
              fill: ${theme.colors.green};
            }
          }
        `}
`;
