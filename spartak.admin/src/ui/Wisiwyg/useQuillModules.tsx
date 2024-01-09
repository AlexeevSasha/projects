import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";

export const fontSizeArr = [
  "1em",
  "1.14em",
  "1.28em",
  "1.42em",
  "1.57em",
  "1.71em",
  "2.28em",
  "2.85em",
  "3.85em",
  "4.85em",
  "5.71em",
];

const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArr;
Quill.register(Size, true);
Quill.register(Quill.import("attributors/style/align"), true);

export const useQuillModules = () => {
  const quillRef = useRef<ReactQuill | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        handlers: {
          image: () => inputRef.current?.click(),
        },
        container: [
          [{ size: fontSizeArr }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["link", "image", "video"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return { modules, quillRef, inputRef };
};
