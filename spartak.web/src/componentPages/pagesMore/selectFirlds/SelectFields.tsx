import React, { useMemo } from "react";
import styled from "styled-components";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { theme } from "../../../assets/theme/theme";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { mockItemsList } from "../aboutFields/AboutFields";
import { SelectStadiumItem } from "./SelectStadiumItem";
import { SendFormProposal } from "../../../components/sendFormProposal/sendFormPropposal";

export const SelectFields = () => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <>
      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        position="center"
        src={"/images/more/BannerSokolniki_v1.0.0.png"}
      >
        <Title>{t.more.selectFields.selectField}</Title>
      </ContainerWithBackgroundImg>
      <Content>
        <NavMenu menuList={mockItemsList} />
        <ColumnBlock>
          <SelectStadiumItem />
        </ColumnBlock>
        <ManagerBlock>
          <SendFormProposal
            description={t.more.aboutFields.managerDescription}
            title={t.form.contactTheManager}
            image={"/images/more/field5_v1.0.0.png"}
          />
        </ManagerBlock>
      </Content>
    </>
  );
};

const Title = styled.h1`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;

  font-size: 6.25vw;
  padding: 19.27vw 0 5.21vw 8.75vw;
  margin: 0;
  z-index: 10;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
    padding: 20.86vw 0 13.04vw 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 42.67vw 0 10.67vw 4.27vw;
  }
`;

const Content = styled.div`
  padding: 2vw 8.9vw;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;

  & nav {
    column-gap: 2vw;
    overflow: auto;
    white-space: nowrap;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2vw 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    padding: 2vw 4.27vw;
  }
`;

const ColumnBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5.21vw;
  margin-top: 4.17vw;
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    row-gap: 10.67vw;
  }
`;

const ManagerBlock = styled.div`
  display: flex;
`;
