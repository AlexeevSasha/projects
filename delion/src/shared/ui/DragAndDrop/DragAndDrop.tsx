import { useMemo, type FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Form, Space, Upload } from 'antd';
import type { DraggerProps } from 'antd/lib/upload';
import { useUpload } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import css from './DragAndDrop.module.scss';
import { UploadedDragger } from './UploadedDragger/UploadedDragger';

const { Dragger } = Upload;

interface Props extends DraggerProps {
  label?: string;
  description?: string;
  form: FormInstance;
  name: string;
  uploadName: string;
}

export const DragAndDrop: FC<Props> = ({
  description = 'Файлы JPG, PNG, PDF размером не более 10 МБ',
  label,
  name,
  form,
  uploadName,
  accept = '.jpg,.jpeg,.png,.pdf',
  ...props
}) => {
  const { onUpload, onRemove, fileList, errors } = useUpload(form, uploadName, accept);

  const content = useMemo(() => {
    if (fileList.length) {
      return <UploadedDragger file={fileList[0]} onRemove={() => onRemove(fileList[0])} />;
    }

    return (
      <Dragger
        defaultFileList={fileList}
        customRequest={onUpload}
        className={css.container__dragger}
        multiple={false}
        maxCount={1}
        accept={accept}
        showUploadList={false}
        {...props}
      >
        <PlusOutlined />
        <Paragraph level={6}>Добавить</Paragraph>
      </Dragger>
    );
  }, [accept, fileList, onRemove, onUpload, props]);

  return (
    <Form.Item id={name} name={name} className={css.container} valuePropName='fileList'>
      {!!label && <Paragraph type={'secondary'}>{label}</Paragraph>}
      {content}
      {!!description && (
        <Paragraph level={6} className={css.container__description}>
          {description}
        </Paragraph>
      )}
      <Space direction={'vertical'} size={2}>
        {errors.map((error, index) => (
          <Paragraph type={'danger'} key={index}>
            {error}
          </Paragraph>
        ))}
      </Space>
    </Form.Item>
  );
};
