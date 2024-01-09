import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { CMS } from "../../../modules/cms/components/cms";
import { IDescriptionBlock } from "../interfaces/IDescriptionBlock";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  descriptionBlock: IDescriptionBlock;
}

// Экспортировать вне модуля только через конструкцию Subscriptions.[Component]
export const BlockDescription = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <CMS.Article>
      <CMS.TitleOfSection>{getLocalValue(props.descriptionBlock.title, locale)}</CMS.TitleOfSection>
      <Container>
        <Content dangerouslySetInnerHTML={{ __html: getLocalValue(props.descriptionBlock.text1, locale) || "" }} />
        <Content dangerouslySetInnerHTML={{ __html: getLocalValue(props.descriptionBlock.text2, locale) || "" }} />
      </Container>
    </CMS.Article>
  );
};

const Container = styled.section`
  color: ${(props) => props.theme.colors.grayLight_grayDark};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  margin-top: 1.25vw;
  font-size: 0.94vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    margin-top: 3.13vw;
    grid-row-gap: 2.09vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
    grid-row-gap: 4.27vw;
    font-size: 4.27vw;
  }
`;

const Content = styled.div`
  margin: 0;
  line-height: 1.4;

  a {
    color: ${theme.colors.red};
  }

  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 400;
  }
`;
