import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconRedPoint } from "../../../assets/icon/iconRedPoint";
import { CMS } from "../../../modules/cms/components/cms";
import { ITwoColumnList } from "../interfaces/ITwoColumnList";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  twoColumnList: ITwoColumnList;
}

// Экспортировать вне модуля только через конструкцию Subscriptions.[Component]
export const TwoColumnList = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <CMS.Article>
      <CMS.TitleOfSection>{getLocalValue(props.twoColumnList.title, locale)}</CMS.TitleOfSection>
      <List>
        {props.twoColumnList.list.map((elem, i) => (
          <Item key={i}>
            <IconRedPoint ts="5.22vw" ms="6.4vw" />
            {getLocalValue(elem.text, locale)}
          </Item>
        ))}
      </List>
    </CMS.Article>
  );
};

const List = styled.ul`
  color: ${(props) => props.theme.colors.grayLight_grayDark};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  padding: 0;
  margin: 1.25vw 0 0;
  font-size: 0.94vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    font-size: 2.35vw;
    grid-column-gap: 3.13vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    grid-row-gap: 6.4vw;
    margin-top: 6.4vw;
  }
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 2.08vw 1fr;
  grid-column-gap: 0.63vw;
  align-items: center;
  padding: 0.63vw 0;

  list-style-type: none;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 5.22vw 1fr;
    grid-column-gap: 1.56vw;
    padding: 1.56vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 6.4vw 1fr;
    grid-column-gap: 3.2vw;
    padding: 0;
  }
`;
