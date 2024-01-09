import { useEffect, useState } from 'react';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import { fileLoadValidator } from '../fileExeption';
import { useStores } from './useStore';

export const useUpload = (form: FormInstance, name: string, accept?: UploadProps['accept']) => {
  const { $axios } = useStores();
  const [loading, setLoading] = useState(false);
  const [errorList, setErrorList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const file: FileData = form.getFieldValue(name);

  useEffect(() => {
    dataToFileList(file);
  }, [file]);

  const dataToFileList = (file?: FileData) => {
    if (!file) return setFileList([]);

    setFileList([
      {
        uid: file.id.toString(),
        url: file.file,
        name: file.original_filename,
      },
    ]);
  };

  const onRemove: UploadProps['onRemove'] = () => {
    dataToFileList();
    form.setFieldValue(`${name}_id`, '');
  };

  const onUpload: UploadProps['customRequest'] = ({ onError, file, onProgress, onSuccess }) => {
    const { status, errors } = fileLoadValidator(file, accept ? accept.split(',') : []);
    setErrorList([]);

    if (!status && onError) {
      setErrorList(errors);

      return onError({ name, message: errors.join('. ') });
    }

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

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
        dataToFileList(data);
        form.setFieldValue(`${name}_id`, data.id);
      })
      .finally(() => setLoading(false));
  };

  return {
    fileList,
    onRemove,
    onUpload,
    loading,
    errors: errorList,
  };
};
