import React, { useState } from "react";
import Switch from "react-switch";
import styled from "styled-components";
import { theme } from "../../../common/styles/theme";

interface IProps {
  leftText: string;
  rightText: string;
  onChange: (value: boolean) => void;
  defaultValue?: boolean;
  maxWidth?: string;
  rightTextWidth?: string;
  leftTextWidth?: string;
}
export const RangeSwitch = ({
  leftText,
  rightText,
  defaultValue = false,
  onChange,
  maxWidth = "400px",
  rightTextWidth = "45%",
  leftTextWidth = "45%",
}: IProps) => {
  const [checked, setChecked] = useState<boolean>(defaultValue);

  const handleClick = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <Container maxWidth={maxWidth} rightTextWidth={rightTextWidth} leftTextWidth={leftTextWidth}>
      <Text className={"LeftText"} active={!checked} onClick={handleClick}>
        {leftText}
      </Text>
      <Switch
        uncheckedIcon={false}
        checkedIcon={false}
        onHandleColor={theme.colors.lightGreen}
        offHandleColor={theme.colors.lightGreen}
        offColor={theme.colors.green}
        onColor={theme.colors.green}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        width={50}
        onChange={handleClick}
        checked={checked}
        className={"switch"}
      />
      <Text className={"RightText"} active={checked} onClick={handleClick}>
        {rightText}
      </Text>
    </Container>
  );
};

const Container = styled.div<{ maxWidth: string; rightTextWidth: string; leftTextWidth: string }>`
  margin: 10px 0;
  max-width: ${(props) => props.maxWidth};
  width: 100%;
  cursor: pointer;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  .switch {
    width: 50px;
    position: absolute;
  }
  .LeftText {
    width: ${(props) => props.leftTextWidth};
    padding: 0 10px 0 0;
  }
  .RightText {
    width: ${(props) => props.rightTextWidth};
    padding: 0 0 0 10px;
  }
`;
const Text = styled.div<{ active: boolean }>`
  width: fit-content;
  text-align: center;
  color: ${(props) => (props.active ? theme.colors.green : theme.colors.black)};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  font-size: ${(props) => (props.active ? "15px" : "inherit")};
  transition: background-color 0.25s ease 0s, transform 0.25s ease 0s, box-shadow 0.15s ease 0s;
`;
