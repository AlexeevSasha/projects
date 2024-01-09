import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { blankSitesLinks } from "../../../assets/constants/blankSitesLinks";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

export const ApplicationBlock = () => {
  const { locale = "ru" } = useRouter();

  return (
    <BudgetsBlock>
      <ColumnTitle>{lang[locale].footer.ourApps}</ColumnTitle>
      <ApplicationIcons>
        <Application target="_blank" href={blankSitesLinks.googlePlay}>
          <NextImage src={"/images/footer/PlayMarket_v1.0.0.png"} alt="Play Market" />
        </Application>
        <Application target="_blank" href={blankSitesLinks.appleStore}>
          <NextImage src={"/images/footer/AppStore_v1.0.0.png"} alt="AppStore" />
        </Application>
      </ApplicationIcons>
    </BudgetsBlock>
  );
};

const BudgetsBlock = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 3.65vw;
    justify-content: center;
    width: 100%;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 3.2vw;
  }
`;

const ApplicationIcons = styled.span`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  justify-content: start;
  gap: 0.42vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 3.2vw;
  }
`;

const ColumnTitle = styled.h2`
  margin: 0;
  padding-bottom: 0.83vw;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding-bottom: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding-bottom: 3.2vw;
    white-space: nowrap;
  }
`;
const Application = styled.a`
  cursor: pointer;
  width: 8.44vw;
  height: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 21.12vw;
    height: 6.26vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 43.2vw;
    height: 12.8vw;
  }
`;
