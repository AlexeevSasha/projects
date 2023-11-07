import { forwardRef, InputHTMLAttributes } from "react";
import styled from "astroturf/react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  radio?: boolean;
  id: string;
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ id, label, radio, ...attr }, ref) => {
    return (
      <FlexCheckbox>
        <InputCheckboxStyle ref={ref} radio={radio} id={id} type="checkbox" {...attr} />
        {label && <LabelCheckbox htmlFor={id}>{label}</LabelCheckbox>}
      </FlexCheckbox>
    );
  }
);

const FlexCheckbox = styled.div`
  display: flex;
  align-items: center;
`;
const InputCheckboxStyle = styled.input<{ radio?: boolean }>`
  @import "variables";

  @include transition();

  appearance: none;
  height: 24px;
  min-width: 24px;
  border: 2px solid #e0e2e8;
  border-radius: 8px;
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    margin-left: 1px;
    display: none;
    content: " ";
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.7 0.3C7.3 -0.1 6.7 -0.1 6.3 0.3L3 3.6L1.7 2.3C1.3 1.9 0.7 1.9 0.3 2.3C-0.1 2.7 -0.1 3.3 0.3 3.7L2.3 5.7C2.5 5.9 2.7 6 3 6C3.3 6 3.5 5.9 3.7 5.7L7.7 1.7C8.1 1.3 8.1 0.7 7.7 0.3Z' fill='white'/%3E%3C/svg%3E%0A");
    background-size: 7px 6px;
    width: 7px;
    height: 6px;
  }
  &:hover {
    &:after {
      display: block;
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.7 0.3C7.3 -0.1 6.7 -0.1 6.3 0.3L3 3.6L1.7 2.3C1.3 1.9 0.7 1.9 0.3 2.3C-0.1 2.7 -0.1 3.3 0.3 3.7L2.3 5.7C2.5 5.9 2.7 6 3 6C3.3 6 3.5 5.9 3.7 5.7L7.7 1.7C8.1 1.3 8.1 0.7 7.7 0.3Z' fill='%23E0E2E8'/%3E%3C/svg%3E%0A");
    }
  }
  &:checked {
    border: 2px solid $blue1;
    background: $blue1;
    &:after {
      display: block;
    }

    &:hover {
      background: $blue2;
      border: 2px solid $blue2;

      &:after {
        background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.7 0.3C7.3 -0.1 6.7 -0.1 6.3 0.3L3 3.6L1.7 2.3C1.3 1.9 0.7 1.9 0.3 2.3C-0.1 2.7 -0.1 3.3 0.3 3.7L2.3 5.7C2.5 5.9 2.7 6 3 6C3.3 6 3.5 5.9 3.7 5.7L7.7 1.7C8.1 1.3 8.1 0.7 7.7 0.3Z' fill='white'/%3E%3C/svg%3E%0A");
      }
    }
  }
  &:disabled {
    background: rgba(224, 226, 232, 0.3);
    border: 2px solid #e0e2e8;
    cursor: default;
    &:after {
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.7 0.3C7.3 -0.1 6.7 -0.1 6.3 0.3L3 3.6L1.7 2.3C1.3 1.9 0.7 1.9 0.3 2.3C-0.1 2.7 -0.1 3.3 0.3 3.7L2.3 5.7C2.5 5.9 2.7 6 3 6C3.3 6 3.5 5.9 3.7 5.7L7.7 1.7C8.1 1.3 8.1 0.7 7.7 0.3Z' fill='%23E0E2E8'/%3E%3C/svg%3E%0A");
    }
    & + label {
      color: #e0e2e8;
    }
  }

  &.radio {
    border-radius: 50%;
    &:after {
      display: none;
      content: "";
      margin: 0;
      background: $white;
      border-radius: 50%;
      width: 6px;
      height: 6px;
    }

    &:hover {
      &:after {
        display: block;
        background: #e0e2e8;
      }
    }

    &:checked {
      border: 2px solid $blue1;
      background: $blue1;
      &:after {
        display: block;
      }

      &:hover {
        background: $blue2;
        border: 2px solid $blue2;
        &:after {
          background: $white;
        }
      }
    }
  }
`;
const LabelCheckbox = styled.label`
  @import "variables";

  color: $black;
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  margin-left: 16px;
  cursor: pointer;
`;
