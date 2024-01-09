import React, { FC, Fragment, useContext } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { HoverButton } from "../../components/personButton";
import { PersonDataType } from "../../components/personCard";
import { ThemeContext } from "../../core/themeProvider";

type Props = {
  person: PersonDataType & { Id: string; Section?: "Site" | "Academy"; isCoach?: boolean };
  isPlayer?: boolean;
};

const Plug: FC<{ url: string }> = ({ children }) => <Fragment>{children}</Fragment>;

export const PersonWrapper: FC<Props> = ({ children, person, isPlayer }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const url =
    (person.Section === "Site" && isPlayer && `/player/${person.Id}`) ||
    (person.Section === "Site" && person.isCoach && `/coaches/${person.Id}`) ||
    (person.Section === "Academy" && person.isCoach && `/academy/employees/${person.Id}`) ||
    "";

  const Hover = url ? HoverButton : Plug;

  return (
    <CardWrapper isDarkTheme={isDarkTheme}>
      <Hover url={url}>{children}</Hover>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ isDarkTheme?: boolean }>`
  padding: 2.08vw;

  @media (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
  }

  @media (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.26vw;

    & .image-wrapper {
      width: 61vw;
      height: 70.66vw;
      margin-bottom: 4.26vw;
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        width: inherit;
        height: inherit;
      }
    }
  }
`;
