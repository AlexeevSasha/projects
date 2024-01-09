import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React from "react";
import { WorkSection } from "common/components/Container/WorkSection";
import { IconLock } from "../common/components/Icon/IconLock";

export const PageAccessDenied: React.FC = () => {
  return (
    <WorkSection>
      <Container>
        Доступ закрыт
        <IconLock />
      </Container>
    </WorkSection>
  );
};

const Container = styled.div`
  background: ${theme.colors.lightBlue};
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  width: 100%;

  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: ${theme.colors.grayBlue};
  line-height: 200%;
`;
