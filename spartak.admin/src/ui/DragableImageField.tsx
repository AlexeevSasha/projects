import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { imageRepository } from "api/imageRepository";
import { debounce } from "lodash";
import { createRef, FC, MutableRefObject, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import { Cropper as ImgCrop, CropperProps } from "./Cropper";
import { ImageValidation, validateImage } from "../common/helpers/validators/validateImage";
import styled from "styled-components";
import { ImagePreview } from "./ImagePreview";

type Props<T> = UploadProps & {
  onChange?: (value?: T) => void;
  value?: T;
  validation?: ImageValidation;
  withCrop?: boolean;

  inputRef?: MutableRefObject<HTMLInputElement | null>;
  uploadRequest?: (file: File) => Promise<string>;
  removeRequest?: (fileName: string[]) => Promise<boolean>;
};

export const DragableMultiImageField = <T extends string>({
  value,
  onChange,
  validation,
  withCrop,
  uploadRequest,
  removeRequest,
  inputRef,
  ...props
}: Props<T>) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const Cropper = withCrop ? ImgCrop : NoCrop;
  const containerRef = createRef<HTMLDivElement>();
  const [fileList, setFileList] = useState(() => {
    return value
      ? Array.isArray(value)
        ? value.map((url, i) => ({ uid: `${i + 1}`, name: `image-1`, url }))
        : [{ uid: "-1", name: `image-1`, url: value }]
      : [];
  });

  useEffect(() => {
    setFileList(
      value
        ? Array.isArray(value)
          ? value.map((url, i) => ({ uid: `${i + 1}`, name: `image-1`, url }))
          : [{ uid: "-1", name: `image-1`, url: value }]
        : []
    );
  }, [value]);
  const urls = useRef<string[]>([]);

  const beforeUpload = async (file: File): Promise<boolean | File> => {
    console.log(file.name);
    urls.current = [];

    try {
      if (validation) {
        await validateImage(file, validation);
      }
      setLoading(true);

      return file;
    } catch (e: any) {
      e.data && dispatch(noticeActions.add({ message: t(e.message, e.data), type: "error" }));

      return false;
    }
  };

  const handleChange = debounce(() => {
    onChange?.([...urls.current, ...(value || [])] as unknown as T);
    setLoading(false);
  }, 800);

  const setNewValue = (url: string) => {
    urls.current.push(url);
    handleChange();
  };

  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  const dragStart = (e: any, position: number) => {
    dragItem.current = position;

    (e.target as HTMLDivElement).classList.add("grabbable");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
  };
  const dragEnter = (e: any, position: number) => {
    dragOverItem.current = position;
    e.preventDefault();
    if (containerRef.current) {
      for (let i = 0; i < containerRef.current.children.length; i++) {
        containerRef.current.children.item(i)?.classList.remove("over");
      }
      containerRef.current.children.item(position)?.classList.add("over");
    }

    return false;
  };

  const dragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const dragOverChild = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
  };
  const dragLeaveChild = (e: any) => {
    e.preventDefault();
  };

  const drop = (e: any) => {
    if (
      dragItem.current === undefined ||
      dragOverItem.current === undefined ||
      dragItem.current === null ||
      dragOverItem.current === null
    ) {
      return;
    }

    (e.target as HTMLDivElement).classList.remove("grabbable");

    const copyListItems = [...fileList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setFileList(copyListItems);

    urls.current = [];
    urls.current.push(...copyListItems.map((x) => x.url));

    onChange?.([...urls.current] as unknown as T);

    //clear css classes
    for (let i = 0; i < (containerRef.current as HTMLDivElement).children.length; i++) {
      (containerRef.current as HTMLDivElement).children.item(i)?.classList.remove("over");
    }
  };

  return (
    <Container ref={containerRef}>
      {fileList.map((pic, index) => (
        <>
          <PreviewContainer
            move={index === dragOverItem?.current}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => {
              console.log(index, index === dragOverItem?.current);
              dragEnter(e, index);
            }}
            onDragEnd={drop}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            key={index}
            draggable
          >
            <ImagePreview
              url={pic.url}
              deleteHandler={async (e) => {
                console.log("file delete handler", pic.url);
                e.url && (await removeRequest?.([pic.url]));
                onChange?.(Array.isArray(value) ? (value.filter((url) => url !== pic.url) as unknown as T) : undefined);
              }}
            />
          </PreviewContainer>
        </>
      ))}

      <Upload
        style={{ width: "112px" }}
        ref={inputRef}
        listType="picture-card"
        fileList={fileList}
        showUploadList={false}
        beforeUpload={beforeUpload}
        multiple={true}
        onRemove={async (e) => {
          e.url && (await removeRequest?.([e.url]));
          onChange?.(Array.isArray(value) ? (value.filter((url) => url !== e.url) as unknown as T) : undefined);
        }}
        customRequest={({ file }) => {
          (uploadRequest || imageRepository.upload)(file as RcFile).then(setNewValue);
        }}
        {...props}
      >
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>{t("allPages.upload")}</div>
        </div>
      </Upload>
    </Container>
  );
};

const NoCrop: FC<CropperProps> = ({ children }) => <>{children}</>;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 4px;
  column-gap: 8px;
  .ant-upload-picture-card-wrapper {
    width: 112px;
  }
`;

const PreviewContainer = styled.div<{ move: boolean }>`
  display: flex;

  .grabbable {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  /* (Optional) Apply a "closed-hand" cursor during drag operation. */
  .grabbable:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  &.over {
    padding-left: 8px;
    border-left: 2px solid #dc001f;
  }
`;
