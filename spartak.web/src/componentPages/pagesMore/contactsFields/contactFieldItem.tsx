import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";

export const ContactFieldItem = () => {
  return (
    <Content>
      <div>
        <HeaderCell>Адрес</HeaderCell>
        <Cell>Москва, М. Олений пер., вл. 23</Cell>
      </div>
      <div>
        <HeaderCell>Телефон</HeaderCell>
        <Cell>
          <Text>+7 (499) 268-14-67</Text>
          <Text>+7 (499) 268-19-47</Text>
        </Cell>
      </div>
      <div>
        <HeaderCell>E-Mail</HeaderCell>
        <Cell>sokolniki@spartak.com</Cell>
      </div>
    </Content>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
  }
`;

const HeaderCell = styled.div`
  font-size: 0.83vw;
  color: ${theme.colors.gray};
  border-bottom: 1px solid ${theme.colors.red};
  text-transform: uppercase;
  padding-bottom: 0.83vw;
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.09vw;
    margin-bottom: 2.61vw;
    padding-bottom: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 4.27vw;
    margin-bottom: 5.33vw;
    padding-bottom: 4.27vw;
  }
`;

const Cell = styled.div`
  font-size: 2.08vw;
  padding: 1.25vw 0;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.17vw;
    flex-direction: row;
    column-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 8.53vw;
    column-gap: 5.03vw;
    flex-direction: column;
  }
`;

const Text = styled.div`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: flex;
  }
`;
