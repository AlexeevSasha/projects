import { useMemo, type FC } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import type { FormInstance, FormItemProps } from 'antd';
import { Form, Grid, Input, Space, Upload } from 'antd';
import type { DraggerProps } from 'antd/lib/upload';
import { useUpload } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import css from './DreamerDragger.module.scss';
import { DreamerPhotoUploaded } from './DreamerPhotoUploaded/DreamerPhotoUploaded';

const { Dragger } = Upload;

interface Props extends DraggerProps {
  form: FormInstance;
  rules?: FormItemProps['rules'];
}

export const DreamerDragger: FC<Props> = ({
  form,
  rules,
  accept = '.jpg,.png,.jpeg,.heic',
  ...props
}) => {
  const { onUpload, onRemove, loading, fileList, errors } = useUpload(form, 'photo', accept);
  const breakpoint = Grid.useBreakpoint();

  const content = useMemo(() => {
    if (fileList.length) {
      return (
        <DreamerPhotoUploaded
          file={fileList[0]}
          onRemove={() => {
            onRemove(fileList[0]);
          }}
        />
      );
    }

    return (
      <Dragger
        name='photo'
        disabled={loading}
        onRemove={onRemove}
        customRequest={onUpload}
        multiple={false}
        maxCount={1}
        className={css.root}
        showUploadList={false}
        accept={accept}
        {...props}
      >
        <div className={css.container}>
          <div className={css.container__preview}>
            <SmileOutlined style={{ fontSize: '24px' }} />
          </div>
          <Space
            size={8}
            align={breakpoint.md ? 'start' : 'center'}
            direction={breakpoint.md ? 'horizontal' : 'vertical'}
          >
            <Paragraph level={4}>+</Paragraph>
            <Space size={0} direction='vertical' align='start'>
              <Paragraph level={4}>Загрузить фотографию мечтателя</Paragraph>
              <Paragraph level={6}>Файлы JPG или PNG размером не более 10 МБ</Paragraph>
            </Space>
          </Space>
        </div>
      </Dragger>
    );
  }, [fileList, onRemove, onUpload, props]);

  return (
    <>
      <Form.Item rules={rules} valuePropName='fileList'>
        <Space direction={'vertical'} size={2} id='photo_id'>
          {content}
          {errors.map((error, index) => (
            <Paragraph type={'danger'} key={index}>
              {error}
            </Paragraph>
          ))}
        </Space>
      </Form.Item>
      <Form.Item rules={rules} name={'photo_id'} style={{ position: 'absolute', bottom: 34 }}>
        <Input style={{ display: 'none' }} />
      </Form.Item>
    </>
  );
};
