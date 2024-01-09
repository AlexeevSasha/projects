import React, { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface IProps extends InputHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title = ({ children, level = 1, ...attr }: IProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <TitleStyle as={Tag} {...attr}>
      {children}
    </TitleStyle>
  );
};

const TitleStyle = styled.h1`
  font-weight: 600;
  color: ${theme.colors.black};
  margin: 0;
`;
