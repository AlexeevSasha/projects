import { useCallback, useEffect, useRef, useState } from "react";

export const useDndFiles = <T extends HTMLElement>(onUpload: (files: File[]) => void) => {
  const [dragging, setDragging] = useState(false);
  const refDrop = useRef<T>(null);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const { files } = e.dataTransfer;
    if (files && files?.length) onUpload(files);
  }, []);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    !dragging && setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.contains(e.relatedTarget as T)) return;
    setDragging(false);
  };

  useEffect(() => {
    refDrop?.current?.addEventListener("dragover", handleDragOver);
    refDrop?.current?.addEventListener("drop", handleDrop);
    refDrop?.current?.addEventListener("dragenter", handleDragEnter);
    refDrop?.current?.addEventListener("dragleave", handleDragLeave);

    return () => {
      refDrop?.current?.removeEventListener("dragover", handleDragOver);
      refDrop?.current?.removeEventListener("drop", handleDrop);
      refDrop?.current?.removeEventListener("dragenter", handleDragEnter);
      refDrop?.current?.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  return { refDrop, dragging };
};
