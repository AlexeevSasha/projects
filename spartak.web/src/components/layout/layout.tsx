import { FC, memo } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { BaseMeta, IMetaTags } from "../baseMeta/baseMeta";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { ToTopScrolls } from "../toTop";

interface IProps {
  metaTags?: IMetaTags | null;
}

export const Layout: FC<IProps> = memo(({ children, metaTags }) => {
  return (
    <>
      <BaseMeta metaTags={metaTags} />
      <Header />
      <MainContainer className="main">{children}</MainContainer>
      <ToTopScrolls />
      <Footer />
    </>
  );
});

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.black_white};
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
  min-height: calc(100vh - 8vw);
  padding-top: 5.52vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 0;
  }

  &.noOverflow {
    overflow: inherit;
  }
`;
