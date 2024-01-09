export type IThemeColors =
  | "red"
  | "redOpacity"
  | "fireEngineRedOpacity"
  | "redLightest"
  | "redDark"
  | "gold"
  | "blackRed"
  | "blueRed"
  | "black"
  | "blackLight"
  | "blackOpacity"
  | "grayDark"
  | "grayDark1"
  | "gray"
  | "gray1"
  | "grayLight"
  | "grayLightest"
  | "white"
  | "white1"
  | "yellow"
  | "win1"
  | "pink"
  | "green"
  | "greenOpacity"
  | "green2"
  | "lightBlue"
  | "brinkPink"
  | "redLight"
  | "bondiBlue"
  | "fireEngineRed"
  | "carnationPink"
  | "whiteGray";

export const theme = {
  rubberSize: {
    desktop: "1199px",
    tablet: "767px",
    phone: "375px",
  },
  rubberMinSize: {
    minDesktop: "1200px",
  },
  colors: {
    red: "#CC122D",
    redOpacity: "#cc122d10",
    fireEngineRedOpacity: "#c8122d19",
    redLightest: "#FFEEF1",
    redDark: "#A2141B",
    gold: "#C5B783",
    blackRed: "#201118",
    blueRed: "#2C222C",
    black: "#0D1116",
    blackLight: "#1B232C",
    blackOpacity: "#ffffff33",
    grayDark: "#5C6168",
    grayDark1: "#8696A5",
    gray: "#A5ACB8",
    gray1: "#C1C8D5",
    grayLight: "#DCE1EA",
    grayLightest: "#F9FAFB",
    white: "#FFFFFF",
    white1: "#F1F4F6",
    yellow: "#FFBD3E",
    win1: "#FF6A13",
    pink: "#F05A4F",
    green: "#12CC54",
    greenOpacity: "#05C84A1A",
    green2: "#05C84A",
    lightBlue: "#F6F8FA",
    brinkPink: "#F6657A",
    redLight: "#FFC7D1",
    bondiBlue: "#008AB6",
    fireEngineRed: "#C8122D",
    carnationPink: "#FFA2B2",
    whiteGray: "#F1F4F6",
  },
  gradients: {
    first: "linear-gradient(179.21deg, rgba(13, 17, 22, 0) 0.69%, #0d1116 99.33%)",
    pastMatch: "linear-gradient(179.21deg, rgba(13, 17, 22, 0.3) 0.69%, #0d1116 99.33%)",
    player: "linear-gradient(180deg, rgba(13, 17, 22, 0) 28.7%, #0D1116 100%)",
    media:
      "linear-gradient(359.63deg, rgba(12, 18, 26, 0.8) 13.97%, rgba(14, 35, 86, 0.2) 69.27%, rgba(0, 0, 0, 0) 102.42%)",
  },
  font: { winline: "FCSM Text,sans-serif" },
};

export const darkTheme = {
  gradients: {
    none_playerRed: "unset",
    player_playerRed: "linear-gradient(180deg, rgba(13, 17, 22, 0) 28.7%, #0D1116 100%)",
    player_academy: "linear-gradient(180deg, rgba(13, 17, 22, 0) 28.7%, #0D1116 100%)",
    player_none: "linear-gradient(180deg, rgba(13, 17, 22, 0) 28.7%, #0D1116 100%)",
    player_white: "linear-gradient(180deg, rgba(13, 17, 22, 0) 28.7%, #0D1116 100%)",
    hoverBtn: "linear-gradient(180.21deg, rgba(13, 17, 22, 0) 0.18%, #0d1116 73.66%, rgba(0, 0, 0, 0) 99.82%);",
    field_none: "linear-gradient(90deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 100%)",
    section_none: "linear-gradient(0deg, #0d1116ed 0%, #0d11163a 85%)",
    graduate: "linear-gradient(270deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 95.31%)",
    academyEnter_none: " linear-gradient(89.51deg, #0D1116 0.43%, rgba(13, 17, 22, 0) 99.57%)",
    oldPeople: "linear-gradient(89.11deg,rgba(13,17,22,0) 0.77%,#0d1116 95.31%)",
  },
  colors: {
    black_red: "#0D1116",
    black_redDark: "#0D1116",
    black_white: "#0D1116",
    black_gray1: "#0D1116",
    black_whiteGray: "#0D1116",

    blackLight_whiteGray: "#1B232C",
    blackLight_blackRed: "#1B232C",
    blackLight_red: "#1B232C",
    blackLight_white: "#1B232C",
    blackLight_white1: "#1B232C",
    blackLight_grayDark1: "#1B232C",
    blackLight_gray1: "#1B232C",
    blackLight_grayLightest: "#1B232C",
    blackLight_black: "#1B232C",
    blackLight_redOpacity: "#1B232C",
    blackLight_lightBlue: "#1B232C",

    gray1_grayDark: "#C1C8D5",

    grayLight_grayDark1: "#DCE1EA",
    grayLight_grayDark: "#DCE1EA",
    grayLight_gray1: "#DCE1EA",
    grayLight_white: "#DCE1EA",
    grayLight_opacity: "#DCE1EA",
    grayLight_black: "#DCE1EA",
    grayLight_red: "#DCE1EA",

    grayDark_redDark: "#5C6168",
    grayDark_gray1: "#5C6168",
    grayDark_red: "#5C6168",
    grayDark_whiteOpacity: "#5C6168",
    grayDark_white: "#5C6168",
    grayDark_white1: "#5C6168",
    grayDark_whiteGray: "#5C6168",
    grayDark_carnationPink: "#5C6168",
    grayDark_black: "#5C6168",
    grayDark_grayLight: "#5C6168",
    grayDark_grayDark1: "#5C6168",

    grayDark1_grayDark: "#8696A5",
    grayDark1_white: "#8696A5",

    gray_white: "#A5ACB8",
    gray_white1: "#A5ACB8",
    gray_black: "#A5ACB8",
    gray_red: "#A5ACB8",
    gray_redDark: "#A5ACB8",
    gray_grayDark1: "#A5ACB8",
    gray_gray1: "#A5ACB8",
    gray_grayDark: "#A5ACB8",
    gray_blackLight: "#A5ACB8",

    red_white: "#CC122D",
    red_carnationPink: "#CC122D",
    red_black: "#CC122D",

    white_grayDark: "#FFFFFF",
    white_grayDark1: "#FFFFFF",
    white_black: "#FFFFFF",
    white_red: "#FFFFFF",
    white_whiteGray: "#FFFFFF",
    white_gray1: "#FFFFFF",

    redOpacity_fireEngineRedOpacity: "#cc122d10",

    redLightest_black: "#FFEEF1",

    redLight_grayDark1: "#FFC7D1",

    blackRed_grayDark1: "#201118",
    blackRed_red: "#201118",
    blackRed_whiteGray: "#201118",

    red_none: "#CC122D",

    none_red: "none",
    none_white: "none",
    none_whiteGray: "none",
    none_black: "none",
    none_invert: "none",

    lukoil: "#c71623",
    lukoil1: "#fff",
  },
  shadow: {
    none_gray: "",
  },
};

