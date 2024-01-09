import { useState } from "react";
import styled from "styled-components";

interface ImagePreviewProps {
  url: string;
  deleteHandler: (e: any) => void;
}

export const ImagePreview = (props: ImagePreviewProps) => {
  const { url, deleteHandler } = props;
  const [showButtons, setShowButtons] = useState(false);

  return (
    <BorderedContainer
      onMouseEnter={() => {
        setShowButtons(true);
      }}
      onMouseLeave={() => {
        setShowButtons(false);
      }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image src={url} alt="image-1" />
      </a>

      {showButtons && (
        <Mask>
          <a href={url} target="_blank" rel="noopener noreferrer" title="Предпросмотр файла">
            <span role="img" aria-label="eye">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="eye"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
              </svg>
            </span>
          </a>
          <DeleteButton title="Удалить файл" type="button" onClick={deleteHandler}>
            <span role="img" aria-label="delete">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="delete"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
              </svg>
            </span>
          </DeleteButton>
        </Mask>
      )}
    </BorderedContainer>
  );
};

const BorderedContainer = styled.div`
  display: inline-block;
  width: 104px;
  height: 104px;
  margin: 0;
  vertical-align: top;

  margin: 0;
  position: relative;
  padding: 8px;
  border: 1px solid #d9d9d9;
  background-color: transparent;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

const Mask = styled.div`
  position: absolute;
  z-index: 100;
  left: 8px;
  top: 8px;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: white;
  }
`;
const DeleteButton = styled.button`
  border: none;
  background: transparent;
  height: 20px;
  width: 24px;
  height: 24px;
  padding: 0 0 0 8px;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 86px;
  height: 86px;
  object-fit: contain;
`;
