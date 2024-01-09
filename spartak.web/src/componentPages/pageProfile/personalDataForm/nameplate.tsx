import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IUser } from "../../../api/dto/IProfileMock";
import { userRepository } from "../../../api/userRepository";
import { IconPlus } from "../../../assets/icon/iconPlus";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { BannerBackground } from "../../../components/containers/containerBanner";
import { DataContext } from "../../../core/dataProvider";
import { NameplateModal } from "./nameplateModal";
import { NameplateModalSuccess } from "./nameplateModalSuccess";

export const Nameplate = () => {
  const { locale = "ru" } = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSuccessIsOpen, setModalSuccessIsOpen] = useState(false);
  const { setUser, setLoading } = useContext(DataContext);

  const onSubmit = async () => {
    setLoading(true);
    const user = await userRepository.fetchFullUserInfo().catch(() => ({} as IUser));
    setUser(user);
    setLoading(false);
  };

  return (
    <>
      <Container>
        <BannerBackground
          srcL={"/images/banners/nameplate/bgL_v1.0.0.png"}
          srcM={"/images/banners/nameplate/bgM_v1.0.0.png"}
          srcS={"/images/banners/nameplate/bgS_v1.0.0.png"}
        />

        <ContentBanner>
          <Title>{lang[locale].bannerInfo.nameplate.title}</Title>
          <Description>{lang[locale].bannerInfo.nameplate.description}</Description>
          <ButtonContainer>
            <ButtonCreate type="opacity" onClick={() => setModalIsOpen(true)}>
              <IconPlus rotate="0" />
              {lang[locale].bannerInfo.nameplate.buttonCreate}
            </ButtonCreate>
            <Link href="/more/loyalty/chairPlotting" passHref>
              <ButtonMore type="opacity">{lang[locale].bannerInfo.nameplate.buttonMore}</ButtonMore>
            </Link>
          </ButtonContainer>
        </ContentBanner>
      </Container>

      {modalIsOpen && (
        <NameplateModal
          onClose={() => setModalIsOpen(false)}
          openNextModal={() => {
            setModalSuccessIsOpen(true);
          }}
        />
      )}
      {modalSuccessIsOpen && (
        <NameplateModalSuccess
          onClose={() => {
            setModalSuccessIsOpen(false);
            onSubmit();
          }}
        />
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 2.08vw;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 5.22vw;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw;
    margin-bottom: 10.67vw;
  }
`;

const ContentBanner = styled.div`
  color: ${theme.colors.white};
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 1.67vw;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-weight: 500;
    font-size: 3.13vw;
    margin: 0 0 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 4.8vw;
    margin: 0 0 4.27vw;
  }
`;

const Description = styled.p`
  margin: 0 0 1.25vw;
  font-weight: 500;
  font-size: 0.94vw;
  width: 50%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    color: ${theme.colors.grayLight};
    font-size: 2.09vw;
    width: 65%;
    margin: 0 0 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    width: 100%;
    margin: 0 0 4.27vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ButtonCreate = styled(CustomButton)`
  font-size: 0.73vw;
  width: fit-content;
  background-color: "none";
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.white};

  svg {
    margin-right: 0.42vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    svg {
      margin-right: 1.04vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    svg {
      margin-right: 2.13vw;
    }
  }
`;

const ButtonMore = styled.a`
  font-size: 0.73vw;
  font-weight: 600;
  border: none;
  color: ${theme.colors.white};
  text-decoration: none;
  margin-left: 1.25vw;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-left: 3.13vw;
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: 0;
    margin-top: 4.27vw;
    font-size: 3.73vw;
  }
`;
