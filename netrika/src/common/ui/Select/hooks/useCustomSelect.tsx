import { theme } from "../../../styles/theme";
import { useMemo } from "react";

interface IProps {
  isError?: boolean;
  isRelative?: boolean;
  isDisabled?: boolean;
  isLongSingle?: boolean;
  topMenu?: boolean;
}

export const useCustomSelect = (props: IProps) => {
  return useMemo(
    () => ({
      control: (base: any, state: any) => ({
        ...base,
        "background": state.isDisabled ? "rgb(241, 241, 241)" : theme.colors.white,
        "boxShadow": state.isFocused ? `0 0 ${theme.colors.green}` : `0  ${theme.colors.gray}`,
        "border": state.isFocused
          ? `1px solid ${theme.colors.green}`
          : props.isError && !state.value
          ? `1px solid ${theme.colors.lightRed}`
          : `1px solid ${theme.colors.gray}`,
        "borderRadius": "19px",
        "&:focus": {
          border: `1px solid ${theme.colors.green}`,
          boxShadow: `0 0 0 ${theme.colors.green}`,
        },
        "&:active": {
          border: `1px solid ${theme.colors.green}`,
          boxShadow: `0 0 0 ${theme.colors.green}`,
        },
        "&:hover": {
          boxShadow: "none",
        },
      }),
      option: (base: any, state: any) => ({
        ...base,
        "height": "100%",
        "color": state.isSelected ? `${theme.colors.white}` : `${theme.colors.black}`,
        "fontWeight": "400",
        "padding": "7.5px 15px",
        "background": state.isSelected ? `${theme.colors.green}` : `${theme.colors.white}`,

        "&:hover": {
          color: `${theme.colors.white}`,
          background: `${theme.colors.green}`,
        },
      }),
      multiValueLabel: (base: any) => ({
        ...base,
        height: "100%",
        color: `${theme.colors.white}`,
        background: `${theme.colors.green}`,
        fontWeight: "400",
        whiteSpace: "normal",
        padding: "4px",

        paddingRight: "10px",
      }),
      singleValue: (base: any) => ({
        ...base,
        whiteSpace: props.isLongSingle ? "normal" : "nowrap",
        color: theme.colors.black,
      }),
      multiValueRemove: (base: any) => ({
        ...base,
        "display": props.isDisabled ? "none" : "flex",
        "color": theme.colors.white,
        "background": theme.colors.lightRed,
        "borderLeft": `1px solid ${theme.colors.white}`,
        "borderRadius": 0,
        "padding": "4px",
        "&:hover": {
          cursor: "pointer",
        },
      }),
      multiValue: (base: any) => ({
        ...base,
        color: theme.colors.white,
        background: theme.colors.green,
        borderRadius: "5px",
        whiteSpace: "normal",
        zIndex: "1002",
      }),
      input: (base: any) => ({
        ...base,
        "&:hover": {
          cursor: "text",
        },
      }),
      menu: (base: any) => ({
        ...base,
        "left": "1px",
        "position": props.isRelative ? "relative" : "absolute",
        "top": props.topMenu ? "auto" : base.top,
        "bottom": props.topMenu ? "100%" : base.bottom,
        "z-index": "99999",
        "display": "block",
      }),
      placeholder: (base: any) => ({
        ...base,
        color: props.isError ? `${theme.colors.lightRed}` : "rgba(96, 120, 144, 0.5)",
        opacity: 1,
      }),
    }),
    [props]
  );
};
