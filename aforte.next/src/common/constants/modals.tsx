import { ModalNames, ModalProps } from "common/interfaces/modal";
import { lazy, LazyExoticComponent } from "react";

export const modalsMap = new Map<
  ModalNames,
  LazyExoticComponent<(props: ModalProps) => JSX.Element>
>([
  [ModalNames.ALERT_MODAL, lazy(() => import("common/components/modals/AlertModal"))],
  [ModalNames.CONFIRM_MODAL, lazy(() => import("common/components/modals/ConfirmModal"))],
  [ModalNames.POPUP_MODAL, lazy(() => import("common/components/modals/PopupModal"))],
  [ModalNames.POPUP_MODAL_MOBILE, lazy(() => import("common/components/modals/PopupModalMobile"))],
  [
    ModalNames.CATALOG_MODAL,
    lazy(() => import("common/components/modals/CatalogModal/CatalogModal")),
  ],
  [ModalNames.FILTER_MODAL, lazy(() => import("common/components/modals/FilterModal"))],
  [ModalNames.PRODUCT_CARD_MODAL, lazy(() => import("common/components/modals/ProductCardModal"))],
]);
