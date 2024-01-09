import { useRouter } from "next/router";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PageProps } from "../../../pages/_app";
import { lang } from "../../../public/locales/lang";
import { ChairPlottingStatus } from "../../api/dto/UserInfoDto";
import { ContactCardType, userRepository } from "../../api/userRepository";
import { getCookie } from "../../assets/constants/getCookie";
import { IconInfo as InfoIcon } from "../../assets/icon/iconInfo";
import { IconTshirt } from "../../assets/icon/iconTshirt";
import tail from "../../assets/icon/tail.svg";
import tshirt from "../../assets/images/tshirt.png";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { ContainerContent } from "../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../components/containers/containerHorizontalScroll";
import type { INavMenuList } from "../../components/header/component/getMenuItems";
import { IconImage } from "../../components/IconImage";
import { GetLayout } from "../../components/layout/getLayout";
import { MessageModal } from "../../components/modal/messageModal";
import { NavMenu } from "../../components/navMenu/navMenu";
import { DataContext } from "../../core/dataProvider";
import { ThemeContext } from "../../core/themeProvider";
import { LoadingScreen } from "../../ui/LoadingScreen ";
import { NextImage } from "../../ui/nextImage/nextImage";
import { NameplateView } from "./personalDataForm/nameplateView";
import { SaveAlert } from "./saveAlert";
import { BarCodeModal } from "./barCodeModal";

export const getProfileLayout = (page: JSX.Element, props: PageProps) =>
  GetLayout(<ProfileLayout>{page}</ProfileLayout>, props);

const profileMenuItems: INavMenuList[] = [
  { label: "profile/denarii", link: "/profile/denarii" },
  { label: "profile/orders", link: "/profile/orders" },
  { label: "profile/matches", link: "/profile/matches" },
  { label: "profile/specialOffers", link: "/profile/specialOffers" },
  { label: "profile/personalData", link: "/profile/personalData" },
  { label: "profile/loyalty", link: "/profile/loyalty" },
  { label: "profile/connections", link: "/profile/connections" },
];

