import styled from "astroturf/react";
import { modalsMap } from "common/constants/modals";
import { ModalNames, ModalProps, ModalType } from "common/interfaces/modal";
import { Suspense, useState } from "react";
import { Icon } from "../components/Icon";

export const useModal = () => {
  const [modals, setModal] = useState<ModalType[]>([]);

  const closeModal = (modalName: string) =>
    setModal(modals.filter((modal) => modal.modalName !== modalName));

  const openModal = (modalName: ModalNames, modalProps: ModalProps = {}) => {
    if (modals.some((item) => item.modalName === modalName)) return;
    setModal([{ modalName, modalProps: { ...modalProps, onClose: closeModal } }]);
  };

  return {
    openModal,
    closeModal,
    Modals: modals.length ? (
      <Suspense fallback={<Icon name="loader" />}>
        {modals.map(({ modalName, modalProps = {} }) => {
          const ModalComponent = modalsMap?.get(modalName);

          // return (
          //   ModalComponent &&
          switch (modalName) {
            case "POPUP_MODAL_MOBILE":
            case "FILTER_MODAL":
            case "ALERT_MODAL":
              return (
                ModalComponent && (
                  <ContainerMobile>
                    <ModalComponent
                      key={modalName}
                      {...modalProps}
                      callBack={modalProps.callBack}
                    />
                  </ContainerMobile>
                )
              );
            case "CATALOG_MODAL":
              return (
                ModalComponent && (
                  <ContainerCategory>
                    <ModalComponent
                      key={modalName}
                      {...modalProps}
                      callBack={modalProps.callBack}
                    />
                  </ContainerCategory>
                )
              );
            case "PRODUCT_CARD_MODAL":
              return (
                ModalComponent && (
                  <ContainerProductCard>
                    <ModalComponent
                      key={modalName}
                      {...modalProps}
                      callBack={modalProps.callBack}
                    />
                  </ContainerProductCard>
                )
              );
            default:
              return (
                ModalComponent && (
                  <Container>
                    <ModalComponent
                      key={modalName}
                      {...modalProps}
                      callBack={modalProps.callBack}
                    />
                  </Container>
                )
              );
          }

          // );
        })}
      </Suspense>
    ) : null,
  };
};

const Container = styled.div`
  @import "variables";

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  @include respond-to(small) {
    bottom: 0;
    align-items: end;
  }
`;

const ContainerProductCard = styled.div`
  @import "variables";

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerCategory = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  display: flex;
`;
const ContainerMobile = styled.div`
  position: fixed;
  display: flex;
  align-items: end;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
`;
