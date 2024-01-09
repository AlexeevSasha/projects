import React from "react";
import styled from "styled-components";
import { IBaseModal } from "../../../interfaces/popup/IModal";
import { useCloneElement } from "../../../hooks/useCloneElement";

export const ModalBase = ({ children, id }: IBaseModal) => {
  const { modifiedChildren } = useCloneElement(id, children);

  return <Container data-id={`modalfy-modal-${id}`}>{modifiedChildren}</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1200;
`;
