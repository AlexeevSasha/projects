import React, { useContext } from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { RedInfoBanner } from "../../redInfoBanner/redInfoBanner";
import { useRouter } from "next/router";
import { LocaleType } from "../../../api/dto/LocaleType";
import { ThemeContext } from "../../../core/themeProvider";

interface IProps {
  redBannerData: any;
}

export const RedBanner = (props: IProps) => {
  const { locale } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <RedInfoBanner>
      <InfoText isDarkTheme={isDarkTheme}>
        {/* {props.redBannerData.map((elem, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: getLocalValue(elem, locale) }} />
        ))} */}
        <div
          key={0}
          dangerouslySetInnerHTML={{
            __html: getLocalValue(props.redBannerData.text1 ?? props.redBannerData[0], locale),
          }}
        />
        <div
          key={1}
          dangerouslySetInnerHTML={{
            __html: getLocalValue(props.redBannerData.text2 ?? props.redBannerData[1], locale),
          }}
        />
      </InfoText>
    </RedInfoBanner>
  );
};

const InfoText = styled.div<{ isDarkTheme: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
  padding: 2.08vw;
  grid-column-gap: 3.54vw;
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${theme.colors.fireEngineRed};

    &.button-opacity {
      text-decoration: none;
      border: 1px solid ${theme.colors.white};
      color: ${theme.colors.white};
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 0.42vw;
      align-items: center;
      height: fit-content;
      width: fit-content;
      justify-content: center;
      font-family: "FCSM Text", sans-serif;
      font-size: 0.73vw;
      font-weight: 600;
      text-transform: uppercase;
      padding: 0.78vw 1.25vw;
      cursor: pointer;
      transition: 0.2s;

      :hover {
        opacity: 0.8;
      }

      svg {
        width: 1.04vw;
        height: 1.04vw;
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    gap: 3.13vw;
    padding: 5.22vw;
    a {
      text-underline-offset: 0.52vw;

      &.button-opacity {
        font-size: 1.83vw;
        padding: 1.96vw 3.13vw;
        grid-column-gap: 1.3vw;

        svg {
          height: 2.61vw;
          width: 2.61vw;
        }
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
    padding: 4.27vw;
    a {
      text-underline-offset: 1.07vw;

      &.button-opacity {
        font-size: 3.73vw;
        padding: 2.93vw 4.27vw;
        grid-column-gap: 2.67vw;

        svg {
          height: 5.33vw;
          width: 5.33vw;
        }
      }
    }
  }
`;
