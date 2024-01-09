import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../containers/containerContent";

type Props = {
  message?: string;
};

export const NoData = ({ message }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Block>{message || lang[locale].loadError.title}</Block>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  display: grid;
  justify-content: center;
  grid-template-rows: 50px 50px;
  align-content: center;
  height: 50vh;
  width: inherit;
`;

const Block = styled.div`
  font-size: 2.08vw;
  color: ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8vw;
  }
`;
