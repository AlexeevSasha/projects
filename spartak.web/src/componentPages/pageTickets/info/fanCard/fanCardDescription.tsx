import React from "react";
import { IFanCard } from "../../../../api/dto/IFanCard";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { ContainerContent } from "../../../../components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { IconRedPoint } from "../../../../assets/icon/iconRedPoint";

interface IProps {
  data: IFanCard;
}

export const FanCardDescription = ({ data }: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <StyledContainer>
      <span dangerouslySetInnerHTML={{ __html: getLocalValue(data.text, locale) }} />
      <div>
        <Title>{getLocalValue(data.subTitle1, locale)}</Title>
        <TextDescription dangerouslySetInnerHTML={{ __html: getLocalValue(data.text1, locale) }} />
      </div>
      <ListBlock>
        <Title>{getLocalValue(data.subTitle2, locale)}</Title>
        <TextDescription dangerouslySetInnerHTML={{ __html: getLocalValue(data.text2, locale) }} />
        <ul>
          {data.list.map((item, index) => (
            <RedPoint key={index}>
              <IconRedPoint />
              <span dangerouslySetInnerHTML={{ __html: getLocalValue(item, locale) }} />
            </RedPoint>
          ))}
        </ul>
        <Description dangerouslySetInnerHTML={{ __html: getLocalValue(data.text2_1, locale) }} />
      </ListBlock>
      <div>
        <Title>{getLocalValue(data.subTitle3, locale)}</Title>
        <TextDescription>{getLocalValue(data.text3, locale)}</TextDescription>
        <Description
          dangerouslySetInnerHTML={{
            __html: getLocalValue(data.text4, locale),
          }}
        />
      </div>
    </StyledContainer>
  );
};
const StyledContainer = styled(ContainerContent)`
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white_black};
  padding: 2.08vw 0 5.21vw;

  span {
    width: 100%;
    font-size: 0.94vw;
    font-weight: 500;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
    }
  }
  ul {
    padding: 0;
    li {
    }
  }
  a {
    text-decoration: none;
    color: ${theme.colors.fireEngineRed};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0;
  }
`;

const Title = styled.h2`
  font-size: 2.08vw;
  font-weight: 700;
  margin: 0;
  padding: 2.08vw 0 0.83vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 2.09vw;
    font-size: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 0;
    font-size: 8.53vw;
  }
`;
const RedPoint = styled.li`
  list-style: none;
  align-items: center;
  display: flex;
  padding-bottom: 0.83vw;
  :last-of-type {
    padding-bottom: 0;
  }
  svg {
    height: 2.08vw;
    width: 2.08vw;
    padding-right: 0.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 2.09vw;

    svg {
      height: 5.22vw;
      width: 5.22vw;
      padding-right: 2.09vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 2.13vw;
    svg {
      height: 6.4vw;
      width: 6.4vw;
      padding-right: 2.13vw;
    }
  }

  span {
    line-height: 1.77vw;
    font-size: 1.25vw;
    font-weight: 500;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      line-height: 4.43vw;
      font-size: 3.13vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      line-height: 6.4vw;
      font-size: 4.8vw;
    }
  }
`;
const ListBlock = styled.div`
  width: 100%;
`;
const Description = styled.div`
  width: 74%;
  padding-top: 0.83vw;
  font-size: 0.94vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    font-size: 2.35vw;
    padding-top: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-top: 2.13vw;
  }
`;
const TextDescription = styled.div`
  display: flex;
  width: 74%;
  font-size: 0.94vw;
  font-weight: 500;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
