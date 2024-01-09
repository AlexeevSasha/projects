import React, { useMemo } from "react";
import styled from "styled-components";
import { CustomButton } from "../../../components/buttons/customButton";
import { IconVkColored } from "../../../assets/icon/iconVkColored";
import { theme } from "../../../assets/theme/theme";
import { IconGoogleColored } from "../../../assets/icon/iconGoogleColored";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";

interface IProps {}

export const PageSocialNetworks = (props: IProps) => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <Container>
      <Title>{t.pageProfileSocial.title}</Title>
      <Description>{t.pageProfileSocial.description}</Description>
      <BlockBind>
        <BlockSocialAndName>
          <IconVkColored />
          <UserName>Александр Вольский</UserName>
        </BlockSocialAndName>
        <StyledButton type={"red"}>{t.form.validation.bind}</StyledButton>
      </BlockBind>
      <BlockBind>
        <BlockSocialAndName>
          <IconGoogleColored />
          <UserName>Александр Вольский</UserName>
        </BlockSocialAndName>
        <StyledButton type={"red"}>{t.form.validation.bind}</StyledButton>
      </BlockBind>
    </Container>
  );
};

const Container = styled.section`
  padding: 2.08vw 29.69vw;
  font-family: "FCSM Text", sans-serif;
  color: ${theme.colors.white};
  svg {
    width: 2.81vw;
    height: 2.81vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw;
    svg {
      width: 7.4vw;
      height: 7.04vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw;
    svg {
      width: 10.67vw;
      height: 10.67vw;
    }
  }
`;

const BlockBind = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.05vw solid ${theme.colors.grayDark};
  padding: 16px 0;
`;

const BlockSocialAndName = styled.div`
  display: flex;
  align-items: center;
  gap: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const UserName = styled.p`
  margin: 0;
  font-size: 0.84vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const StyledButton = styled(CustomButton)`
  justify-content: center;
  line-height: 1;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.67vw;
  padding-bottom: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding-bottom: 1.08vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding-bottom: 2.13vw;
  }
`;

const Description = styled.div`
  color: ${theme.colors.gray};
  font-size: 0.94vw;
  padding-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-bottom: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 2.13vw;
  }
`;
