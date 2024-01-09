import React from "react";
import { ContainerContent } from "../../../components/containers/containerContent";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IStadiumHowToGet } from "../../../api/dto/IStadiumHowToGet";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

interface IProps {
  howToGet: IStadiumHowToGet["howToGet"];
}

export const HowToGetDropdownList = (props: IProps) => {
  const { locale } = useRouter();

  return props.howToGet ? (
    <StyledContainer>
      {props.howToGet?.map((elem, index) => (
        <DropdownList key={index} title={getLocalValue(elem.title, locale)} defaultState={!index}>
          <Text
            dangerouslySetInnerHTML={{
              __html: getLocalValue(elem.description, locale),
            }}
          />
        </DropdownList>
      ))}
    </StyledContainer>
  ) : (
    <></>
  );
};

const StyledContainer = styled(ContainerContent)`
  padding-bottom: 3.54vw;
  display: block;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 5.22vw;
  }
`;

const Text = styled.div`
  p {
    margin: 0;
  }
  padding: 1.25vw 2.08vw;
  background: ${({ theme }) => theme.colors.blackLight_white1};
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 3.13vw 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 4.27vw;
  }
`;
