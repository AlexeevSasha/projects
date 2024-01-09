import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { CMS } from "../../../modules/cms/components/cms";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { ISubscriptionBanner } from "../interfaces/ISubscriptionBanner";
import { BannerBackground } from "../../../components/containers/containerBanner";
import { CustomButton } from "../../../components/buttons/customButton";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";

interface IProps {
  banner: ISubscriptionBanner;
}

// Экспортировать вне модуля только через конструкцию Subscriptions.[Component]
export const SubscriptionBanner = (props: IProps) => {
  const { locale = "ru", push } = useRouter();

  return (
    <CMS.Article>
      <BannerBackground
        srcL={props.banner.backgroundImgL}
        srcM={props.banner.backgroundImgM}
        srcS={props.banner.backgroundImgS}
      />
      <Container>
        <Content>
          <CustomTitle>{getLocalValue(props.banner.title, locale)}</CustomTitle>
          <Description dangerouslySetInnerHTML={{ __html: getLocalValue(props.banner.description, locale) }} />
          <ButtonArrow type={"opacity"} withGap onClick={() => push(getLocalValue(props.banner.buttonLink, locale))}>
            <IconArrowRight />

            <span>{getLocalValue(props.banner.buttonText, locale)}</span>
          </ButtonArrow>
        </Content>
        <ImgContainer>
          <NextImage src={props.banner.rightImg} />
        </ImgContainer>
      </Container>
    </CMS.Article>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 32.81vw;
  grid-column-gap: 2.4vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 83.44vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 78.67vw;
  }
`;

const Content = styled.p`
  margin: 0;
  z-index: 1;
  padding: 2.04vw 0 2.04vw 2.04vw;
  display: grid;
  flex-direction: column;

  grid-row-gap: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 2.09vw;
    padding: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
    padding: 6.4vw;
  }
`;

const CustomTitle = styled(CMS.TitleOfSection)`
  color: ${theme.colors.white};
`;

const Description = styled.span`
  display: block;
  color: ${theme.colors.grayLight};
  font-weight: 500;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const ImgContainer = styled.div`
  height: 15.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const ButtonArrow = styled(CustomButton)`
  box-sizing: border-box;
  width: fit-content;
  margin-top: 1.25vw;
  border-color: ${theme.colors.white};
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 0;
    width: 100%;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;
