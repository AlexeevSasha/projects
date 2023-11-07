import styled from "astroturf/react";

export type ButtonType = "blue" | "lightBlue" | "green" | "blueWhite" | "orange";
export type SizeType = "sm" | "md" | "xmd" | "lg";

export const Button = styled.button<{ typeBtn?: ButtonType; size?: "sm" | "md" | "lg" }>`
  @import "variables";

  @include transition();

  border-radius: 16px;
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
  border: none;
  font-family: inherit;

  font-weight: 600; // Под вопросом, так как не все кнопки могут иметь такой шрифт

  &.typeBtn-blue {
    background: $blue1;
    color: $white;

    &:hover {
      background: $blue2;
    }
  }

  &.typeBtn-orange {
    background: $orange3;
    color: $white;

    &:hover {
      background: #f9603f;
    }
  }

  &.typeBtn-lightBlue {
    background: $blue-3;
    color: $blue1;

    &:hover {
      background: $blue-2;
    }
  }

  &.typeBtn-blueWhite {
    background: $white;
    color: $blue1;

    &:hover {
      background: $blue-2;
    }
  }

  &.typeBtn-green {
    background: $greenMain;
    color: $white;

    &:hover {
      background: #5bb169;
    }
  }

  &.size-sm {
    font-size: 13px;
  }

  &.size-md {
    font-size: 16px;
  }
  @include respond-to(small) {
    &.size-md {
      font-size: 14px;
    }
  }

  &.size-lg {
  }
`;
