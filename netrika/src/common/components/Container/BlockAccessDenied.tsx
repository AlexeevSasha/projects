import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React from "react";
import { IconLock } from "common/components/Icon/IconLock";

export const BlockAccessDenied = () => {
  return (
    <Container>
      Доступ закрыт
      <IconLock />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: ${theme.colors.grayBlue};
  line-height: 200%;
`;
