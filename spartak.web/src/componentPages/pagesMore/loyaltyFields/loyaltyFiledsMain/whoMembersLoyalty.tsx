import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import loyaltySignedUpUsers from "../../../../assets/images/loyalty/loyaltySignedUpUsers.png";
import Link from "next/link";
import loyaltyCardOwner from "../../../../assets/images/loyalty/loyaltyCardOwner.png";
import spartakKids from "../../../../assets/images/loyalty/spartakKids.png";
import { LoyaltyMainDataType } from "../../../../../pages/more/loyalty/main";
import Image from "next/image";

type IProps = LoyaltyMainDataType["whoMembersLoyalty"];

export const WhoMembersLoyalty = (props: IProps) => {
  return (
    <Container>
      <Title>{props.title}</Title>

      <TextContainer>
        <Text>{props.text1}</Text>
      </TextContainer>

      <DescriptionContainer>
        <DescItem>
          <ImgContainer>
            <Image src={loyaltySignedUpUsers.src} alt={"signed up users"} layout={"fill"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[0].title}</ItemName>

            <ItemText>
              <Link prefetch={false} href={"/auth/signup"} passHref>
                <CustomLink>{props.items[0].linkText}</CustomLink>
              </Link>
              &nbsp;{props.items[0].text}
            </ItemText>
          </div>
        </DescItem>

        <DescItem>
          <ImgContainer>
            <Image src={loyaltyCardOwner.src} alt={"loyalty card owner"} layout={"fill"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[1].title}</ItemName>

            <ItemText>
              {props.items[1].text}&nbsp;
              <Link prefetch={false} href={"/more/loyalty/card"} passHref>
                <CustomLink>{props.items[1].linkText}</CustomLink>
              </Link>
            </ItemText>
          </div>
        </DescItem>

        <DescItem>
          <ImgContainer>
            <Image src={spartakKids.src} alt={"spartak kids"} layout={"fill"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[2].title}</ItemName>

            <ItemText>
              {props.items[2].text}&nbsp;
              <Link prefetch={false} href={"/kids/spartakKids"} passHref>
                <CustomLink>{props.items[2].linkText}</CustomLink>
              </Link>
            </ItemText>
          </div>
        </DescItem>
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 2.08vw;
  margin-bottom: 6.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
    margin-bottom: 21.33vw;
  }
`;

const Title = styled.h6`
  margin: 0;
  font-weight: 700;
  font-size: 2.71vw;
  line-height: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
    line-height: 6.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    line-height: 11.2vw;
  }
`;

const DescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 6.4vw;
  }
`;

const DescItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.67vw;
  border: 1px solid ${theme.colors.grayDark};
  align-items: center;

  & > div:last-child {
    width: fit-content;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 4.17vw;
    flex-direction: row;
    grid-column-gap: 3.13vw;

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    flex-direction: column;
    grid-row-gap: 3.2vw;

    &:nth-child(2n) {
      flex-direction: column;
    }
  }
`;

const ImgContainer = styled.div`
  width: 12.86vw;
  height: 7.5vw;
  margin-bottom: 1.25vw;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    min-width: 32.16vw;
    height: 18.75vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-width: 42.67vw;
    min-height: 25.07vw;
  }
`;

const ItemName = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin-bottom: 0.42vw;
  align-self: flex-start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    line-height: 5.48vw;
    margin-bottom: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    line-height: 9.07vw;
    margin-bottom: 1.07vw;
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.red};
  cursor: pointer;
`;

const ItemText = styled.div`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.77vw;
  color: ${({ theme }) => theme.colors.gray_black};
  word-break: break-word;
  white-space: pre-line;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    line-height: 4.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    line-height: 7.47vw;
  }
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 6.4vw;
  }
`;

const Text = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.46vw;
  letter-spacing: 0.01vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    line-height: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
`;
