import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { lang } from "../../../../public/locales/lang";
import { IAcademyBlocks } from "../../../api/dto/IAcademyContacts";

interface IProps {
  contactsData: IAcademyBlocks;
}

export const ContactAcademyItem = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <Title>{getLocalValue(props.contactsData.title, locale)}</Title>
      <Content>
        <div>
          <HeaderCell>{getLocalValue(lang[locale].academy.contacts.address, locale)}</HeaderCell>
          <Cell>{getLocalValue(props.contactsData.contacts.address, locale)}</Cell>
        </div>

        <div>
          <HeaderCell>{lang[locale].academy.contacts.phone}</HeaderCell>
          <Cell>
            {props.contactsData.contacts.phone.map((item, index) => (
              <React.Fragment key={index}>
                <div>{getLocalValue(item, locale)}</div>
              </React.Fragment>
            ))}
          </Cell>
        </div>

        <div>
          <HeaderCell>{lang[locale].academy.contacts.email}</HeaderCell>
          <Cell>{getLocalValue(props.contactsData.contacts.email, locale)}</Cell>
        </div>
      </Content>
    </>
  );
};

const Title = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 3.23vw;
  padding: 4.17vw 0 3.33vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    padding: 5.22vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 6.4vw 0;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 10.67vw;
  }
`;

const HeaderCell = styled.div`
  font-size: 0.83vw;
  color: ${theme.colors.gray};
  border-bottom: 1px solid ${theme.colors.red};
  text-transform: uppercase;
  padding-bottom: 0.83vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-bottom: 2.61vw;
    padding-bottom: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-bottom: 5.33vw;
    padding-bottom: 4.27vw;
  }
`;

const Cell = styled.div`
  font-size: 2.08vw;
  padding-top: 1.25vw;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 0;
    font-size: 4.17vw;
    flex-direction: column;
    column-gap: 3.13vw;
    row-gap: 2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    column-gap: 5.03vw;
    word-break: break-word;
    row-gap: 6.4vw;
  }
`;
