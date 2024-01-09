import type { ReactNode } from 'react';
import { type FC } from 'react';
import { CheckCircleOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { FormInstance, FormItemProps, UploadProps } from 'antd';
import { Upload as AntdUpload, Button, Form, Grid, Input, Space } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useUpload } from '@shared/lib';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import css from './Upload.module.scss';

interface Props extends UploadProps {
  form: FormInstance;
  name: string;
  uploadName: string;
  rules?: FormItemProps['rules'];
  extra?: ReactNode;
}

export const Upload: FC<Props> = observer(
  ({ name, uploadName, form, accept = '.jpg,.jpeg,.png,.pdf,.heic', ...props }) => {
    const { onUpload, fileList, onRemove, loading, errors } = useUpload(form, uploadName, accept);
    const breakpoint = Grid.useBreakpoint();

    return (
      <div>
        <Form.Item valuePropName='fileList' style={{ width: '100%' }}>
          {fileList.length ? (
            <div className={classNames(css.button, css.button__uploaded)}>
              <div className={css.button__uploaded__info}>
                <CheckCircleOutlined className={css.button__uploaded__info__icon} />
                <a
                  className={css.button__uploaded__info__text}
                  href={fileList[0].url}
                  target='_blank'
                  rel='noreferrer'
                >
                  {fileList[0].name}
                </a>
              </div>
              <Button
                onClick={() => {
                  onRemove(fileList[0]);
                }}
                size={'small'}
                type={'text'}
                danger
                icon={<DeleteOutlined />}
              />
            </div>
          ) : (
            <AntdUpload
              name={uploadName}
              customRequest={onUpload}
              multiple={false}
              maxCount={1}
              showUploadList={false}
              accept={accept}
              className={css.upload}
              {...props}
            >
              <Space
                direction={'vertical'}
                size={2}
                style={{ width: breakpoint.md ? 'min-content' : '100%' }}
              >
                <Button
                  id={name}
                  className={css.button}
                  loading={loading}
                  block
                  icon={<UploadOutlined />}
                >
                  Загрузить файл
                </Button>
                {errors.map((error, index) => (
                  <Paragraph type={'danger'} key={index}>
                    {error}
                  </Paragraph>
                ))}
              </Space>
            </AntdUpload>
          )}
        </Form.Item>
        <Form.Item name={name} noStyle style={{ display: 'none' }}>
          <Input style={{ display: 'none' }} />
        </Form.Item>
      </div>
    );
  },
);
