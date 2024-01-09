import styled from "styled-components";
import { VotingSectionTitle } from "../common/votingSectionTitle";
import { theme } from "../../../../assets/theme/theme";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { langVoting } from "../lang/langVoting";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconLink } from "../../../../assets/icon/voting/iconLink";

interface IProps {
  isVote?: boolean;
}

export const MonthVotingConditions = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <Container id="condition">
      <VotingSectionTitle>{langVoting[locale].conditionsTitle}</VotingSectionTitle>
      <RulesContainer>
        <Rule isVote={props.isVote}>
          <Number>1</Number>
          <ImageContainer>
            <NextImage src={"/images/mvp/condition1_1.0.0.png"} alt="Первое условие голосования" quality={100} />
          </ImageContainer>
          <Text dangerouslySetInnerHTML={{ __html: langVoting[locale].month.conditions[0] }} />
        </Rule>
        <Rule>
          <Number>2</Number>
          <Link href={"https://winline.ru"} passHref>
            <CustomLink target="__blank" rel="nofollow">
              <NextImage src={"/images/mvp/condition2_1.0.0.png"} alt="Второе условие голосования" quality={100} />
              <IconLink />
            </CustomLink>
          </Link>
          <Text dangerouslySetInnerHTML={{ __html: langVoting[locale].month.conditions[1] }} />
        </Rule>
        <Rule>
          <Number>3</Number>
          <Link href={"https://winline.ru"} passHref>
            <CustomLink target="__blank" rel="nofollow">
              <NextImage src={"/images/mvp/condition3_1.0.0.png"} alt="Третье условие голосования" quality={100} />
              <IconLink />
            </CustomLink>
          </Link>
          <Text dangerouslySetInnerHTML={{ __html: langVoting[locale].month.conditions[2] }} />
        </Rule>
      </RulesContainer>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  margin-bottom: 4.17vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 8.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const RulesContainer = styled.div`
  margin-top: 2.08vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 7.03vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 5.22vw;
    grid-template-columns: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
    grid-row-gap: 6.4vw;
  }
`;

const Rule = styled.div<{ isVote?: boolean }>`
  display: grid;
  grid-template-columns: 3.33vw 1fr;
  grid-row-gap: 1.25vw;
  opacity: ${(props) => (props.isVote ? "0.4" : "1")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 8.34vw 1fr;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 14.93vw 1fr;
    grid-row-gap: 4.27vw;
  }
`;

const Number = styled.div`
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.red};
  font-size: 2.08vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
  }
`;

const ImageContainer = styled.div`
  width: 19.48vw;
  height: 10.42vw;
  background-color: ${theme.colors.black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 41.72vw;
    width: 82.92vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 40.53vw;
    width: 76.53vw;
  }
`;

const CustomLink = styled.a`
  position: relative;
  width: 19.48vw;
  height: 10.42vw;
  transition: all 0.1s;
  background-color: ${theme.colors.black};

  svg {
    position: absolute;
    width: 1.25vw;
    height: 1.25vw;
    top: 0.42vw;
    right: 0.42vw;
  }

  :hover {
    opacity: 0.8;
    svg {
      path {
        fill: ${theme.colors.red};
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 41.72vw;
    width: 82.92vw;
    svg {
      width: 3.13vw;
      height: 3.13vw;
      top: 1.04vw;
      right: 1.04vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 40.53vw;
    width: 76.53vw;
    svg {
      width: 6.4vw;
      height: 6.4vw;
      top: 2.13vw;
      right: 2.13vw;
    }
  }
`;

const Text = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;

  font-size: 0.83vw;
  font-weight: 700;
  text-transform: uppercase;

  a {
    color: ${theme.colors.red};
    text-decoration: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
