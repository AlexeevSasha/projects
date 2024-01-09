import React from "react";
import { Modal } from "../modal/modal";
import { CustomPlayer } from "../customPlayer/customPlayer";
import styled from "styled-components";
import { IMediaShort } from "../../api/dto/IMedia";

interface IProps {
  showModal: IMediaShort;
  setShowModal: (arg: undefined) => void;
}

export const ClickPlayVideo = ({ showModal, setShowModal }: IProps) => {
  return (
    <Modal clickClose={() => setShowModal(undefined)}>
      <VideoWrapper>
        {showModal?.VideoUrl?.map((url, i) => (
          <CustomPlayer key={i} url={url} />
        ))}
      </VideoWrapper>
    </Modal>
  );
};
const VideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  overflow: auto;
  display: grid;
  grid: auto / 1fr;
  align-items: center;
`;
