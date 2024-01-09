import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { CustomButton } from "../../../components/buttons/customButton";
import { CMS } from "../../../modules/cms/components/cms";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { IHomeMatchList } from "../interfaces/IHomeMatchList";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  homeMatchList: IHomeMatchList;
  isShowButtonBuy?: boolean;
}

// Экспортировать вне модуля только через конструкцию Subscriptions.[Component]
export const ListOfHomeMatch = (props: IProps) => {
  const { locale = "ru", push } = useRouter();

  return (
    <CMS.Article>
      <TitleContainer>
        <CMS.TitleOfSection>{getLocalValue(props.homeMatchList.title, locale)}</CMS.TitleOfSection>
        {props.isShowButtonBuy ? (
          <CustomButton
            type={"red"}
            onClick={() => {
              push(getLocalValue(props.homeMatchList.buttonLink, locale));
            }}
          >
            <IconArrowRight />
            {getLocalValue(props.homeMatchList.buttonText, locale)}
          </CustomButton>
        ) : null}
      </TitleContainer>
      <LogoList>
        {props.homeMatchList.opponentsLogos?.map((elem, i) => (
          <ImgContainer key={elem}>
            <NextImage src={elem} alt={getLocalValue(props.homeMatchList.title, locale) + i} />
          </ImgContainer>
        ))}
      </LogoList>
    </CMS.Article>
  );
};

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.04vw;

  ${CustomButton} {
    margin-left: 1.25vw;
    svg {
      margin-right: 0.42vw;

      path {
        stroke: ${theme.colors.white};
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    align-items: start;
    margin-bottom: 3.13vw;

    ${CustomButton} {
      margin-left: 0;
      margin-top: 3.13vw;
      svg {
        margin-right: 1.04vw;
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;

    ${CustomButton} {
      margin-top: 6.4vw;
      svg {
        margin-right: 2.13vw;
      }
    }
  }
`;

const LogoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* display: grid;
  grid-template-columns: repeat(10, 1fr); */

  justify-content: center;
  width: 100%;
  /* grid-row-gap: 3.23vw; */
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    /* grid-template-columns: repeat(5, 1fr); */
    /* grid-row-gap: 3.13vw; */
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    /* grid-template-columns: repeat(3, 1fr); */
    /* grid-row-gap: 6.4vw; */
  }
`;

const ImgContainer = styled.div`
  width: 8.18vw;
  /* width: 100%; */
  height: 5.21vw;
  margin-bottom: 3.23vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 18.77vw;
    height: 13.04vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 30.4vw;
    height: 26.67vw;
    margin-bottom: 6.4vw;
  }
`;
