import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import { theme } from "../assets/theme/theme";
import { ThemeContext } from "../core/themeProvider";
import { CustomButton } from "./buttons/customButton";

type Props = {
  url: string;
};

export const HoverButton: FC<Props> = ({ children, url }) => {
  const { locale = "ru", push } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <HoverBlock onClick={() => push(url)}>
      {children}

      <HiddenButtons>
        <ButtonContainer>
          <StyledButton isDarkTheme={isDarkTheme} type={"red"}>
            {lang[locale].pageTeams.seeProfile}
          </StyledButton>
        </ButtonContainer>
      </HiddenButtons>
    </HoverBlock>
  );
};

const HiddenButtons = styled.div`
  position: absolute;
  text-transform: uppercase;
  height: 100%;
  width: 100%;
  display: none;

  align-items: center;
  justify-content: center;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.83vw;
  z-index: 10;
  top: 20.83vw;
  position: absolute;
`;

const StyledButton = styled(CustomButton)<{ isDarkTheme?: boolean }>`
  padding: 0.68vw 1.13vw;
  color: ${(props) => !props.isDarkTheme && props.theme.colors.white};
  background: ${(props) => !props.isDarkTheme && theme.colors.white};
  color: ${(props) => !props.isDarkTheme && theme.colors.red};
  border: ${(props) => !props.isDarkTheme && `1px solid ${theme.colors.white}`};
`;

const HoverBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;

  :hover {
    ${HiddenButtons} {
      display: flex;
    }
    #photoBlock,
    #infoBlock {
      background: ${({ theme }) => theme.colors.none_red};
    }

    #playerName,
    #playerFamily,
    #playerFamily {
      color: ${theme.colors.white};
      z-index: 14;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    :hover ${HiddenButtons} {
      display: none;
    }
  }
`;
