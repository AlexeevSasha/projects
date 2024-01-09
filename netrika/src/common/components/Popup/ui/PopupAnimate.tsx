import styled, { css } from "styled-components";
import { IDrawer } from "../../../interfaces/popup/IModal";

export const ModalAnimate = styled.div<{ isClosed: boolean }>`
  animation: openPopupModal 0.3s ease-out;

  ${({ isClosed }) =>
    isClosed &&
    css`
      animation: closePopupModal 0.3s ease-out forwards;
    `}
`;

export const DrawerAnimate = styled.div<{ position: IDrawer["position"]; isClosed: boolean }>`
  ${({ position }) => {
    switch (position) {
      case "right":
        return css`
          left: auto !important;
          right: 0 !important;
          animation: openRightDrawer 0.3s ease-out;
        `;
      case "left":
        return css`
          left: 0 !important;
          animation: openLeftDrawer 0.3s ease-out;
        `;
      case "top":
        return css`
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: fit-content !important;
          max-height: calc(100vh - 100px) !important;
          animation: openTopDrawer 0.3s ease-out;
        `;
      case "bottom":
        return css`
          left: 0 !important;
          bottom: 0 !important;
          top: auto !important;
          width: 100% !important;
          height: fit-content !important;
          max-height: calc(100vh - 100px) !important;
          animation: openBottomDrawer 0.3s ease-out;
        `;

      default:
        return "";
    }
  }}

  ${({ isClosed, position }) => {
    if (!isClosed) return "";

    switch (position) {
      case "right":
        return css`
          animation: closeRightDrawer 0.3s ease-in-out;
        `;
      case "left":
        return css`
          animation: closeLeftDrawer 0.3s ease-in-out;
        `;
      case "top":
        return css`
          animation: closeTopDrawer 0.3s ease-in-out;
        `;
      case "bottom":
        return css`
          animation: closeBottomDrawer 0.3s ease-in-out;
        `;

      default:
        return "";
    }
  }}
`;

export const PopupBackdrop = styled.div<{ isClosed: boolean }>`
  animation: openPopupBackdrop 0.3s ease-in-out;
  opacity: 0.4;
  width: inherit;
  height: inherit;
  background: black;

  ${({ isClosed }) =>
    isClosed &&
    css`
      animation: closePopupBackdrop 0.3s ease-in-out forwards;
    `}
`;
