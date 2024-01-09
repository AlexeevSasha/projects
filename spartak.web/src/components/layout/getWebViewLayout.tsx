import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const GetWebViewLayout = (page: JSX.Element) => {
  return <MainContainer>{page}</MainContainer>;
};

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.black};
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
  min-height: calc(100vh - 8vw);
  padding-top: 5.52vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 0;
  }
`;
