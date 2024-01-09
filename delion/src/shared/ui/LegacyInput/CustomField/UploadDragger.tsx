import type { CSSProperties, FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { CheckOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form as FormAntd, Grid, Space, theme, Typography, Upload } from 'antd';
import type { UploadFile, UploadProps, UploadType } from 'antd/es/upload/interface';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import type { AxiosRequestConfig } from 'axios';
import { observer } from 'mobx-react';
import CountUp from 'react-countup';
import { useStores } from '@shared/lib';
import { acceptFiles, fileLoadValidator } from '@shared/lib/fileExeption';
import { messageError } from '@shared/lib/showMessage';
import type { FormFieldProps } from '@shared/ui/LegacyInput/model/form';
import { CustomButton } from '../CustomButton';

const { Text } = Typography;

interface UploadDraggerFormFieldProps extends Omit<FormFieldProps, 'type'> {
  form: FormInstance;
  type?: UploadType;
}

interface UploadListItemProps {
  originNode: ReactNode;
  file: UploadFile;
}

export const UploadDragger = observer((props: UploadDraggerFormFieldProps) => {
  const { $axios } = useStores();
  const { name, placeholder, fileUploadSetting, form, ...inputProps } = props;
  const { maxCount, acceptTypes, listType, ...otherFileUploadSetting } = fileUploadSetting ?? {};

  const [myFileList, setMyFileList] = useState<UploadFile[]>([]);
  const [loadingProgress, setLoadingProgress] = useState<
    Record<string, { prev: number; current: number }>
  >({});
  const [optionalSettings, setOptionalSettings] = useState<UploadProps>({});
  const isPictureMode = listType ? ['picture-card', 'picture-circle'].includes(listType) : false;

  const initValueChange = FormAntd.useWatch(name, form);
  const {
    token: { sizeXXS, sizeXS, size },
  } = theme.useToken();
  const breakpoints = Grid.useBreakpoint();

  // TODO check what return
  // @ts-ignore
  const convertFileObject = (item, fileList) => {
    item =
      item.hasOwnProperty('id') && item.hasOwnProperty('file')
        ? item
        : item.hasOwnProperty('response')
        ? item.response
        : undefined;
    if (item) {
      fileList.push({
        uid: item.id,
        name: item.file.split('/').pop(),
        status: 'done',
        url: item.file,
        response: { id: item.id, file: item.file },
      });
    }
  };

  useEffect(() => {
    if (isPictureMode) {
      setOptionalSettings({
        listType: listType,
        progress: {
          style: { display: 'none' },
        },
      });
    } else {
      setOptionalSettings({
        itemRender: (originNode: ReactNode, file: UploadFile) => (
          <UploadListItem originNode={originNode} file={file} />
        ),
        showUploadList: {
          removeIcon: <CloseCircleOutlined />,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (initValueChange) {
      const defaultFileList: UploadFile[] = [];
      if (Array.isArray(initValueChange)) {
        initValueChange?.forEach((item) => {
          convertFileObject(item, defaultFileList);
        });
      } else {
        convertFileObject(initValueChange, defaultFileList);
      }
      if (!myFileList.length) {
        form.setFieldValue(name, defaultFileList);
        setMyFileList(defaultFileList);
      }
    }
  }, [initValueChange]);

  const uploadImage: UploadProps['customRequest'] = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const { status, errors } = await fileLoadValidator(file, acceptTypes);
    if (status) {
      const fmData = new FormData();
      fmData.append('file', file);
      try {
        const config: AxiosRequestConfig = {
          headers: { 'content-type': 'multipart/form-data' },
          onUploadProgress: (event) => {
            if (onProgress === undefined) throw new Error('onProgress event no defined');
            onProgress({ percent: (event.total ? event.loaded / event.total : 0) * 100 });
          },
        };
        const res = await $axios.post(`/uploads/`, fmData, config);

        if (onSuccess === undefined) throw new Error('onSuccess event no defined');
        onSuccess({ file: res.data.file, id: res.data.id });
        // @ts-ignore
      } catch ({ response }) {
        const data = response?.data;
        if (!data || Object.keys(data).length !== 0) {
          // onError();
          return;
        }
        let errorMessage = '';
        if (
          data?.hasOwnProperty('extra') &&
          data.extra.hasOwnProperty('file') &&
          data.extra.file.length
        ) {
          errorMessage = data.extra.file.join(' ');
        }
        if (data.hasOwnProperty('message') && data.message) {
          errorMessage = data.message;
        }
        if (onError === undefined) throw new Error('onSuccess event no defined');
        onError({ ...data, message: errorMessage });
        console.log('Error: ', data);
        // const error = new Error('Some error');
      }
    } else {
      if (onError === undefined) throw new Error('onSuccess event no defined');
      // Extra custom param
      // @ts-ignore
      onError({ extra: { file: errors }, message: errors.join(' ') });
    }
  };

  let customDefaultOptions: UploadProps = {
    maxCount: maxCount ? maxCount : 1,
    multiple: !!maxCount && maxCount > 1,
    accept: acceptFiles(acceptTypes),
    ...otherFileUploadSetting,
    ...optionalSettings,
    locale: {
      uploading: 'Загрузка...',
      uploadError: 'Ошибка загрузки...',
      removeFile: 'Удалить',
      downloadFile: 'Скачать',
      previewFile: 'Просмотреть',
    },
    customRequest: uploadImage,
    onChange(info) {
      const { file, fileList, event } = info;
      const { status, error } = file;

      switch (status) {
        case 'uploading':
          setLoadingProgress({
            ...loadingProgress,
            [file?.uid]: {
              prev: loadingProgress[file?.uid]?.current ?? 0,
              current: Math.round(event?.percent ?? 0),
            },
          });
          break;
        case 'done':
          form.setFieldsValue({ [name]: fileList.filter((f) => f.status === 'done') });
          form.validateFields([name]);
          break;
        case 'removed':
          form.setFieldsValue({ [name]: fileList.filter((f) => f.status === 'done') });
          form.validateFields([name]);
          break;
        case 'error':
          if (
            error &&
            error.hasOwnProperty('extra') &&
            error.extra.hasOwnProperty('file') &&
            error.extra.file.length
          ) {
            messageError(
              <Space direction='vertical' align='start' size={sizeXXS}>
                <Text strong>{file.name}</Text>
                <Space direction='vertical' align='start' size={0}>
                  {error.extra.file.map((f: string, i: number) => (
                    <Text key={i}>{f}</Text>
                  ))}
                </Space>
              </Space>,
            );
          }
          break;
        default:
          break;
      }
      // let localFileList = fileList.filter(f => f.hasOwnProperty('status') && ['done', 'uploading'].includes(f.status));
      //
      // if (['done', 'uploading'].includes(status) && localFileList.find((f) => f.uid !== file.uid)) {
      //     localFileList = localFileList.concat([file])
      // }
      // if (localFileList.length > 10) {
      //     localFileList.shift();
      // }
      // form.setFieldValue(name, fileList.filter(f => f.hasOwnProperty('status') && ['done'].includes(f.status)));
      setMyFileList(
        fileList.filter(
          (f) => f.hasOwnProperty('status') && ['done', 'uploading'].includes(f.status ?? ''),
        ),
      );
    },
    // beforeUpload(file) {
    //     const { status, errors } = fileLoadValidator(file, acceptTypes);
    //     // setMyFileList([...myFileList, file]);
    //     if (!status) {
    //         snackbarStore
    //             .open(
    //                 file.name,
    //                 'error',
    //                 <>{ errors.map((f, i) => <span key={ i }>{ f }<br/></span>) }</>
    //             );
    //     }
    //     return file;
    // }
  };

  const UploadListItem = ({ originNode, file }: UploadListItemProps) => {
    const breakpoints = Grid.useBreakpoint();

    return (
      <div style={{ marginBottom: size }}>
        <div className='d-md-flex w-100'>
          <CustomButton
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            href={file.url}
            rel='noopener'
            target='_blank'
            blockWidth={!breakpoints.md}
            type={file.status === 'uploading' ? 'default' : 'success'}
          >
            <Space>
              {file.status === 'uploading' ? (
                <>
                  Загрузка:{' '}
                  <CountUp
                    end={loadingProgress[file?.uid]?.current}
                    start={loadingProgress[file?.uid]?.prev}
                  />
                  %
                </>
              ) : (
                <>
                  <CheckOutlined />
                  Файл загружен
                </>
              )}
            </Space>
          </CustomButton>
          <Space
            style={{
              marginLeft: breakpoints.md ? size : 0,
              marginTop: !breakpoints.md ? sizeXS : 0,
            }}
            className='w-100 justify-content-between'
          >
            <Text type='secondary'>{file.name}</Text>
            {/* TODO type unknown NodeElement
             @ts-ignore */}
            <div>{originNode?.props.children[1][1]}</div>
          </Space>
        </div>
      </div>
    );
  };

  const UploadHelpText: FC<{ style?: CSSProperties }> = (props) => {
    const { style } = props;

    return (
      <div style={{ ...style, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Text type='secondary'>{placeholder}</Text>
        <Text type='secondary'>Формат: {acceptTypes?.join(', ')}. Размер: 10 МБ.</Text>
      </div>
    );
  };

  const uploadBlock = (
    <>
      <Upload
        name={name as string}
        {...inputProps}
        {...customDefaultOptions}
        className={'upload-reverse'}
        fileList={myFileList}
      >
        {maxCount
          ? maxCount > myFileList.length && (
              <>
                {!isPictureMode ? (
                  <Space direction={breakpoints.md ? 'horizontal' : 'vertical'} size={size}>
                    <div>
                      <CustomButton icon={<PlusOutlined />} blockWidth={!breakpoints.md}>
                        Загрузить
                      </CustomButton>
                    </div>
                    <UploadHelpText />
                  </Space>
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Загрузить</div>
                  </div>
                )}
              </>
            )
          : null}
      </Upload>
      {isPictureMode && <UploadHelpText style={{ textAlign: 'center' }} />}
    </>
  );

  return (
    <>
      {isPictureMode ? (
        <Space direction={'vertical'} align={isPictureMode ? 'center' : 'start'}>
          {uploadBlock}
        </Space>
      ) : (
        <div>{uploadBlock}</div>
      )}
    </>
  );
});
