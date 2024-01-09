import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { DescriptionFromCMS } from "../../../../ui/descriptionFromCMS/descriptionFromCMS";
import { IClubHistory } from "../../../../api/dto/IClubHistory";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { NextImage } from "../../../../ui/nextImage/nextImage";

interface IProps {
  century: IClubHistory["anniversaryOfCreation"];
}

export const CenturySparBlock = (props: IProps) => {
  const { locale } = useRouter();

  return props.century?.title ? (
    <Container>
      <InfoBlock>
        <DescriptionTitle>{getLocalValue(props.century?.title, locale)}</DescriptionTitle>
        <DescriptionFromCMS>{getLocalValue(props.century?.description, locale)}</DescriptionFromCMS>
      </InfoBlock>
      <LogoBlock>
        {props.century?.firstImg ? (
          <SparLogoContainer>
            <NextImage src={props.century?.firstImg} alt={getLocalValue(props.century?.title, locale)} />
          </SparLogoContainer>
        ) : null}
        {props.century?.secondImg ? (
          <CenturyLogoContainer>
            <NextImage
              src={props.century?.secondImg}
              alt={getLocalValue(props.century?.title, locale) + "_ubiley_logo"}
            />
          </CenturyLogoContainer>
        ) : null}
      </LogoBlock>
    </Container>
  ) : (
    <></>
  );
};

const Container = styled.section`
  display: flex;
  gap: 5.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
  }
`;

const InfoBlock = styled.p`
  width: 38.54vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const DescriptionTitle = styled.span`
  display: block;
  margin: 0;
  font-size: 1.67vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: Jost-Blod, sans-serif;
  padding-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 3.13vw;
    font-weight: 500;
    padding-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding-bottom: 4.27vw;
  }
`;

const LogoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  width: 38.13vw;
  height: 6.88vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 4vw;
    width: 100%;
    height: 31.94vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    height: 65.33vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    height: 65.33vw;
  }
`;

const SparLogoContainer = styled.div`
  height: 6.88vw;
  width: 14.58vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.37vw;
    height: 31.94vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    height: 65.33vw;
  }
`;

const CenturyLogoContainer = styled(SparLogoContainer)`  
  width: 16.61vw;
  height: 6.88vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.24vw;
    height: 31.94vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    height: 65.33vw;
  }
`;
