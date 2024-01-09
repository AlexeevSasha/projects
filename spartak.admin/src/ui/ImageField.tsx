import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { imageRepository } from "api/imageRepository";
import { debounce } from "lodash";
import { FC, MutableRefObject, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import { Cropper as ImgCrop, CropperProps } from "./Cropper";
import { ImageValidation, validateImage } from "../common/helpers/validators/validateImage";

type Props<T> = UploadProps & {
  onChange?: (value?: T) => void;
  value?: T;
  validation?: ImageValidation;
  withCrop?: boolean;
  multi?: boolean;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  uploadRequest?: (file: File) => Promise<string>;
  removeRequest?: (fileName: string[]) => Promise<boolean>;
};

export const ImageField = <T extends string>({
  value,
  onChange,
  validation,
  withCrop,
  multi,
  uploadRequest,
  removeRequest,
  inputRef,
  ...props
}: Props<T>) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const Cropper = withCrop ? ImgCrop : NoCrop;

  const fileList = useMemo(() => {
    return value
      ? Array.isArray(value)
        ? value.map((url, i) => ({ uid: `${i + 1}`, name: `image-1`, url }))
        : [{ uid: "-1", name: `image-1`, url: value }]
      : [];
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
    multi ? onChange?.([...urls.current, ...(value || [])] as unknown as T) : onChange?.(urls.current[0] as T);
    setLoading(false);
  }, 800);

  const setNewValue = (url: string) => {
    urls.current.push(url);
    handleChange();
  };

  const cropperProps =
    validation && !validation.validate
      ? {
          aspectRatio: validation.width / validation.height,
          canvasOptions: { width: validation.width, height: validation.height },
        }
      : undefined;

  return (
    <Cropper {...cropperProps}>
      <Upload
        ref={inputRef}
        listType="picture-card"
        showUploadList={{ showPreviewIcon: false }}
        fileList={fileList}
        beforeUpload={beforeUpload}
        multiple={multi}
        onRemove={async (e) => {
          e.url && (await removeRequest?.([e.url]));
          onChange?.(Array.isArray(value) ? (value.filter((url) => url !== e.url) as unknown as T) : undefined);
        }}
        customRequest={({ file }) => {
          (uploadRequest || imageRepository.upload)(file as RcFile).then(setNewValue);
        }}
        {...props}
      >
        {(!value || multi) && (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{t("allPages.upload")}</div>
          </div>
        )}
      </Upload>
    </Cropper>
  );
};

const NoCrop: FC<CropperProps> = ({ children }) => <>{children}</>;
