import { Modal } from "antd";
import "cropperjs/dist/cropper.css";
import { Children, cloneElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import CropperComponent, { ReactCropperProps } from "react-cropper";

export type CropperProps = ReactCropperProps & {
  children?: ReactNode;
  canvasOptions?: Cropper.GetCroppedCanvasOptions;
};

export const Cropper = ({ children: _children, canvasOptions, ...props }: CropperProps) => {
  const cropperRef = useRef<Cropper | undefined>();
  const [dataUrl, setDataUrl] = useState<string | undefined>();
  const resolveRef = useRef<((blob: Blob) => void) | undefined>();
  const [state, setState] = useState<{ width: number; height: number }>();

  const cropImage = (file: File): Promise<File> => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => typeof reader.result === "string" && setDataUrl(reader.result));

    return new Promise((resolve) => {
      resolveRef.current = function (blob: Blob) {
        resolve(new File([blob], file.name, { type: "image/jpeg" }));
      };
    });
  };

  const handleOk = () => {
    cropperRef.current?.getCroppedCanvas(canvasOptions).toBlob(
      (blob) => {
        if (blob && resolveRef.current) {
          setDataUrl(undefined);
          resolveRef.current(blob);
        } else {
          throw Error("no blob");
        }
      },
      "image/jpeg",
      1
    );
  };

  const handleCancel = () => {
    setDataUrl(undefined);
  };

  const children = useMemo(
    () =>
      Children.map(_children, (child: any) => {
        const beforeUpload = child.props.beforeUpload;

        return cloneElement(child, {
          beforeUpload: async (_file: File) => {
            const file = await cropImage(_file);

            return await beforeUpload(file);
          },
        });
      }),
    [_children]
  );

  const onCropMove = (event: Cropper.CropEvent<HTMLImageElement>) => {
    setState({ width: Math.round(event.detail.width), height: Math.round(event.detail.height) });
  };

  const Title = () =>
    state ? (
      <div>
        {state.width} x {state.height}
      </div>
    ) : null;

  return (
    <>
      {children}

      <Modal title={<Title />} visible={!!dataUrl} width="75vw" onOk={handleOk} onCancel={handleCancel}>
        <CropperComponent
          style={{ height: "60vh", width: "100%" }}
          src={dataUrl}
          viewMode={2}
          minCropBoxHeight={50}
          minCropBoxWidth={50}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          crop={canvasOptions ? undefined : onCropMove}
          onInitialized={(instance) => {
            cropperRef.current = instance;
          }}
          {...props}
        />
      </Modal>
    </>
  );
};
