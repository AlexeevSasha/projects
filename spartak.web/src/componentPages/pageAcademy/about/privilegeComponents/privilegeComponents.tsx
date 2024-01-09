import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { advantageInfo } from "./advantageInfo";

export const PrivilegeComponents = () => {
  const { locale = "ru" } = useRouter();
  return (
    <AdvantageContainer>
      <AdvantageTitle>{lang[locale].academy.ourTeamIs}</AdvantageTitle>

      <AdvantagesBlock>
        {advantageInfo.map((elem, index) => (
          <Container key={index}>
            <ContainerImage>
              <NextImage src={`/images/academy/index/${elem.icon}`} alt={getLocalValue(elem.title, locale)} />
            </ContainerImage>

            <Title dangerouslySetInnerHTML={{ __html: getLocalValue(elem.title, locale) }} />

            {/*<Text>{getLocalValue(elem.text, locale)}</Text>*/}
          </Container>
        ))}
      </AdvantagesBlock>
    </AdvantageContainer>
  );
};

const AdvantageContainer = styled(ContainerContent)`
  display: flex;
  flex-direction: column;
  align-items: unset;
  color: ${({ theme }) => theme.colors.white_black};
  margin: 6.25vw auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.21vw auto;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto;
  }
`;

const AdvantageTitle = styled.p`
  margin: 0 0 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 3.23vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    margin-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin-bottom: 4.27vw;
  }
`;

const AdvantagesBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  grid-column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3.2vw;
    grid-row-gap: 4.27vw;
  }
`;

const ContainerImage = styled.div`
  width: 5.21vw;
  height: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 6.52vw;
    height: 6.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 13.33vw;
    height: 13.33vw;
  }
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grayDark_gray1};
  padding: 2.08vw 1.25vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw 2.13vw;
  }
`;

const Title = styled.h3`
  margin: 1.25vw 0 0;
  font-size: 1.67vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 2.09vw 0 0;
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 3.2vw 0 0;
    font-size: 4.27vw;
  }
`;
