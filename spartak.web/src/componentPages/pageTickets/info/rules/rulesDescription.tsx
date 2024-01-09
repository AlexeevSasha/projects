import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";

interface IProps {
  rulesDescription: [
    {
      title: string;
      text: string;
    }
  ];
}

export const RulesDescription = (props: IProps) => {
  return (
    <Container>
      {props.rulesDescription.map((elem, index) => (
        <React.Fragment key={index}>
          <Title>{elem.title}</Title>
          <Text dangerouslySetInnerHTML={{ __html: elem.text }} />
        </React.Fragment>
      ))}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  flex-direction: column;
  align-items: flex-start;
  padding: 2.08vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 11.73vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0 4vw;
  }
`;
const Title = styled.h3`
  margin: 0;
  font-size: 1.67vw;
  font-weight: 700;
  padding-bottom: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    padding-bottom: 6.4vw;
  }
`;
const Text = styled.div`
  margin: 0;
  font-size: 0.94vw;
  padding-bottom: 2.08vw;
  padding-right: 20.94vw;

  a {
    color: ${theme.colors.red};
  }

  li {
    list-style-position: outside;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 0;
    font-size: 2.35vw;
    padding-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 10.67vw;
  }
`;
