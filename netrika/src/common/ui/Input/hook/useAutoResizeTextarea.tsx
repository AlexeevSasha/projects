import { useCallback, useEffect, useRef } from "react";

export const useAutoResizeTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = useCallback(() => {
    if (!textareaRef || !textareaRef?.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 2 + "px";
  }, [textareaRef]);

  useEffect(() => {
    if (textareaRef.current) {
      if (textareaRef.current.style.height) return;
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 14 + "px";
    }
  }, []);

  return { handleInputChange, textareaRef };
};
