import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { CmsText, SubTitle } from "./ui";
import { ISpartakKids } from "../../api/dto/ISpartakKids";
import { getLocalValue } from "../../assets/helpers/getLocalValue";

export const Privileges = (props: ISpartakKids["memberPrivileges"]) => {
  const { locale = "ru" } = useRouter();

  const firstColumnLength = props?.list?.length && Math.round(props?.list?.length / 2);
  const firstColumn = props?.list?.slice(0, firstColumnLength);
  const secondColumn = props?.list?.slice(firstColumnLength, props?.list?.length);

  return (
    <Container>
      <SubTitle>{getLocalValue(props?.title, locale)}</SubTitle>

      <ColumnsContainer>
        <List>
          {firstColumn?.map((text, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{
                __html: getLocalValue(text, locale),
              }}
            />
          ))}
        </List>

        <List>
          {secondColumn?.map((text, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{
                __html: getLocalValue(text, locale),
              }}
            />
          ))}
        </List>
      </ColumnsContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 4vw 0 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 10.43vw 0 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.66vw 0 0;
  }
`;

const List = styled.ul`
  display: grid;
  margin: 0;
  row-gap: 1.25vw;

  p {
    span {
      color: ${({ theme }) => theme.colors.white_black} !important;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    row-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 6.4vw;
  }
`;
const ColumnsContainer = styled(CmsText)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
  }
`;
