import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { DropdownList } from "../../components/dropdownList/dropdownList";
import { ISpartakKids } from "../../api/dto/ISpartakKids";
import { useRouter } from "next/router";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { CmsText } from "./ui";

export const Questions = (props: ISpartakKids["answersQuestions"]) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <SubTitle>{getLocalValue(props?.title, locale)}</SubTitle>

      {props?.list?.map(({ question, answer }, i) => (
        <Dropdown key={i} customTitle={<CustomTitle>{getLocalValue(question, locale)}</CustomTitle>}>
          <Content>
            <CmsText dangerouslySetInnerHTML={{ __html: getLocalValue(answer, locale) }} />
          </Content>
        </Dropdown>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 6.25vw;
`;

export const SubTitle = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 2.08vw;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.215vw;
    margin-bottom: 2.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin-bottom: 6.4vw;
  }
`;

const CustomTitle = styled.div`
  margin: 0;
  flex: 1;
  background: ${({ theme }) => theme.colors.black_white};
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const Dropdown = styled(DropdownList)`
  margin: 0;

  & > div:first-child {
    padding: 2.03vw 0 0.78vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 3.13vw 0 1.955vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 6.4vw 0 4vw;
    }
  }
`;

const Content = styled.div`
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  padding: 1.25vw 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4vw;
  }
`;

export const Text = styled.p<{ isListItem?: boolean }>`
  margin: 0;
  font-size: 1.25vw;

  & a {
    text-decoration: none;
    color: ${theme.colors.red};
    cursor: pointer;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
  }
`;
