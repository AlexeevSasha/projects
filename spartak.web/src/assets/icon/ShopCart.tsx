import React from "react";
import { theme } from "../theme/theme";
import styled from "styled-components";

interface IProps {
  onClick?: () => void;
  color?: string;
  itemsCount?: number;
}

export const ShopCard = ({ onClick, color, itemsCount = 0 }: IProps) => {
  return (
    <Basket>
      {itemsCount > 0 && <ItemsCount>{itemsCount}</ItemsCount>}

      <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
        <path
          d="M20.25 6.75H3.75C3.33579 6.75 3 7.08579 3 7.5V19.5C3 19.9142 3.33579 20.25 3.75 20.25H20.25C20.6642 20.25 21 19.9142 21 19.5V7.5C21 7.08579 20.6642 6.75 20.25 6.75Z"
          stroke={color ?? `${theme.colors.white}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.25 9.75V6.75C8.25 5.75544 8.64509 4.80161 9.34835 4.09835C10.0516 3.39509 11.0054 3 12 3C12.9946 3 13.9484 3.39509 14.6517 4.09835C15.3549 4.80161 15.75 5.75544 15.75 6.75V9.75"
          stroke={color ?? `${theme.colors.white}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Basket>
  );
};

const Basket = styled.div`
  position: relative;
`;

const ItemsCount = styled.div`
  position: absolute;
  font-family: "FCSM Text", sans-serif;
  background: ${({ theme }) => theme.colors.red_white};
  color: ${({ theme }) => theme.colors.white_red};
  padding: 0.1vw 0.3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -0.5vw;
  top: -0.3vw;
  border-radius: 20px;
  font-size: 0.63vw;
  text-align: center;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0.2vw 0.8vw;
    font-size: 1.56vw;
    right: -0.8vw;
    top: -0.8vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0.3vw 1.5vw;
    font-size: 3.2vw;
    right: -1.9vw;
    top: -1.2vw;
  }
`;

const Svg = styled.svg`
  &:hover {
    path {
      stroke: ${({ theme }) => theme.colors.red_carnationPink};
    }
  }
`;
