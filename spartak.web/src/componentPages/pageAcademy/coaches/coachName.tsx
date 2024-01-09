import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { LocaleType } from "../../../api/dto/LocaleType";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";

type Props = {
  name: LocaleType;
};

export const CoachName = (props: Props) => {
  const { locale = "ru" } = useRouter();
  const name = getLocalValue(props.name, locale).split(" ");

  return (
    <NameWrapper>
      {name.length === 1 && <SurName>{name[0]}</SurName>}

      {name.length === 2 && (
        <FullNameBlock>
          <Name>{name[0]}</Name>
          <SurName>{name[1]}</SurName>
        </FullNameBlock>
      )}

      {name.length === 3 && (
        <FullNameBlock>
          <Name>
            {name[0]} {name[1]}
          </Name>
          <SurName>{name[2]}</SurName>
        </FullNameBlock>
      )}
    </NameWrapper>
  );
};

const NameWrapper = styled.div`
  margin-top: 9.8vw;
`;

const FullNameBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const SurName = styled.h1`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 3.75vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-family: "FCSM Text", sans-serif;
    font-weight: 500;
    font-size: 8.53vw;
  }
`;
