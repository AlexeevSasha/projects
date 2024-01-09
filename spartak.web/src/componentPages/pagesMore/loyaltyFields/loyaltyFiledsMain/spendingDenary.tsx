import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LoyaltyMainDataType } from "../../../../../pages/more/loyalty/main";
import impression from "../../../../assets/images/loyalty/ball 2.png";
import tickets from "../../../../assets/images/loyalty/tickets.png";
import attributes from "../../../../assets/images/loyalty/ticketsAndAttributes.png";
import { theme } from "../../../../assets/theme/theme";
import { Spacer } from "../../../../components/spacer";

type IProps = LoyaltyMainDataType["spendingDenary"];

export const SpendingDenary = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <Container>
      <Title>{props.title}</Title>

      <DescriptionContainer>
        <DescItem>
          <ImgContainer>
            <Image layout={"fill"} src={attributes.src} alt={"attributes"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[0].title}</ItemName>

            <ItemText>
              {props.items[0].text}
              <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}`} passHref>
                <CustomLink>&nbsp;{props.items[0].linkText}</CustomLink>
              </Link>
            </ItemText>
          </div>
        </DescItem>

        <DescItem>
          <ImgContainer>
            <Image layout={"fill"} src={tickets.src} alt={"tickets"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[1].title}</ItemName>

            <ItemText>
              {props.items[1].text}
              <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches`} passHref>
                <CustomLink>&nbsp;{props.items[1].linkText}</CustomLink>
              </Link>
            </ItemText>
          </div>
        </DescItem>

        <DescItem>
          <ImgContainer>
            <Image layout={"fill"} src={impression.src} alt={"impression"} />
          </ImgContainer>

          <div>
            <ItemName>{props.items[2].title}</ItemName>

            <ItemText>
              {props.items[2].text}
              <Link
                prefetch={false}
                href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}/catalog/katalog-vpechatleniy/`}
                passHref
              >
                <CustomLink>&nbsp;{props.items[0].linkText}</CustomLink>
              </Link>
            </ItemText>
          </div>
        </DescItem>
      </DescriptionContainer>
      <Spacer height={["80px", "40px", "24px"]} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h6`
  margin: 0 0 1.25vw;
  font-weight: 700;
  font-size: 2.71vw;
  line-height: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
    line-height: 6.52vw;
    margin: 0 0 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 6.4vw;
    font-size: 8.53vw;
    line-height: 11.2vw;
  }
`;

const DescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.25vw;

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
  border: 1px solid ${({ theme }) => theme.colors.grayDark_gray1};
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 4.17vw;
    flex-direction: row;
    grid-column-gap: 3.13vw;

    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    & > :nth-child(2) {
      margin-bottom: auto;
      height: 100%;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    flex-direction: column;
    grid-row-gap: 3.2vw;

    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const ImgContainer = styled.div`
  width: 12.86vw;
  position: relative;
  height: 7.5vw;
  margin-bottom: 1.25vw;

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
  margin-top: 0;
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
