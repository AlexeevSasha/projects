import { useRouter } from "next/router";
import styled from "styled-components";
import { LocaleType } from "../../../api/dto/LocaleType";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { RedInfoBanner } from "../../redInfoBanner/redInfoBanner";

interface IProps {
  text?: LocaleType;
  img?: LocaleType;
}

export const TourAdvertisement = ({ text, img }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <RedInfoBanner hideMargin>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: getLocalValue(text, locale) }} />
        <ImgContainer>
          <NextImage src={getLocalValue(img, locale) ?? ""} alt="дополнительная информация по турам Спартак" />
        </ImgContainer>
      </Container>
    </RedInfoBanner>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  padding: 0.83vw 2.08vw;
  grid-column-gap: 11.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 4.17vw;
    grid-column-gap: 5.22vw;
    grid-template-columns: 1fr 33.9vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    grid-template-columns: 1fr;
  }
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 1.67vw;
  margin: 0;
  word-break: break-word;
  p {
    margin: 0;
  }
  a {
    color: ${theme.colors.fireEngineRed};
    text-decoration: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-weight: 500;
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const ImgContainer = styled.div`
  height: 11.77vw;
  width: 21.56vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 22.16vw;
    width: 33.9vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
