import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  value: number;
  handlerCount: (value: number) => void;
}

export const ItemCount = ({ value, handlerCount }: IProps) => {
  return (
    <Container>
      <Btn onClick={() => handlerCount(--value)}>-</Btn>
      <Value>{value}</Value>
      <Btn onClick={() => handlerCount(++value)}>+</Btn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-family: "FCSM Text", sans-serif;
  column-gap: 0.7vw;
  align-items: center;
`;

const Btn = styled.div`
  cursor: pointer;
  padding: 0 12px;
  font-size: 1.5vw;
  border: 1px solid ${theme.colors.white};
`;

const Value = styled.span`
  font-size: 24px;
  line-height: 34px;
  color: ${theme.colors.white};
`;
