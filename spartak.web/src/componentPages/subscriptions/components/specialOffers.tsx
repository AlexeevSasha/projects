import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { ThemeContext } from "../../../core/themeProvider";
import { CMS } from "../../../modules/cms/components/cms";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { ISpecialOffers } from "../interfaces/ISpecialOffers";
import { IconWarning } from "../../../assets/icon/iconWarning";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  specialOffers: ISpecialOffers;
}

// Экспортировать вне модуля только через конструкцию Subscriptions.[Component]
export const SpecialOffers = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <CMS.Article>
      <CMS.TitleOfSection>{getLocalValue(props.specialOffers.title, locale)}</CMS.TitleOfSection>
      <List>
        {props.specialOffers.list.map((elem, index) => (
          <Item key={index}>
            <ImgContainer>
              <NextImage src={isDarkTheme ? elem.darkImage : elem.whiteImage} />
            </ImgContainer>
            {getLocalValue(elem.description, locale)}
          </Item>
        ))}
      </List>

      <AttentionBlock insSmallScreen>
        <IconWarning />
        <Attention>{getLocalValue(props.specialOffers.warningText, locale)}</Attention>
      </AttentionBlock>
    </CMS.Article>
  );
};

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1.25vw;
  grid-row-gap: 1.25vw;
  color: ${(props) => props.theme.colors.white_black};
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3.13vw;
    grid-row-gap: 3.13vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 6.4vw;
    margin-top: 6.4vw;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const ImgContainer = styled.div`
  width: 19.69vw;
  height: 7.4vw;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.37vw;
    height: 17.21vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    height: 34.13vw;
    margin-bottom: 6.4vw;
  }
`;

const AttentionBlock = styled.p<{ insSmallScreen?: boolean }>`
  display: flex;
  align-items: center;
  height: fit-content;
  margin: 0;
  font-size: 0.73vw;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  color: ${theme.colors.gray};
  background: rgba(204, 18, 45, 0.1);
  padding: 0.42vw;

  margin-top: 1.25vw;

  svg {
    margin-right: 0.42vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: ${({ insSmallScreen }) => (insSmallScreen ? "flex" : "none")};

    padding: 1.04vw;
    margin-top: 3.13vw;

    svg {
      margin-right: 1.04vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 400;
    padding: 3.13vw;
    margin-top: 6.4vw;

    svg {
      margin-right: 2.13vw;
    }
  }
`;

const Attention = styled.span`
  color: ${({ theme }) => theme.colors.gray_black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.84vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    gap: 2.13vw;
  }
`;
