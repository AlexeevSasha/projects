import { forwardRef, MutableRefObject } from "react";
import ReactQuill from "react-quill";

type Props = {
  uploadRequest: (file: File) => Promise<any>;
  quillRef: MutableRefObject<ReactQuill | null>;
};

export const WisywigImage = forwardRef<HTMLInputElement, Props>(({ quillRef, uploadRequest }, ref) => {
  const handleChange = async (file: File) => {
    if (!quillRef.current) {
      return;
    }
    const fileUrl = await uploadRequest(file);
    const quillEditor = quillRef.current.getEditor();
    const rangeIndex = quillEditor.getSelection()?.index || 0;
    quillEditor.insertEmbed(rangeIndex, "image", fileUrl);
  };

  const InputImage = ({ beforeUpload }: { beforeUpload: (file: File) => void }) => (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={async ({ currentTarget }) => {
        const file = currentTarget.files?.[0];
        file && beforeUpload(file);
      }}
    />
  );

  return <InputImage beforeUpload={handleChange} />;
});
