import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  hashed: false,
  components: {
    Layout: {
      headerPadding: '0px 24px',
      headerBg: '#ffffff',
      headerHeight: 74,
    },
    Tabs: {
      inkBarColor: '#01A6FF',
    },
    Button: {
      fontSize: 16,
      paddingContentHorizontal: 16,
      paddingContentVertical: 8,
      controlHeight: 42,
      borderRadius: 12,
      borderRadiusLG: 12,
    },
    Tag: {
      colorSuccessBg: '#52C41A',
    },
  },

  token: {
    colorPrimary: '#214FE2',
    colorPrimaryBg: '#E5FFFD',
    colorPrimaryBgHover: '#F7FFFE',
    colorTextBase: '#001339',
    colorTextSecondary: '#596072',
    colorSuccess: '#70d468',
    colorError: '#ff4545',
    colorErrorBg: '#FFF6F6',
    colorSuccessBg: '#F1FBF0',
    colorBgLayout: '#F8F8F8',
    cyan6: '#08979c',
    geekblue6: '#6484eb',
    colorWhite: '#ffffff',
    controlHeight: 40,
    borderRadius: 8,
    borderRadiusLG: 24,
    fontSizeIcon: 24,
    fontWeightStrong: 700,
    fontSizeHeading1: 40,
    fontSizeHeading2: 32,
    fontSizeHeading3: 28,
    fontSizeHeading4: 24,
    fontSizeHeading5: 20,
    lineHeightHeading1: 1.1,
    lineHeightHeading2: 1.125,
    lineHeightHeading3: 1.14286,
    lineHeightHeading4: 1.3333333,
    lineHeightHeading5: 1.4,
    fontFamily: `Pragmatica, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    boxShadow: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.16))',
  },
};
