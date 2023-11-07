import { forwardRef, InputHTMLAttributes } from "react";
import styled from "astroturf/react";
import { myFont } from "pages/_app";
import { IconCheck } from "../icons/IconCheck";

export interface IPropsInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: boolean;
  errorText?: string;
}

export const Input = forwardRef<HTMLInputElement, IPropsInput>(
  ({ error, icon, errorText, ...attr }, ref) => {
    return (
      <Container>
        <InputStyle
          {...attr}
          className={`${myFont.className} ${attr.className}`}
          isError={error}
          ref={ref}
        />
        {icon && (
          <IconBlock>
            <IconCheck />
          </IconBlock>
        )}
        {error && <Error>{errorText ? errorText : "Ошибка"}</Error>}
      </Container>
    );
  }
);

const Container = styled.div`
  @import "variables";
  position: relative;
  width: 100%;
`;

export const InputStyle = styled.input<{ isError?: boolean }>`
  @import "variables";

  @include transition();

  width: 100%;
  padding: 15px 16px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 16px;
  border: 2px solid $border;
  background: $white;
  color: $black;
  outline: none;
  &:hover,
  &:focus {
    border-color: $blue1;
    caret-color: $blue1;
  }
  &::placeholder {
    color: rgb($black, 0.4);
  }
  &:disabled {
    background: #fbfbfc;
    &:hover,
    &:focus {
      border-color: $border;
    }
  }
  &.isError {
    border-color: $orange3;
  }

  &::-webkit-input-placeholder {
    font-weight: 500; // 'myFont', Arial, Helvetica, sans-serif;
  }

  &::-ms-input-placeholder {
    font-weight: 500; //"myFont", Arial, Helvetica, sans-serif;
  }

  &::-moz-placeholder {
    font-weight: 500; //"myFont", Arial, Helvetica, sans-serif;
  }

  &::-moz-placeholder {
    font-weight: 500; //"myFont", Arial, Helvetica, sans-serif;
  }
`;

const Error = styled.p`
  @import "variables";

  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  color: $orange3;
  margin: 4px 0 0;
  text-align: right;
`;
const IconBlock = styled.div`
  @import "variables";
  position: absolute;
  top: 36%;
  right: 5%;
  svg {
    width: 16px;
    height: 16px;
    path {
      fill: none !important;
      opacity: 1 !important;
      stroke: $greenMain;
    }
  }
`;
