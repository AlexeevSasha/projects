import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useQuillModules } from "./useQuillModules";
import { WisywigImage } from "./WisywigImage";

type Props = {
  onChange?: (value: string) => void;
  value?: string;
  height?: string;
  minHeight?: string;
  bottom?: string;
  uploadRequest: (file: File) => Promise<any>;
  placeholder?: string;
  customModulse?: Record<string, unknown>;
};

export const Wysiwyg = ({
  onChange,
  value,
  height,
  minHeight,
  bottom,
  uploadRequest,
  placeholder,
  customModulse,
}: Props) => {
  const { modules, quillRef, inputRef } = useQuillModules();

  return (
    <>
      <StyledQuill
        ref={quillRef}
        modules={customModulse ?? modules}
        theme="snow"
        style={{
          height: "fit-content",
          minHeight: minHeight || "inherit",
          marginBottom: bottom || "0px",
        }}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
        textHeight={height}
      />

      <WisywigImage ref={inputRef} uploadRequest={uploadRequest} quillRef={quillRef} />
    </>
  );
};

const StyledQuill = styled(ReactQuill)<{ minHeight?: string; textHeight?: string }>`
  font-size: 14px;
  .ql-snow {
    .ql-picker {
      &.ql-size {
        .ql-picker-label,
        .ql-picker-item {
          &::before {
            content: attr(data-value) !important;
          }
        }
      }
    }
  }

  .ql-container {
    min-height: ${({ minHeight }) => minHeight ?? "inherit"};
    .ql-editor {
      height: ${({ textHeight }) => textHeight ?? "300px"};
    }
  }
`;
