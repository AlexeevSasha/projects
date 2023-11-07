import { forwardRef, InputHTMLAttributes } from "react";
import styled from "astroturf/react";

export interface IPropsSwitch extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const Switch = forwardRef<HTMLInputElement, IPropsSwitch>(({ id, ...attr }, ref) => {
  return (
    <ContainerSwitch>
      <InputCheckboxStyle id={id} type="checkbox" {...attr} ref={ref} />
      <Label htmlFor={id} />
    </ContainerSwitch>
  );
});

const ContainerSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 25px;
`;

const Label = styled.label`
  @import "variables";

  @include transition();

  position: absolute;
  top: 2px;
  margin-left: 3px;
  cursor: pointer;
  border-radius: 15px;
  background: $white;
  width: 20px;
  height: 20px;
`;
const InputCheckboxStyle = styled.input`
  @import "variables";

  @include transition();

  cursor: pointer;
  margin: 0;
  width: 0;
  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 40px;
    height: 25px;
    border-radius: 50px;
    background: $blue-2;
  }
  &:hover {
    &:before {
      background: linear-gradient(0deg, rgba(85, 128, 197, 0.1), rgba(85, 128, 197, 0.1)), $blue-2;
    }
  }
  &:checked + ${Label} {
    margin-left: 17px;
    margin-right: 3px;
  }
  &:checked {
    &:before {
      background: $greenMain;
    }
    &:hover {
      &:before {
        background: $greenHover;
      }
    }
  }
`;
