import React, { ReactNode } from "react";
import { DropdownList } from "../../components/dropdownList/dropdownList";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

interface IProps {
  description: string;
  customTitle?: ReactNode;
  title?: string;
  defaultState?: boolean;
}

export const ClubsDropdownList = (props: IProps) => {
  return (
    <DropdownList title={props.title} customTitle={props.customTitle} defaultState={props.defaultState}>
      <ClubsDropdownDescriptionBlock>
        <ClubsDropdownDescription dangerouslySetInnerHTML={{ __html: props.description }} />
      </ClubsDropdownDescriptionBlock>
    </DropdownList>
  );
};

const ClubsDropdownDescriptionBlock = styled.div`
  margin: 0;
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  padding: 1.25vw 2.6vw 1.25vw 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
  }
`;

const ClubsDropdownDescription = styled.div`
  margin: 0;
  word-break: break-word;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
