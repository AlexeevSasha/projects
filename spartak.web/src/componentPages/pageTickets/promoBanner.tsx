import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { ContainerContent } from "../../components/containers/containerContent";
import { Input } from "../../components/input/input";
import { ThemeContext } from "../../core/themeProvider";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  promo?: string | null;
  deletePromo: () => Promise<void>;
  sendPromo: (value: string) => Promise<void>;
}

export const PromoBanner = ({ promo, deletePromo, sendPromo }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Content>
      <ContainerForm>
        <Title>{lang[locale].shop.usePromo}</Title>

        <InputContainer>
          {promo ? (
            <TextPromo>
              {promo}
              <ContainerIcon>
                <NextImage src="/images/tickets/tickets/inputPromoCheck.svg" alt="промокод установлен" />
              </ContainerIcon>
            </TextPromo>
          ) : (
            <Input
              placeholder={lang[locale].shop.enterCode}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              isStadiumForm
              lightStyle={!isDarkTheme}
            />
          )}
          <Button
            onClick={promo ? deletePromo : inputValue ? () => sendPromo(inputValue) : undefined}
            type={promo ? "opacity" : "red"}
          >
            {promo ? lang[locale].shop.changePromo : lang[locale].shop.apply}
          </Button>
        </InputContainer>

        <Text>{lang[locale].tickets.promoCodeSpartak}</Text>
      </ContainerForm>

      <ContainerImg>
        <NextImage alt={"Промокод Спартак"} src={"/images/tickets/tickets/imgFormPromo_v1.0.0.png"} />
      </ContainerImg>
    </Content>
  );
};

const Content = styled(ContainerContent)`
  margin: 7.19vw auto 4.43vw;
  background: ${({ theme }) => theme.colors.blackLight_red};
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  display: grid;
  grid-template-columns: 1.1fr 1fr;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.13vw auto;
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw auto;
    grid-template-columns: 1fr;
  }
`;

const ContainerForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 2.08vw;
  padding: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    grid-row-gap: 4.27vw;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    font-weight: 500;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 62.19vw 23.21vw;
    grid-column-gap: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 4.27vw;
  }
`;

const Button = styled(CustomButton)`
  width: 12.71vw;
  padding: 0.73vw 0;
  text-align: center;
  border-color: ${({ theme }) => theme.colors.none_white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.7vw 0;
    width: 23.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    padding: 2.5vw 0;
    box-sizing: border-box;
  }
`;

const Text = styled.p`
  margin: 0;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    font-weight: 500;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const TextPromo = styled.div`
  width: 100%;
  border: 1px solid ${theme.colors.grayDark};
  padding: 0 0.83vw;
  font-size: 0.83vw;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.83vw 2.09vw;
    font-size: 2.09vw;
  }
`;

const ContainerIcon = styled.div`
  width: 1.25vw;
  height: 1.25vw;
`;

const ContainerImg = styled.div`
  height: 17.7vw;
  margin-top: -3.02vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
