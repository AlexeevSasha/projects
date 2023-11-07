import styled from "astroturf/react";
import { ModalNames } from "common/interfaces/modal";
import { Forms } from "modules/forms/components";
import { useContext } from "react";
import { AppContext } from "../ContextProvider";
import { IconLocation } from "../icons/IconLocation";
import { IconPhone } from "../icons/IconPhone";

export const ChooseLocation = () => {
  const { openModal, initialData } = useContext(AppContext);

  return (
    <ContentContainer
      onClick={() =>
        openModal(ModalNames.POPUP_MODAL, {
          children: <Forms.ChooseLocation />,
        })
      }
    >
      <IconLocation />
      {initialData?.userLocation?.location}
      <ContainerIcon>
        <IconPhone />
      </ContainerIcon>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  @import "variables";

  cursor: pointer;
  display: flex;
  align-items: center;
  color: $white;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;

  &:hover {
    color: $blue-2;

    svg {
      fill: $blue-2;
    }
  }
`;

const ContainerIcon = styled.div`
  @import "variables";

  display: none;

  @include respond-to(small) {
    display: block;
    margin-left: 12px;
  }
`;