export const lightTheme: typeof darkTheme = {
  gradients: {
    none_playerRed: "linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(200, 18, 45, 0.6) 100%)",
    player_playerRed: "linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, #C8122D 100%)",
    player_academy: "linear-gradient(180deg,#0d111600 0.18%,#7777774d 73.66%,#c5c5c500 99.82%)",
    player_none: "",
    player_white: "linear-gradient(180deg, rgba(255, 255, 255, 0) 69.11%, #FFFFFF 100%)",
    hoverBtn: "radial-gradient(circle,#b9b9b910 0%,#ffffff00 50%)",
    field_none: "none",
    section_none: "none",
    graduate: "none",
    academyEnter_none: "none",
    oldPeople: "linear-gradient(89.71deg, rgba(255, 255, 255, 0) 0.26%, #FFFFFF 99.74%);",
  },
  colors: {
    black_white: "#FFFFFF",
    black_red: "#C8122D",
    black_redDark: "#A2141B",
    black_gray1: "#C1C8D5",
    black_whiteGray: "#F1F4F6",
    blackLight_black: "#0D1116",

    blackLight_whiteGray: "#F1F4F6",
    blackLight_blackRed: "#A2141B",
    blackLight_red: "#CC122D",
    blackLight_white: "#FFFFFF",
    blackLight_white1: "#F1F4F6",
    blackLight_grayDark1: "#8696A5",
    blackLight_gray1: "#C1C8D5",
    blackLight_grayLightest: "#F9FAFB",
    blackLight_redOpacity: "#cc122d10",
    blackLight_lightBlue: "#F6F8FA",

    gray1_grayDark: "#5C6168",

    grayLight_grayDark1: "#8696A5",
    grayLight_grayDark: "#5C6168",
    grayLight_gray1: "#C1C8D5",
    grayLight_white: "#FFFFFF",
    grayLight_opacity: "#FFFFFF00",
    grayLight_black: "#0D1116",
    grayLight_red: "#CC122D",

    grayDark_redDark: "#A2141B",
    grayDark_gray1: "#C1C8D5",
    grayDark_red: "#CC122D",
    grayDark_whiteOpacity: "#ffffff7f;",
    grayDark_white: "#FFFFFF",
    grayDark_white1: "#F1F4F6",
    grayDark_whiteGray: "#F1F4F6",
    grayDark_carnationPink: "#FFA2B2",
    grayDark_black: "#0D1116",
    grayDark_grayLight: "#DCE1EA",
    grayDark_grayDark1: "#8696A5",

    grayDark1_grayDark: "#5C6168",
    grayDark1_white: "#FFFFFF",

    gray_white: "#FFFFFF",
    gray_white1: "#F1F4F6",
    gray_black: "#0D1116",
    gray_red: "#CC122D",
    gray_redDark: "#C8122D",
    gray_grayDark1: "#8696A5",
    gray_gray1: "#C1C8D5",
    gray_grayDark: "#5C6168",
    gray_blackLight: "#1B232C",

    red_white: "#FFFFFF",
    red_carnationPink: "#FFA2B2",
    red_black: "#0D1116",

    white_grayDark: "#5C6168",
    white_grayDark1: "#8696A5",
    white_red: "#C8122D",
    white_black: "#0D1116",
    white_whiteGray: "#F1F4F6",
    white_gray1: "#C1C8D5",

    redOpacity_fireEngineRedOpacity: "#c8122d19",

    redLightest_black: "#0D1116",

    redLight_grayDark1: "#8696A5",

    red_none: "unset",

    blackRed_grayDark1: "#8696A5",
    blackRed_red: "#CC122D",
    blackRed_whiteGray: "#F1F4F6",

    none_red: "#CC122D",
    none_white: "#FFFFFF",
    none_whiteGray: "#F1F4F6",
    none_black: "#0D1116",
    none_invert: "invert(100%)",

    lukoil: "#fff",
    lukoil1: "#c71623",
  },
  shadow: {
    none_gray: "1px 4px 20px #69849d26",
  },
};
