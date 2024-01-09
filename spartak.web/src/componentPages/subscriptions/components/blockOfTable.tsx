import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { CMS } from "../../../modules/cms/components/cms";
import { IBlockOfTable } from "../interfaces/IBlockOfTable";

interface IProps {
  blockOfTable: IBlockOfTable;
}

// Экспортировать вне модуля только через конструкцию Subscriptions.[Component]
export const BlockOfTable = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <CMS.Article>
      <CMS.TitleOfSection>{getLocalValue(props.blockOfTable.title, locale)}</CMS.TitleOfSection>
      <ScrollContainer>
        <Container>
          {props.blockOfTable.sections.map((section, is) => (
            <Content key={"h" + is}>
              <HeadContainer>
                <span>{getLocalValue(section.headCol1, locale)}</span>
                <span>{getLocalValue(section.headCol2, locale)}</span>
                <span>{getLocalValue(section.headCol3, locale)}</span>
              </HeadContainer>
              {section.row.map((row, ir) => (
                <RowContainer key={"r" + ir}>
                  <RowContent justify="left" dangerouslySetInnerHTML={{ __html: getLocalValue(row.col1, locale) }} />
                  <RowContent
                    justify="right"
                    style={{ whiteSpace: "nowrap" }}
                    dangerouslySetInnerHTML={{ __html: getLocalValue(row.col2, locale) }}
                  />
                  <RowContent
                    justify="right"
                    style={{ whiteSpace: "nowrap" }}
                    dangerouslySetInnerHTML={{ __html: getLocalValue(row.col3, locale) }}
                  />
                </RowContainer>
              ))}
            </Content>
          ))}
        </Container>
      </ScrollContainer>
    </CMS.Article>
  );
};

const ScrollContainer = styled.div`
  max-width: 100%;
  overflow: auto;
`;

const Container = styled.section`
  display: block;
  column-count: 2;
  background-color: ${theme.colors.red}10;
  margin-top: 1.25vw;
  padding: 1.25vw 5.21vw;
  column-gap: 4.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    column-count: 1;
    margin-top: 3.13vw;
    padding: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
    /* min-width: 150vw; */
    /* overflow: auto; */
  }
`;

const HeadContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  justify-content: space-between;
  background-color: ${theme.colors.redDark};
  color: ${theme.colors.white};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.83vw;
  grid-column-gap: 1.25vw;
  padding: 0.83vw 1.25vw;

  & > :nth-child(2),
  & > :nth-child(3) {
    justify-self: center;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 2fr 1fr 1fr;
    font-size: 2.09vw;
    grid-column-gap: 3.13vw;
    padding: 2.09vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    font-weight: 600;
    grid-column-gap: 2.13vw;
    padding: 4.27vw 1.07vw;
  }
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.grayDark};
  grid-column-gap: 1.25vw;
  padding: 0.83vw 1.25vw;

  & > :nth-child(2),
  & > :nth-child(3) {
    text-align: center;
    font-weight: 700;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-column-gap: 3.13vw;
    padding: 2.09vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 2.13vw;
    padding: 4.27vw 1.07vw;

    & > :nth-child(2),
    & > :nth-child(3) {
      font-weight: 600;
    }
  }
`;

const RowContent = styled.div<{ justify?: string }>`
  color: ${(props) => props.theme.colors.white_black};
  justify-self: ${(props) => props.justify};
  font-size: 0.83vw;

  width: 100%;
  box-sizing: border-box;

  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const Content = styled.div`
  color: ${theme.colors.grayLight};
  display: grid;
  margin-bottom: 1.56vw;
  break-inside: avoid-column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;
