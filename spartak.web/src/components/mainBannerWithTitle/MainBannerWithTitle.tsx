import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IconPhone } from "../../assets/icon/iconPhone";
import { theme } from "../../assets/theme/theme";
import { scrollToElement } from "../../helpers/scrollToElement/scrollToElement";
import { CustomButton } from "../buttons/customButton";
import { ContainerWithBackgroundImg } from "../containers/containerWithBackgroundImg";

interface IProps {
  title?: string;
  banner: string;
  smallTitle?: boolean;
  withButton?: boolean;
  className?: string;
}

export default function MainBannerWithTitle(props: IProps) {
  const { locale = "ru", pathname, push } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);
  const forFamilySector = pathname.includes("familySector");
  const onButton = forFamilySector
    ? () => push(`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches`)
    : scrollToElement;
  return (
    <>
      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        position={"center"}
        src={props.banner}
        className={props.className}
      >
        {props.title ? (
          <Title
            withButton={props.withButton}
            smallTitle={props.smallTitle}
            dangerouslySetInnerHTML={{ __html: props.title }}
          />
        ) : (
          <EmptyTitle />
        )}
        {props.withButton && (
          <ButtonContainer>
            <CustomButton type={"red"} onClick={onButton}>
              {!forFamilySector && <IconPhone />}
              <p>{forFamilySector ? lang[locale].button.buyTicket : t.button.contactUs}</p>
            </CustomButton>
          </ButtonContainer>
        )}
      </ContainerWithBackgroundImg>
    </>
  );
}

const Title = styled.h1<{ smallTitle?: boolean; withButton?: boolean }>`
  position: relative;
  display: flex;
  align-items: end;
  color: ${theme.colors.white};
  z-index: 10;
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  font-size: ${(props) => (props.smallTitle ? "2.71vw" : "4.58vw")};
  padding: ${(props) => (props.withButton ? "15.73vw 0 8.75vw 8.75vw" : "20.31vw 0 4.17vw 8.65vw")};
  margin: 0;
  width: 55.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: ${(props) => (props.smallTitle ? "4.17vw" : "9.39vw")};
    padding: 20.86vw 3.13vw 13.04vw;
    width: inherit;
    font-weight: 700;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: ${(props) => (props.smallTitle ? "8.53vw" : "10.67vw")};
    padding: ${(props) => (props.withButton ? "112px 51px 88px 16px" : "42.67vw 4.27vw 10.67vw")};
    width: 90%;
  }
`;

const EmptyTitle = styled.div`
  height: 31.25vw;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  div {
    margin: 0 0 4.17vw 8.75vw;
    padding: 0 1.2vw;
    gap: 0.63vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin: 0 0 2.61vw 3.13vw;
      padding: 0 3.2vw 0;
      gap: 1.04vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin: 0 4.27vw 5.33vw 4.27vw;
      gap: 2.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: -webkit-fill-available;
  }
`;
