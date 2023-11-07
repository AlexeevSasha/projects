import React, { useRef, useState } from "react";
import styled from "astroturf/react";
import useOutsideClick from "../../hooks/useOutsideClose";
import { IconArraySmall } from "../icons/IconArraySmall";
import { IconCheck } from "../icons/IconCheck";

type Props = {
  options: { label: string; value: string }[];
  selectedOption: { label: string; value: string };
  setSelectedOption?: (v: { label: string; value: string }) => void;
};

export const Select = ({ options, selectedOption, setSelectedOption }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const [selected, setSelected] = useState(selectedOption);
  const onOptionClicked = (value: Props["selectedOption"]) => () => {
    setSelected(value);
    setSelectedOption && setSelectedOption(value);
    setIsOpen(false);
  };

  const ref = useRef(null);
  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <Container open={isOpen} ref={ref} onClick={toggling}>
      <div>{selected.value}</div>
      <IconArraySmall rotate={isOpen ? "180deg" : "0"} />
      {isOpen && (
        <OptionContainer open={isOpen}>
          {options.map((option) => (
            <Option
              active={selected.value === option.value}
              onClick={onOptionClicked(option)}
              key={selected.label}
            >
              {option.value}
              {option.label === selected.label ? <IconCheck /> : null}
            </Option>
          ))}
        </OptionContainer>
      )}
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  @import "variables";

  @include transition();

  position: relative;
  cursor: pointer;
  font-weight: 600;
  line-height: 137%;
  background: $white;
  color: $black;
  min-height: 56px;
  border: 2px solid $border;
  border-radius: 12px;
  padding: 15px 50px 15px 16px;

  svg {
    @include transition();

    position: absolute;
    right: 20px;
    top: 20px;
  }

  &:hover {
    border: 2px solid $blue1;
  }

  &.open {
    border: 2px solid $blue1;
  }
`;

const OptionContainer = styled.ul<{ open: boolean }>`
  @import "variables";

  @keyframes animate {
    0% {
      transform: translateY(-5%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  position: absolute;
  left: 0;
  z-index: 10;
  list-style-type: none;
  padding: 10px 20px 10px 10px;
  margin: 22px 0 0;
  background: $white;
  box-shadow: 0 0 10px 0 rgba($black, 0.1);
  border-radius: 12px;
  width: 100%;
  animation: animate 0.3s ease-in-out;
`;

const Option = styled.li<{ active: boolean }>`
  @import "variables";

  @include transition();

  position: relative;
  font-size: 14px;
  padding: 10px;
  color: $blue1;
  border-radius: 12px;

  &:hover {
    background: $blue-3;
  }

  svg {
    position: absolute;
    right: 0;
  }

  &.active {
    color: $black;
    pointer-events: none;
  }
`;
