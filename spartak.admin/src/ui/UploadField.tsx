import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { debounce } from "lodash";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export type ImageValidation = {
  width?: number;
  height?: number;
  size: number;
  format: string[];
  more?: {
    width: number;
    height: number;
  };
  resValidate?: (imgWidth: number, imgHeight: number) => boolean;
};

type Props<T> = UploadProps & {
  value?: T;
  // multi?: boolean;
  placeholder?: (options?: { loading?: boolean }) => JSX.Element;
  onChange?: (value?: T) => void;
  validate?: (file: File) => boolean;
  uploadRequest: (file: File) => Promise<string>;
  removeRequest?: (fileName: string) => Promise<boolean | void>;
  getRemoveEvent?: () => void;
};

export const UploadField = <T extends string>({
  value,
  onChange,
  // multi,
  validate,
  placeholder,
  uploadRequest,
  removeRequest,
  ...props
}: Props<T>) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const fileList = useMemo(() => {
    return value
      ? Array.isArray(value)
        ? value.map((url, i) => ({ uid: `${i + 1}`, name: url.split("/").slice(-1), url }))
        : [{ uid: "-1", name: value.split("/").slice(-1), url: value }]
      : [];
  }, [value]);

  const urls = useRef<string[]>([]);

  const beforeUpload = async (file: RcFile): Promise<boolean> =>
    await new Promise((resolve, reject) => {
      urls.current = [];
      if (!file) {
        reject();
      }

      if (validate) {
        const res = validate(file);
        if (res) {
          setLoading(true);
          resolve(true);
        } else {
          setLoading(false);
          reject();
        }
      } else {
        setLoading(true);
        resolve(true);
      }
    });

  const handleChange = debounce(() => {
    // multi ? onChange?.([...(value || []), ...urls.current] as unknown as T) :
    onChange?.(urls.current[0] as T);
    setLoading(false);
  }, 800);

  const setNewValue = (url: string) => {
    urls.current.push(url);
    handleChange();
  };

  return (
    <Upload
      listType="picture-card"
      showUploadList={{ showPreviewIcon: false }}
      fileList={fileList}
      beforeUpload={beforeUpload}
      // multiple={multi}
      onRemove={async (e) => {
        e.url && (await removeRequest?.(e.url));
        onChange?.(Array.isArray(value) ? (value.filter((url) => url !== e.url) as unknown as T) : undefined);
        props.getRemoveEvent?.();
      }}
      customRequest={({ file }) => uploadRequest(file as RcFile).then(setNewValue)}
      {...props}
    >
      {!value /* || multi*/ &&
        (placeholder?.({ loading }) || (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{t("allPages.upload")}</div>
          </div>
        ))}
    </Upload>
  );
};
