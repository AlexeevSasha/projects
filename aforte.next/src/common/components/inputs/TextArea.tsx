import styled from "astroturf/react";
import { forwardRef, InputHTMLAttributes } from "react";

type TextAreaType = InputHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaType>(({ error, ...attr }, ref) => {
  return <TextAreaStyle isError={error} {...attr} ref={ref} />;
});

const TextAreaStyle = styled.textarea<{ isError?: boolean }>`
  @import "variables";

  @include transition();

  width: 100%;
  overflow: hidden;
  padding: 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  border-radius: 16px;
  border: 2px solid $border;
  background: $white;
  color: $black;
  outline: none;
  font-family: inherit;
  resize: vertical;
  min-height: 60px;
  max-height: 200px;
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
`;
