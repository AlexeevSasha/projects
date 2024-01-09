import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { H1 } from "../../components/modal/modalUi";

type Props = {
  onClose: () => void;
};

export const RuleAgree = ({ onClose }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Arrow rotate="180deg" disabled onClick={onClose} />

      <H1>{lang[locale].auth.ruleAgreeHeader}</H1>

      <Text>{lang[locale].auth.ruleAgreeText1}</Text>
      <Text>{lang[locale].auth.ruleAgreeText2}</Text>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 -1vw;
  font-family: "FCSM Text";
  font-style: normal;
  font-weight: 500;
`;

const Text = styled.p`
  font-family: "FCSM Text";
  margin: 0;
  color: ${theme.colors.black};

  &:not(:last-child) {
    margin-top: 0.83vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-top: 2.08vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-top: 4.26vw;
    }
  }
`;

const Arrow = styled(IconArrowRight)`
  position: absolute;
  align-self: flex-start;
  cursor: pointer;
  font-size: 1.25vw;
  flex: 1 0;
  left: 1.25vw;
  top: 1.25vw;

  &:hover {
    opacity: 0.5;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    left: 3.13vw;
    top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    top: 13.13vw;
  }
`;