export const ProfileLayout: FC = ({ children }) => {
  const { locale = "ru", push, asPath } = useRouter();
  const { auth: { user = undefined } = {}, setUser, setLoading } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showBarCode, setShowBarCode] = useState(false);
  const [userBarCard, setUserBarCard] = useState<ContactCardType>();

  const loadUserData = () => {
    if (user && user.subscription !== null && !user.subscription) {
      userRepository
        .fetchFullUserInfo()
        .then(setUser)
        .catch(() => setModalIsOpen(true));
    }
  };

  const getUsersBarCard = () => {
    if (!userBarCard?.CardNumber) {
      userRepository.getUsersBarCard().then(setUserBarCard);
    }
  };

  useEffect(() => {
    if (!getCookie("refresh_token")) push(`/auth/signin?backUrl=${asPath}`);

    loadUserData();
    getUsersBarCard();
    return () => {
      setLoading(false);
    };
  }, []);

  const userData = { ...user?.data, barCode: userBarCard?.CardNumber || 0 };

  const dataItemsBlocks = useMemo(
    () =>
      user?.data
        ? Object.entries(userData).map(([key, value]) => (
          <DataItemBlock key={key}>
            <DataTitle>{lang[locale].profile.profileBanner.dataItems[key]}</DataTitle>

            <DataIconBlock>
              <Data>
                {key !== "fanLevel" ? (
                  key === "barCode" ? (
                    <BarCodeBlock onClick={() => setShowBarCode(true)}>
                      <NextImage objectFit={"fill"} src={"/images/profile/barCode.png"} />
                    </BarCodeBlock>
                  ) : (
                    Math.floor(+value)
                  )
                ) : (
                  value
                )}
              </Data>

              {key === "activeDenarii" && (
                <InfoBlock>
                  <IconInfo />

                  <HoverInfoBlock>
                    <Triangle url={tail.src} />
                    {lang[locale].profile.profileBanner.activeDenari}
                  </HoverInfoBlock>
                </InfoBlock>
              )}

              {key === "barCode" && (
                <InfoBlock>
                  <IconInfo />

                  <HoverInfoBlock style={{ textAlign: "left" }}>
                    <Triangle url={tail.src} />
                    {lang[locale].profile.profileBanner.barCodeDescription}
                  </HoverInfoBlock>
                </InfoBlock>
              )}
            </DataIconBlock>
          </DataItemBlock>
        ))
        : null,
    [user, locale]
  );

  if (modalIsOpen)
    return (
      <MessageModal
        message={lang[locale].profile.errorList.timeout}
        onClose={() => push("/")}
        type={"approve"}
        onConfirm={loadUserData}
      />
    );

  return user?.personalData ? (
    <div style={{ position: "relative" }}>
      <Container isDark={isDarkTheme}>
        {showBarCode &&
          (userBarCard?.CardNumber ? (
            <BarCodeModal code={userBarCard?.CardNumber} clickClose={() => setShowBarCode(false)} />
          ) : (
            <MessageModal
              message={lang[locale].profile.profileBanner.noLinkedCard}
              type={"alert"}
              onClose={() => setShowBarCode(false)}
              withoutTimeout
            />
          ))}
        <BgContainer>
          <BgImageL>
            <NextImage
              objectFit="fill"
              src={
                isDarkTheme
                  ? "/images/banners/profileGradientDarkThemeL_v1.0.0.png"
                  : "/images/banners/profileGradientLightThemeL_v1.0.0.png"
              }
            />
          </BgImageL>
          <BgImageM>
            <NextImage
              objectFit="fill"
              objectPosition="100%"
              src={
                isDarkTheme
                  ? "/images/banners/profileGradientDarkThemeL_v1.0.0.png"
                  : "/images/banners/profileGradientLightThemeL_v1.0.0.png"
              }
            />
          </BgImageM>
          <BgImageS>
            <NextImage
              objectFit="fill"
              objectPosition="10%"
              src={
                isDarkTheme
                  ? "/images/banners/profileGradientDarkThemeS_v1.0.0.png"
                  : "/images/banners/profileGradientLightThemeS_v1.0.0.png"
              }
            />
          </BgImageS>
        </BgContainer>
        <SaveAlert>{lang[locale].profile.profileBanner.alert}</SaveAlert>

        <PaddingContainer>
          <FullNameBlock>
            <Name>{user.personalData?.FirstName}</Name>
            <SurName length={user.personalData.LastName?.length || 0}>
              {user.personalData.LastName?.slice(0, 25)} {(user.personalData.LastName?.length || 0) > 25 && "..."}
            </SurName>
          </FullNameBlock>

          <DataBlock>{dataItemsBlocks}</DataBlock>

          <TShirtImg>
            <IconImage url={tshirt.src} />
            <TshirtSign length={user.personalData.LastName?.length || 0}>{user.personalData.LastName}</TshirtSign>
          </TShirtImg>

          <TShirtBtn
            type={"red"}
            onClick={() =>
              push(
                `${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}/catalog/sezon-2022-23/domashnyaya-igrovaya-dzhersi-sezona-2022-2023-krasnyy-dj7286_1/`
              )
            }
          >
            <IconTshirt />
            <span>{lang[locale].profile.profileBanner.buyShirt}</span>
          </TShirtBtn>

          {user.nickName && user.chairPlottingStatus === ChairPlottingStatus.Approve ? (
            <NameplateView nickName={user.nickName} />
          ) : null}
          {user.subscription ? (
            <SubstrBlock>
              <Substr>{lang[locale].profile.profileBanner.subscription}</Substr>

              <Season>{user.subscription}</Season>
              {/* <ImgContainer>
                <NextImage src={"/images/profile/abonementImg_v1.0.0.png"} objectFit="cover" />
              </ImgContainer> */}
            </SubstrBlock>
          ) : null}
        </PaddingContainer>
      </Container>

      <NavBarContainer>
        <ContainerHorizontalScroll>
          <NavMenu menuList={profileMenuItems} noTheme />
        </ContainerHorizontalScroll>
      </NavBarContainer>

      {children}
    </div>
  ) : (
    <LoadingScreen />
  );
};

const Container = styled(ContainerContent) <{ isDark?: boolean }>`
  color: ${theme.colors.white};
  width: 100%;
  position: relative;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;
const BgContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 89%;
    height: 56.19vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 110%;
    height: 68vw;
  }
  & > div {
    height: 100%;
  }
`;
const BgImageL = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const BgImageM = styled.div`
  display: none;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
const BgImageS = styled.div`
  display: none;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
  }
`;

const PaddingContainer = styled(ContainerContent)`
  flex-direction: column;
  align-items: flex-start;
  padding: 8.13vw 0 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 87vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 130vw;
  }
`;

const FullNameBlock = styled.p`
  margin: 0;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    position: absolute;
    bottom: 21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    position: absolute;
    bottom: 52vw;
  }
