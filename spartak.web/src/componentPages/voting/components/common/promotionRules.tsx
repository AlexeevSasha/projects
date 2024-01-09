import { useRouter } from "next/router";
import { Fragment } from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { langVoting } from "../lang/langVoting";

type RuleItemList = {
  [key: number]: string;
};

type RuleItems = {
  [key: number]: {
    text: string;
    list?: RuleItemList;
    items?: RuleItems;
  };
};

type Rule = {
  [key: number]: {
    title: string;
    items: RuleItems;
  };
};

export const PromotionRules = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Edition>{langVoting[locale].edition}</Edition>

      {Object.entries(langVoting[locale].rules as Rule).map(([sectionIndex, { title, items }]) => (
        <Fragment key={sectionIndex}>
          <Header>
            {sectionIndex}. {title}
          </Header>

          {Object.entries(items).map(([itemIndex, { text, list, items }]) => (
            <Fragment key={itemIndex}>
              <Text>
                {sectionIndex}.{itemIndex}. {text}
              </Text>

              {list && (
                <List>
                  {Object.entries(list).map(([listIndex, listText]) => (
                    <li key={listIndex}>{listText}</li>
                  ))}
                </List>
              )}

              {items &&
                Object.entries(items).map(([subItemIndex, { text: subItemText }]) => (
                  <Text key={subItemIndex}>
                    {sectionIndex}.{itemIndex}.{subItemIndex}. {subItemText}
                  </Text>
                ))}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Container>
  );
};

const Container = styled.div`
  font-family: "FCSM Text";
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 0.9375vw;
  line-height: 1.458vw;
  width: 61.5625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    font-size: 1.5vw;
    line-height: 2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.5vw;
    line-height: 3vw;
  }
`;

const Header = styled.h5`
  font-size: 1.25vw;
  margin: 1.66vw 0 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2vw;
    margin: 2.4vw 0 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3vw;
    margin: 3vw 0 0;
  }
`;

const Text = styled.p`
  margin: 0.83vw 0 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 1.2vw 0 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 1.5vw 0 0;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0 0.9375vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 3.5vw;
  }
`;

const Edition = styled.div`
  margin: 0.83vw 0 0;
  font-family: "FCSM Text";
  font-weight: 500;
  letter-spacing: 0.1px;
  color: ${theme.colors.grayDark};
`;
