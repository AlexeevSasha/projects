import React, { FC /*, useContext*/ } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
// import { ThemeContext } from "../../core/themeProvider";
import { BannerBackground, StyledBannerArticleBase } from "../containers/containerBanner";

interface IProps {
  hideMargin?: boolean;
}

export const RedInfoBanner: FC<IProps> = ({ children, hideMargin }) => {
  // const { isDarkTheme } = useContext(ThemeContext);

  return (
    <StyledBannerArticle hideMargin={hideMargin}>
      <BannerBackground
        srcL={"/images/banners/bgRedL_v1.0.0.png"}
        srcM={"/images/banners/bgRedM_v1.0.0.png"}
        srcS={"/images/banners/bgRedS_v1.0.0.png"}
      />
      <RedBanner> {children}</RedBanner>
    </StyledBannerArticle>
  );
};

const StyledBannerArticle = styled(StyledBannerArticleBase)<{ hideMargin?: boolean }>`
  // TODO: сделано на глаз (на разных страницах у этого поля разный отступ)
  margin-bottom: ${({ hideMargin }) => (hideMargin ? "" : "4.17vw")};
  background-color: ${({ theme }) => theme.colors.blackLight_red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: ${({ hideMargin }) => (hideMargin ? "" : "7.82vw")};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: ${({ hideMargin }) => (hideMargin ? "" : "10.67vw")};
  }
`;

export const RedBanner = styled.section`
  display: flex;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  color: ${theme.colors.white};
  font-size: 1.25vw;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
