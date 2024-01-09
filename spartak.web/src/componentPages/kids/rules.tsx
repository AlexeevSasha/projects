import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { Spacer } from "../../components/spacer";
import { CmsText, Container } from "./ui";
import { useRouter } from "next/router";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { IKidsRules } from "../../../pages/kids/rules";

export const Rules = (props: IKidsRules) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Spacer height={["2.08vw", "0", "0"]} />

      <Paragraph>
        <CmsText dangerouslySetInnerHTML={{ __html: getLocalValue(props?.rules, locale) }} />
      </Paragraph>
    </Container>
  );
};

const Paragraph = styled.div`
  margin-top: 2.08vw;
  width: 61.5625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-top: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;
  }
`;