`;

const Name = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const SurName = styled.span<{ length: number }>`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: ${({ length }) => (length > 18 ? "2.7vw" : "3.75vw")};
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: ${({ length }) => (length > 18 ? "3.77vw" : "6.78vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: ${({ length }) => (length > 18 ? "4.86vw" : "6.4vw")};
  }
`;

const DataBlock = styled.div`
  display: grid;
  grid-template-columns: 13.96vw 13.5vw 13.5vw 7.55vw;
  margin-top: 4.16vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 26.73vw 24.9vw 23.47vw 14.99vw;
    position: absolute;
    bottom: 0;
    flex-wrap: wrap;
    width: inherit;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DataItemBlock = styled.div`
  font-family: FCSM Text, sans-serif;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1.67vw 1.25vw;
  border: ${({ theme }) => `1px solid ${theme.colors.gray_gray1}`};
  width: 100%;
  box-sizing: border-box;
  min-width: 13.5vw;
  height: 7.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 4.17vw 1.56vw;
    height: 18.77vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 2.13vw;
    height: 23.46vw;
    white-space: nowrap;
  }
`;

const DataTitle = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 0.83vw;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    white-space: nowrap;
    font-weight: 600;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const DataIconBlock = styled.div`
  display: flex;
  align-items: center;
`;

const Data = styled.div`
  margin-right: 1.25vw;
  color: ${theme.colors.red};
  font-size: 2.08vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.22vw;
    margin-right: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    margin-right: 4.26vw;
  }
`;

const HoverInfoBlock = styled.div`
  display: none;
  font-family: "Roboto", sans-serif;
  font-size: 0.73vw;
  position: absolute;
  background-color: ${theme.colors.gray};
  color: ${theme.colors.black};
  padding: 0.42vw 0.63vw;
  text-align: center;
  width: 16.67vw;
  border-radius: 0.1vw;
  left: -1vw;
  top: 2.3vw;
  white-space: break-spaces;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    padding: 1vw 1.56vw;
    width: 41.72vw;
    top: 5.5vw;
    left: -39.4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 2.13vw 3.2vw;
    width: 72vw;
    top: 10vw;
    left: -57vw;
  }
`;

const Triangle = styled(IconImage)`
  transform: rotateX(180deg);
  position: absolute;
  top: -0.52vw;
  width: 1.46vw;
  height: 0.63vw;
  left: 0.85vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    left: unset;
    right: 3.26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 16.5vw;
    top: -1vw;
    width: 4vw;
    height: 2vw;
  }
`;

const InfoBlock = styled.div`
  position: relative;
  z-index: 6;
  :hover ${HoverInfoBlock} {
    display: block;
  }
`;

const TShirtImg = styled.div`
  position: absolute;
  top: 3.85vw;
  right: 20.05vw;
  height: 23.59vw;
  width: 18.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 43.02vw;
    width: 35vw;
    top: 5.22vw;
    right: 50.85vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 6.67vw;
    right: 43.2vw;
    height: 54.67vw;
    width: 43vw;
  }
`;

const TshirtSign = styled.div<{ length: number }>`
  position: absolute;
  top: 4.85vw;
  left: 50%;
  transform: translateX(-50%);
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: ${({ length }) => (length > 11 ? (length > 18 ? "0.83" : "0.9375vw") : "1.25vw")};
  letter-spacing: -0.165px;
  text-transform: uppercase;
  text-align: center;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 8.22vw;
    font-size: ${({ length }) => (length > 11 ? (length > 18 ? "1vw" : "1.34vw") : "2.13vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 10.67vw;
    font-size: ${({ length }) => (length > 11 ? (length > 18 ? "1.4vw" : "4.8vw") : "3vw")};
  }
`;

const TShirtBtn = styled(CustomButton)`
  padding: 0.73vw 1.25vw;
  display: flex;
  position: absolute;
  top: 2.08vw;
  right: 8.75vw;
  user-select: none;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 3.13vw;
    padding: 1.83vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 4.27vw;
    top: 4.27vw;
    padding: 1.6vw 3.2vw;
  }

  & > span {
    margin-left: 0.42vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-left: 1.04vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-left: 2.13vw;
    }
  }
`;

const SubstrBlock = styled.div`
  font-family: FCSM Text, sans-serif;
  color: ${theme.colors.white};
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("/images/profile/sub.png");
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  box-sizing: border-box;
  right: 8.75vw;
  top: 19.75vw;
  padding-left: 1.25vw;
  width: 17.71vw;
  height: 7.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 3.13vw;
    top: 32.59vw;
    padding-left: 3.13vw;
    width: 44.33vw;
    height: 18.77vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 4.27vw;
    top: 42.13vw;
    padding: 2.13vw;
    width: 44.33vw;
    height: 19.73vw;
  }
`;

const Substr = styled.span`
  font-weight: 700;
  font-size: 1.67vw;
  margin-bottom: 2.29vw;
  z-index: 2;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    margin-bottom: 5.74vw;
  }
`;

const Season = styled.span`
  font-size: 0.83vw;
  font-weight: 500;
  z-index: 2;
  max-width: 8vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    max-width: 20vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.09vw;
  }
`;

const NavBarContainer = styled(ContainerContent)`
  a {
    color: ${({ theme }) => theme.colors.white_black};

    :hover {
      border-bottom-color: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;
const ImgContainer = styled.div`
  position: absolute;
  width: 6.51vw;
  height: 6.09vw;
  right: 0.73vw;
  top: 0.83vw;
  bottom: 0.16vw;
  z-index: 1;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 16.3vw;
    height: 15.25vw;
    right: 1.83vw;
    top: 2.09vw;
    bottom: 0.3vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 14.13vw;
    height: 15.47vw;
    right: 2.13vw;
    top: 2.13vw;
    bottom: 2.13vw;
  }
`;

const IconInfo = styled(InfoIcon)`
  width: 1.25vw;
  height: 1.25vw;
  display: block;

  path {
    stroke: ${({ theme }) => theme.colors.white_grayDark1};
  }
  path:nth-of-type(3) {
    fill: ${({ theme }) => theme.colors.white_grayDark1};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
  }
`;
const BarCodeBlock = styled.div`
  cursor: pointer;
  width: 2.5vw;
  height: 1.98vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.22vw;
    height: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 8.53vw;
    height: 6.93vw;
  }
`;
