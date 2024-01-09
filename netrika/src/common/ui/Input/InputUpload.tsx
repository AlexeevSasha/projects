import { FileDragAndDrop } from "../FileDragAndDrop";
import { IconFile } from "../../components/Icon/IconFile";
import React, { ChangeEvent, useCallback, useState } from "react";
import { styled } from "../../styles/styled";
import { theme } from "../../styles/theme";

interface IProps {
  cbFile: (file: File) => void;
  size?: number;
  accept?: string[];
  messageValidate?: {
    accept: string;
  };
}

export const InputUpload = ({ cbFile, size = 150, ...props }: IProps) => {
  const [file, setFile] = useState<File | null>();
  const [errorFile, setErrorFileSize] = useState("");

  const validate = useCallback((file: File | undefined) => {
    if (!file) {
      setErrorFileSize("Поле обязательно!");
      return;
    } else if (file.size >= 1024 * 1024 * size) {
      setErrorFileSize(`Файл не может быть больше чем ${size} МБайт`);
      return;
    }

    const type = file.type.split("/").pop();
    if (props.accept) {
      const check = props.accept.includes(`.${type}`);
      if (!check) {
        setErrorFileSize(props.messageValidate?.accept || "Неподходящий формат файла");
        return;
      }
    }

    setErrorFileSize("");
    return true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFile = useCallback(
    (file?: File) => {
      const check = validate(file);
      if (!check || !file) {
        setFile(null);
      } else {
        setFile(file);
        cbFile(file);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cbFile]
  );

  const dragFile = useCallback(
    (event: FileList) => updateFile(event[0]),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    updateFile(event.target.files[0]);
  };

  return (
    <div>
      <FileDragAndDrop handleDrop={dragFile} error={!!errorFile}>
        <InputFile id={"the_file"} type={"file"} onChange={onChangeFile} accept={props.accept?.join(",")} />
        {file ? (
          <>
            <IconFile />
            {file.name}
          </>
        ) : (
          <Wrapper>
            <span>Перетяните файл или нажмите для выбора.</span>
            {props.accept && <span>Возможно загрузить не более одного файла типа {props.accept.join(",")}</span>}
            <span> Максимальный размер - {size} МБайт.</span>
          </Wrapper>
        )}
      </FileDragAndDrop>
      {errorFile && <Error>{errorFile}</Error>}
    </div>
  );
};

const InputFile = styled.input`
  position: absolute;

  top: 0;
  visibility: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  background: ${theme.colors.lightRed};
  color: ${theme.colors.white};
  padding: 4px;
  text-align: center;
  width: 100%;
  border-radius: 4px;
`;
