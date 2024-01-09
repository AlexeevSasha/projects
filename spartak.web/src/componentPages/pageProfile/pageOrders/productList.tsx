import React, { FC } from "react";
import styled from "styled-components";

export const ProductList: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  flex-grow: 1;
`;
