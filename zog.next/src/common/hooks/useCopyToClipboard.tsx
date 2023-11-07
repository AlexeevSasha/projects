import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>("");

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Ссылка успешно скопирована в буфер обмена");
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText("");
      return false;
    }
  }, []);

  return { copiedText, copy };
};
