import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IconImage } from "../../../components/IconImage";

type Props = {
  count: number;
};

export const Count = ({ count }: Props) => {
  const [value, setVaue] = useState(count);

  return (
    <Container>
      <IconWrapper onClick={() => value && typeof value === "number" && setVaue(value - 1)}>
        <Icon url="/images/cart/Minus.svg" />
      </IconWrapper>

      <Value>{value}</Value>

      <IconWrapper onClick={() => typeof value === "number" && setVaue(value + 1)}>
        <Icon url="/images/cart/Plus.svg" />
      </IconWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-area: d;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: f;
  }
`;

const Value = styled.div`
  font-size: 1.25vw;
  text-align: center;
  color: ${theme.colors.white};
  margin: 0 0.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    margin: 0 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    margin: 0 1.56vw;
  }
`;

const Icon = styled(IconImage)`
  width: 1vw;
  height: 1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 4.7vw;
    height: 4.7vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 7.46vw;
    height: 7.46vw;
  }
`;

const IconWrapper = styled.div`
  border: 1px solid ${theme.colors.grayDark};
  box-sizing: border-box;
  padding: 0.57vw;
  cursor: pointer;
`;
