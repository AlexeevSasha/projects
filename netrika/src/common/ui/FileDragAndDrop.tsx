import React, { DragEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { styled } from "../styles/styled";
import { theme } from "../styles/theme";

interface IProps {
  handleDrop?: (params: any) => void;
  error?: boolean;
}

export const FileDragAndDrop: React.FC<IProps> = ({ children, handleDrop: handleDropProps, error }) => {
  const dropRef = useRef<HTMLLabelElement>(null);
  const ref = useRef({ dragCounter: 0 });

  const [drag, setDrag] = useState(false);

  const handleDrag = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    ref.current.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ref.current.dragCounter--;
    if (ref.current.dragCounter === 0) {
      setDrag(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDrag(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleDropProps && handleDropProps(e.dataTransfer.files);
        e.dataTransfer.clearData();
        ref.current.dragCounter = 0;
      }
    },
    [handleDropProps]
  );

  useLayoutEffect(() => {
    const div = dropRef.current;

    if (div) {
      div.addEventListener("dragenter", handleDragIn as any);
      div.addEventListener("dragleave", handleDragOut as any);
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop as any);
    }

    return () => {
      if (div) {
        div.removeEventListener("dragenter", handleDragIn as any);
        div.removeEventListener("dragleave", handleDragOut as any);
        div.removeEventListener("dragover", handleDrag);
        div.removeEventListener("drop", handleDrop as any);
      }
    };
  }, [dropRef, handleDrag, handleDragIn, handleDragOut, handleDrop]);

  useEffect(() => {
    window && window.addEventListener("dragover", windowHandleDrop);
    window && window.addEventListener("drop", windowHandleDrop);

    return () => {
      window && window.removeEventListener("dragover", windowHandleDrop);
      window && window.removeEventListener("drop", windowHandleDrop);
    };
  }, []);

  const windowHandleDrop = (e: any) => {
    e && e.preventDefault();
  };

  return (
    <ContainerDND ref={dropRef} drag={drag} error={error}>
      {children ? (
        children
      ) : (
        <div>
          Перетяните файл или нажмите для выбора.
          <br /> Возможно загрузить не более одного файла.
        </div>
      )}
    </ContainerDND>
  );
};

const ContainerDND = styled.label<{ drag?: boolean; error?: boolean }>`
  border: 2px dashed ${theme.colors.gray};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 6px;
  cursor: pointer;
  margin-bottom: 35px;
  width: 100%;
  color: ${(props) => (props.error ? theme.colors.lightRed : "#AFBBC7")};
  justify-content: center;
  align-items: center;
  display: flex;
  height: 280px;
  line-height: 300%;
  text-align: center;

  flex-direction: column;
`;
