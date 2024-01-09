import React, { useMemo } from "react";
import styled from "styled-components";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { theme } from "../../../assets/theme/theme";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { SendFormProposal } from "../../../components/sendFormProposal/sendFormPropposal";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { NextImage } from "../../../ui/nextImage/nextImage";

export const mockItemsList = [
  { label: "aboutFields", link: "/more/sokolniki/aboutFields" },
  {
    label: "selectField",
    link: "/more/sokolniki/select",
  },
  { label: "schema", link: "/more/sokolniki/schema" },
  {
    label: "howMove",
    link: "/more/sokolniki/howMove",
  },
  { label: "contacts", link: "/more/sokolniki/contacts" },
];

const mockFields = [
  {
    src: "/images/more/field1_v1.0.0.png",
    title: "Футбольное поле №1",
    price: "от 3500₽",
  },
  {
    src: "/images/more/field2_v1.0.0.png",
    title: "Футбольное поле №2",
    price: "от 3500₽",
  },
  {
    src: "/images/more/field6_v1.0.0.png",
    title: "Футбольное поле №3",
    price: "от 3500₽",
  },
  {
    src: "/images/more/field7_v1.0.0.png",
    title: "Футбольное поле №4",
    price: "от 3500₽",
  },
  {
    src: "/images/more/field8_v1.0.0.png",
    title: "Футбольное поле №5",
    price: "от 3500₽",
  },
  {
    src: "/images/more/field9_v1.0.0.png",
    title: "Футбольное поле №6",
    price: "от 3500₽",
  },
];

export const AboutFields = () => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <>
      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        position="center"
        src={"/images/more/BannerSokolniki_v1.0.0.png"}
      >
        <Title>{t.more.aboutFields.fieldsSokolniki}</Title>
      </ContainerWithBackgroundImg>
      <Content>
        <NavMenu menuList={mockItemsList} />
        <ColumnBlock>
          <DescriptionTitle>{t.more.aboutFields.fieldRent}</DescriptionTitle>
          <DescriptionContent>
            <Item>{t.more.aboutFields.fieldDescriptionOne}</Item>
            <Item>{t.more.aboutFields.fieldDescriptionTwo}</Item>
            <Item>{t.more.aboutFields.fieldDescriptionThird}</Item>
            <Item>{t.more.aboutFields.fieldDescriptionFour}</Item>
          </DescriptionContent>
          <ColumnBlock>
            <DescriptionTitle>{t.more.aboutFields.oursFields}</DescriptionTitle>
            <FieldsContent>
              {mockFields.map((field) => (
                <ItemField key={`${field.title}_${field.price}`}>
                  <BackGround ><NextImage src={field.src} /></BackGround>
                  <FooterField>
                    {field.title}
                    <ContainerPrice>
                      {field.price}
                      <ButtonReserve>
                        <IconArrowRight />
                        {t.more.aboutFields.bookField}
                      </ButtonReserve>
                    </ContainerPrice>
                  </FooterField>
                </ItemField>
              ))}
              <ImagesBlock />
            </FieldsContent>
          </ColumnBlock>
          <ManagerBlock>
            <SendFormProposal
              description={t.more.aboutFields.managerDescription}
              title={t.form.contactTheManager}
              image={"/images/more/field5_v1.0.0.png"}
            />
          </ManagerBlock>
        </ColumnBlock>
      </Content>
    </>
  );
};

const Title = styled.h1`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
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
  font-weight: 700;

  & nav {
    column-gap: 2vw;
    overflow: auto;
    white-space: nowrap;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2vw 3.13vw;
  }
`;

const ColumnBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionTitle = styled.p`
  font-size: 4.25vw;
`;

const DescriptionContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 5.14vw;
  row-gap: 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    row-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 4.27vw;
  }
`;

const Item = styled.span`
  display: inline-block;
  font-size: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  max-width: 38vw;
  color: ${theme.colors.grayLight};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    max-width: unset;
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const FieldsContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 26.7vw);
  grid-template-rows: repeat(2, 28vw) 29.6vw;
  column-gap: 1.25vw;
  row-gap: 1.25vw;
  margin-bottom: 1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 58.4vw) 98.5vw;
    row-gap: 3.13vw;
    column-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: repeat(6, 91.2vw) 46.5vw;
    gap: 2.13vw;
  }
`;

const ItemField = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "FCSM Text", sans-serif;
`;

const BackGround = styled.div`
  flex-grow: 1;
  &:hover {
    filter: brightness(140%);
  }
`;

const FooterField = styled.div`
  display: flex;
  font-size: 1.4vw;
  flex-direction: column;
  row-gap: 16px;
  background-color: ${theme.colors.blackLight};
  padding: 1.2vw 2vw;
  letter-spacing: 1.5px;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 10px;
    padding: 1.5vw 2vw;
    font-size: 3.4vw;
  }
`;

const ImagesBlock = styled.div`
  grid-column: 1/-1;
  grid-row: 3/-1;
  background: url("/images/more/field4_v1.0.0.png") no-repeat 0 0/25% 49.5%,
    url("/images/more/field3_v1.0.0.png") no-repeat 0 100%/25% 49.5%,
    url("/images/more/field5_v1.0.0.png") no-repeat right 0/74.7% 100%;
  margin-top: 4vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row: 4/-1;
    background: url("/images/more/field4_v1.0.0.png") no-repeat 0 0/100% 49.5%,
      url("/images/more/field3_v1.0.0.png") no-repeat 0 100%/100% 49.5%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row: 7/-1;
    background: url("/images/more/field3_v1.0.0.png") no-repeat 0 0/100% 100%;
  }
`;

const ManagerBlock = styled.div`
  display: flex;
`;

const ContainerPrice = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1vw;
  }
`;

const ButtonReserve = styled.button`
  font-family: "FCSM Text", sans-serif;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  column-gap: 0.2vw;
  padding: 0.5vw 0.9vw;
  font-size: 0.8vw;
  color: ${theme.colors.white};
  background-color: ${theme.colors.red};
  border: none;
  transition: 0.3s ease;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2vw;
    padding: 1.5vw 2.4vw;

    & svg {
      width: 3vw;
      height: 3vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    letter-spacing: 1px;
    padding: 1.5vw 3.4vw;
  }

  &:hover {
    background-color: ${theme.colors.redDark};
  }

  &:active {
    transform: scale(1.05);
  }
`;
