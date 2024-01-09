import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IconArrowRight } from "../assets/icon/iconArrowRight";
import { theme } from "../assets/theme/theme";
import { ThemeContext } from "../core/themeProvider";
import { CustomButton } from "./buttons/customButton";

export const ToTopScrolls = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [scrollPosition, setSrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    const scrollStart = window.innerHeight / 2;
    setSrollPosition(position);

    if (scrollPosition > scrollStart) {
      setIsVisible(true);
    } else if (scrollPosition < scrollStart) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    //При инициализации компонента проверять позицию страницы
    const position = window.pageYOffset;
    const scrollStart = window.innerHeight / 2;
    setSrollPosition(position);

    if (scrollPosition > scrollStart) {
      setIsVisible(true);
    } else if (scrollPosition < scrollStart) {
      setIsVisible(false);
    }
    /******************************************************** */

    window.addEventListener("scroll", handleVisibleButton);
    // document.getElementsByTagName("main")[0].classList.add("noOverflow");

    return () => {
      window.removeEventListener("scroll", handleVisibleButton);
      // document.getElementsByTagName("main")[0].classList.remove("noOverflow");
    };
  }, [handleVisibleButton, isDarkTheme]);

  const scrollUp = () => {
    window.scroll({ top: 0 });
    handleVisibleButton();
  };

  return (
    <TopContainer id="toTop" className={isVisible ? "" : "isHidden"} onClick={scrollUp}>
      <InnedDiv type={"opacity"}>
        <IconArrowRight rotate="-90deg" />
      </InnedDiv>
    </TopContainer>
  );
};

const TopContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  z-index: 10;

  display: flex;
  justify-content: flex-end;
  height: 0;
  /* pointer-events: none; */
  padding-right: 1.67vw;
  bottom: 3.3vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 3.13vw;
    bottom: 7.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-right: 4.27vw;
    bottom: 12.14vw;
  }

  &.isHidden {
    /* visibility: hidden; */
    z-index: -2;
  }
`;

const InnedDiv = styled(CustomButton)`
  padding: 0.83vw;
  bottom: 0;
  position: absolute;
  border-color: ${({ theme }) => theme.colors.grayLight_red};
  background-color: ${({ theme }) => theme.colors.blackLight_redOpacity};
  cursor: pointer;

  svg {
    path {
      stroke: ${({ theme }) => theme.colors.grayLight_red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
  }
`;
