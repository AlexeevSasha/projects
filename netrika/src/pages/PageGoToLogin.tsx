import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { AuthService } from "module/authorization/AuthService";
import React, { useEffect } from "react";
import { IconLock } from "common/components/Icon/IconLock";
import { useLocation } from "react-router";
import { AuthServiceImk } from "../module/authorization/AuthServiceImk";

export const PageGoToLogin = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("?fromIemkPortal=true")) {
      const authService = new AuthServiceImk();
      authService.login();
    }
  }, [location.search]);

  const onClick = () => {
    const authService = new AuthService();
    authService.login();
  };

  return (
    <Container>
      Доступ закрыт
      <TestLine>
        Для просмотра страницы <Link onClick={onClick}>войдите</Link> под своей учетной записью
      </TestLine>
      <IconLock />
    </Container>
  );
};

const Container = styled.div`
  background: ${theme.colors.lightBlue};
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  width: 100%;
  height: 100vh;

  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: ${theme.colors.grayBlue};
`;

const Link = styled.span`
  color: ${theme.colors.blue};
  cursor: pointer;
`;
const TestLine = styled.h3`
  font-weight: normal;
  span {
    font-size: 16px;
  }
`;
