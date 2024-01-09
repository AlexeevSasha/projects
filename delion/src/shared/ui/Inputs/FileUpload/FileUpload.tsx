import { useCallback, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance, FormItemProps, UploadFile } from 'antd';
import { Form, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadProps } from 'antd/lib';
import cx from 'classnames';
import { useStores } from '@shared/lib';
import css from './FileUpload.module.scss';

export type FileUploadProps = Omit<UploadProps, 'defaultFileList'> & {
  form: FormInstance;
  formItemProps: FormItemProps;
  defaultFileList: FileData[];
  acceptType?: string[];
  isPreview?: boolean;
};

export const FileUpload = (props: FileUploadProps) => {
  const {
    acceptType = ['.jpg', '.jpeg', '.png', '.pdf', '.svg', '.doc', '.docx'],
    form,
    defaultFileList,
    maxCount,
    formItemProps,
    isPreview = false,
    ...rest
  } = props;

  const uploadValues = Form.useWatch(formItemProps?.name, form);

  const { $axios } = useStores();

  const attachedFilesLength = (uploadValues?.length || uploadValues?.fileList?.length) ?? 0;
  const hasNoFilesAttached = attachedFilesLength === 0 ?? false;
  const hasFilesAttached = attachedFilesLength > 0 ?? false;
  const isMaxFilesAttachedExceed = (maxCount && attachedFilesLength >= maxCount) ?? false;

  const preparedDefaultList: UploadFile[] = useMemo(
    () =>
      defaultFileList?.map((file) => ({
        uid: file.id?.toString(),
        name: file.file.split('/').pop() as string,
        status: 'done',
        url: file.file,
        response: { id: file.id, file: file.file },
      })) ?? [],
    [defaultFileList],
  );

  const handleUpload: UploadProps['customRequest'] = async ({
    onError,
    file,
    onProgress,
    onSuccess,
  }) => {
    const { status, errors } = await fileLoadValidator(file, acceptType ? acceptType : []);

    if (!status && onError)
      return onError({ name: formItemProps?.name, message: errors.join('. ') });

    const formData = new FormData();
    formData.append('file', file);

    $axios
      .post('/uploads/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: ({ loaded, total }) => {
          if (!onProgress) return;

          onProgress({ percent: total ? loaded / total : 0 * 100 });
        },
      })
      .then(({ data }) => {
        if (!onSuccess) return;

        onSuccess({ file: data.file, id: data.id });
      });
  };

  const uploadButton = (
    <div className={css.uploadButton}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{hasFilesAttached ? 'Загрузить ещё' : 'Загрузить'}</div>
    </div>
  );

  const handlePreview = useCallback((file: UploadFile) => {
    window.open(file?.response.file, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <Form.Item
      {...formItemProps}
      className={cx(css.container, {
        [css.container__no_files]: hasNoFilesAttached,
        [css.container__preview_mode]: isPreview,
      })}
      initialValue={{ fileList: preparedDefaultList }}
      getValueFromEvent={(event) => {
        return event;
      }}
    >
      <Upload
        {...rest}
        customRequest={handleUpload}
        onPreview={handlePreview}
        listType='picture-card'
        accept={acceptType.join(',')}
        defaultFileList={preparedDefaultList}
        showUploadList={{
          showRemoveIcon: !isPreview,
        }}
      >
        {isMaxFilesAttachedExceed || isPreview ? null : uploadButton}
      </Upload>
    </Form.Item>
  );
};

// TODO: Align with Dragger then remove.
function fileLoadValidator(
  file: string | RcFile | Blob,
  acceptTypes: string[] = [],
  maxMbSize: number = 5,
): {
  status: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof file === 'string') {
    errors.push('Файл не поддерживается.');
    return { status: false, errors };
  }

  const fileName = (file as RcFile).name;

  const fileTypeAccept =
    !acceptTypes?.length ||
    (!!acceptTypes?.length && !!fileName && acceptTypes.some((item) => fileName.includes(item)));

  if (!fileTypeAccept) {
    errors.push('Файл не поддерживается.');
  }

  const fileSizeAccept = file.size / 1024 / 1024 < maxMbSize;

  if (!fileSizeAccept) {
    errors.push(`Размер файла не должен превышать ${maxMbSize} МБ.`);
  }

  return { status: fileTypeAccept && fileSizeAccept, errors };
}
