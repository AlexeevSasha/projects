import { useRouter } from "next/router";
import { CMS } from "../../../modules/cms/components/cms";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IBlockInfo } from "../interfaces/IBlockInfo";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  blockInfo: IBlockInfo;
}

// Экспортировать вне модуля только через конструкцию Subscriptions.[Component]
export const BlockInfo = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <CMS.Article>
      <Container>
        <Content>
          <CMS.TitleOfSection>{getLocalValue(props.blockInfo.title, locale)}</CMS.TitleOfSection>
          <Description dangerouslySetInnerHTML={{ __html: getLocalValue(props.blockInfo.description, locale) }} />
        </Content>
        <ImgContainer>
          <NextImage src={getLocalValue(props.blockInfo.img, locale)} />
        </ImgContainer>
      </Container>
    </CMS.Article>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: 8fr 7fr;
  grid-column-gap: 6.98vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
  }
`;

const Content = styled.p`
  margin: 0;
`;

const Description = styled.span`
  display: block;
  color: ${(props) => props.theme.colors.grayLight_grayDark};
  font-size: 0.94vw;
  margin-top: 1.25vw;
  line-height: 1.4;

  a {
    color: ${theme.colors.red};
  }
  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-top: 6.4vw;
  }
`;

const ImgContainer = styled.div`
  height: 23.44vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 63.49vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 61.33vw;
  }
`;
