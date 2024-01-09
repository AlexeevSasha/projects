import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { profileDenariiRepository } from "../../../api/profileDenariiRepository";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { ContainerContent } from "../../../components/containers/containerContent";
import { Input } from "../../../components/input/input";
import { MessageModal } from "../../../components/modal/messageModal";
import { useWindowSize } from "../../../core/hooks/UseWindowSize";
import { ThemeContext } from "../../../core/themeProvider";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { NextImage } from "../../../ui/nextImage/nextImage";

export const Tele2banner = () => {
  const { locale = "ru" } = useRouter();
  const { width = 0 } = useWindowSize(true);
  const size = width > 767 ? (width > 1199 ? "L" : "M") : "S";
  const { isDarkTheme } = useContext(ThemeContext);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");

  const handleApplay = async () => {
    setLoading(true);
    value &&
      (await profileDenariiRepository
        .applayPromoCode(value)
        .then(() => setModal("success"))
        .catch(() => setModal("error")));
    setLoading(false);
  };

  const modalText = `
      ${modal === "success" ? lang[locale].profile.denariiPage.tele2succes : ""}
      ${modal === "success" ? lang[locale].profile.denariiPage.tele2level : ""}
      ${modal === "error" ? lang[locale].profile.denariiPage.tele2error : ""}
    `;

  return (
    <Container>
      {loading && <LoadingScreen />}

      {modal && <MessageModal message={modalText} onClose={() => setModal("")} />}

      <BgImgWrapper>
        <NextImage src={`/images/profile/tele2${size}_v1.0.0.png`} objectFit="cover" />
      </BgImgWrapper>

      <Tele2ImgWrapper>
        <NextImage src={isDarkTheme ? "/images/profile/light_tele2_v1.0.0.png" : "/images/profile/tele2_v1.0.0.png"} />
      </Tele2ImgWrapper>

      <Title>{lang[locale].profile.denariiPage.tele2title}</Title>

      <Text>{lang[locale].profile.denariiPage.tele2text}</Text>

      <NativeLink target="_blank" href="https://msk.tele2.ru/promo/football-offer">
        {lang[locale].profile.denariiPage.tele2link}
      </NativeLink>

      <InputWrapper>
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          lightStyle={!isDarkTheme}
          placeholder={lang[locale].profile.denariiPage.tele2placeholder}
        />
        <CustomButton type="red" onClick={handleApplay}>
          {lang[locale].profile.denariiPage.tele2btnText}
        </CustomButton>
      </InputWrapper>

      <Desc>{lang[locale].profile.denariiPage.tele2desc}</Desc>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  position: relative;
  display: block;
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  padding: 2.08vw;
  font-weight: 500;
  box-sizing: border-box;
  margin-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.266vw;
    margin-top: 6.4vw;
  }
`;

const BgImgWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 34vw;
  z-index: 1;
`;

const Tele2ImgWrapper = styled.div`
  position: absolute;
  width: 17.158vw;
  height: 6.434vw;
  right: 12.488vw;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 2.08vw;
  color: ${({ theme }) => theme.colors.white_black};
  margin-bottom: 0.416vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    margin-bottom: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 6.4vw;
    margin-bottom: 2.13vw;
  }
`;

const Text = styled.div`
  letter-spacing: 0.1px;
  font-size: 0.9375vw;
  color: ${({ theme }) => theme.colors.white_black};
  margin-bottom: 0.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin-bottom: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.266vw;
    margin-bottom: 1.06vw;
  }
`;

const NativeLink = styled.a`
  color: ${theme.colors.red};
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.83vw;
  display: block;
  margin-bottom: 0.63vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-bottom: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-bottom: 3.2vw;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 38.69vw;
  margin-bottom: 0.63vw;

  & > * {
    z-index: 2;
  }

  & > *:first-child {
    margin-right: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 1.56vw;
    width: 100%;
    & > *:first-child {
      margin-right: 2.08vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 0;
    display: block;

    & > * {
      margin-bottom: 3.2vw;
      margin-right: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
`;

const Desc = styled.div`
  font-size: 0.625vw;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray_grayDark1};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;
