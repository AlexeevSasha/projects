import { LazyExoticComponent } from "react";

export enum ModalNames {
  ALERT_MODAL = "ALERT_MODAL",
  CONFIRM_MODAL = "CONFIRM_MODAL",
  POPUP_MODAL = "POPUP_MODAL",
  POPUP_MODAL_MOBILE = "POPUP_MODAL_MOBILE",
  CATALOG_MODAL = "CATALOG_MODAL",
  FILTER_MODAL = "FILTER_MODAL",
  PRODUCT_CARD_MODAL = "PRODUCT_CARD_MODAL",
}

export interface ModalProps {
  onClose?: (modalNmae: string) => void;
  callBack?: (prop?: string) => void;
  [key: string]: any;
}

export interface ModalType {
  modalName: ModalNames;
  modalProps?: ModalProps;
}

export type ModalMapType = Map<ModalNames, LazyExoticComponent<(props: ModalProps) => JSX.Element>>;
