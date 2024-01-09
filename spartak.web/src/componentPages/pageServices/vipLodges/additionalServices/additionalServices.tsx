import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IServicesVip } from "../../../../api/dto/IServicesVip";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { NextImage } from "../../../../ui/nextImage/nextImage";

export interface IProps {
  additionalServices?: IServicesVip["additionalServices"];
}

export const AdditionalServices = (props: IProps) => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return props.additionalServices?.length ? (
    <StyledContainer>
      <Title>{t.pageVipLodge.additionalServices.title}</Title>

      <AdditionalOptions>
        {props.additionalServices?.map((elem, index) => (
          <div key={`${index}`}>
            <ImageContainer>
              <NextImage src={getLocalValue(elem.img, locale)} alt={`Picture + ${index}`} />
            </ImageContainer>

            <OptionsDescription>{getLocalValue(elem.title, locale)}</OptionsDescription>
          </div>
        ))}
      </AdditionalOptions>
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled(ContainerContent)`
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white_black};
`;

const Title = styled.h1`
  display: flex;
  margin: 0;
  padding: 5.21vw 0 4.17vw;
  width: 100%;
  justify-content: left;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding: 10.43vw 0 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding: 10.67vw 0 4.27vw;
  }
`;

const AdditionalOptions = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 5vw;
  }
`;

const OptionsDescription = styled.p`
  margin: 0;
  padding-top: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-top: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-top: 4.27vw;
  }
`;
const ImageContainer = styled.div`
  width: 3.96vw;
  height: 3.96vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 9.91vw;
    height: 9.91vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 20.27vw;
    height: 20.27vw;
  }
`;

