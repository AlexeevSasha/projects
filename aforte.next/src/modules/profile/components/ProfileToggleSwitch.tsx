import { InputHTMLAttributes } from "react";
import styled from "astroturf/react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
};

export const ProfileToggleSwitch = ({ id, ...attr }: Props) => {
  return (
    <ContainerSwitch>
      <InputCheckboxStyle
        id={id}
        type="checkbox"
        {...attr}
        data-on="Товары списком"
        data-off="Товары по заказам"
      />
      <Label htmlFor={id} data-on="Товары списком" data-off="Товары по заказам" />
    </ContainerSwitch>
  );
};

const ContainerSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 327px;
  height: 42px;
`;

const Label = styled.label`
  @import "variables";

  @include transition();

  position: absolute;
  white-space: nowrap;
  font-weight: 600;
  font-size: 13px;
  top: 2px;
  margin-left: 3px;
  cursor: pointer;
  border-radius: 15px;
  background: $blue1;
  width: 155px;
  height: 37px;
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
    width: 327px;
    height: 42px;
    border-radius: 50px;
    background: $blue-2;
  }
  &:hover {
    &:before {
      background: linear-gradient(0deg, rgba(85, 128, 197, 0.1), rgba(85, 128, 197, 0.1)), $blue-2;
    }
  }
  &:not(:checked) + ${Label} {
    &::before {
      color: $white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      content: attr(data-off);
    }
  }
  &:checked + ${Label} {
    margin-left: 170px;
    margin-right: 3px;
    &::before {
      color: $white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      content: attr(data-on);
    }
  }
  &:not(:checked) {
    &::after {
      font-weight: 600;
      font-size: 13px;
      white-space: nowrap;
      color: #5383c7;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translate(0, -50%);
      content: attr(data-on);
    }
  }
  &:checked {
    &::after {
      font-weight: 600;
      font-size: 13px;
      white-space: nowrap;
      color: #5383c7;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%);
      content: attr(data-off);
    }
    &:before {
      background: $blue-2;
    }
    &:hover {
      &:before {
        background: $blue-1;
      }
    }
  }
`;
