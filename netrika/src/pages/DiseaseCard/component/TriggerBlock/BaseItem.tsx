import { theme } from "common/styles/theme";
import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  value: string;
}

export const BaseItem: FC<IProps> = ({ name, value }) => {
  return (
    <BlockLine>
      <Name>{name}:</Name>
      <ValueParam>{value}</ValueParam>
    </BlockLine>
  );
};

const BlockLine = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: 12px;
`;

const Name = styled.span`
  color: ${theme.colors.black};
`;

const ValueParam = styled.span`
  justify-self: flex-end;
`;
