import { DropdownList } from "../../../components/dropdownList/dropdownList";
import React from "react";
import { ContainerContent } from "../../../components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IStadiumStaff } from "../../../api/dto/IStadiumStaff";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

interface IProps {
  admissionConditions?: IStadiumStaff["admissionConditions"];
}

export const ConditionsDropdownList = (props: IProps) => {
  const { locale } = useRouter();

  return props.admissionConditions ? (
    <StyledContainer>
      {props.admissionConditions?.map((elem) => (
        <React.Fragment key={getLocalValue(elem.title, locale)}>
          <DropdownList title={getLocalValue(elem.title, locale)}>
            <div dangerouslySetInnerHTML={{ __html: getLocalValue(elem.description, locale) }} />
          </DropdownList>
        </React.Fragment>
      ))}
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  display: flex;
  flex-direction: column;
  font-family: "FCSM Text", sans-serif;
  justify-content: left;

  p {
    margin: 0;
  }

  a {
    color: ${theme.colors.red};
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.94vw;

    li {
      display: flex;
      align-items: center;
    }

    li::before {
      height: 2.08vw;
      width: 2.08vw;
      line-height: 1px;
      padding-right: 0.63vw;
      content: url("/images/stadium/RedPoint.svg");

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        padding-right: 1.56vw;
        height: 5.22vw;
        width: 5.22vw;
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        padding-right: 3.2vw;
        height: 10.67vw;
        width: 10.67vw;
      }
    }
  }

  :last-child {
    padding-bottom: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.5vw;
    :last-child {
      padding-bottom: 10.43vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    :last-child {
      padding-bottom: 14.93vw;
    }
  }
`;
