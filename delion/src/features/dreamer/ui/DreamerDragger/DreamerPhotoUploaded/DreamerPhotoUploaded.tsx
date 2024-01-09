import type { FC } from 'react';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Avatar, Button, Space } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './DreamerPhotoUploaded.module.scss';

interface Props {
  file: UploadFile;
  onRemove: () => void;
}

export const DreamerPhotoUploaded: FC<Props> = ({ file, onRemove }) => {
  return (
    <div className={css.root}>
      <Space size={16}>
        <Avatar size={80} src={file.url} shape='square' />
        <div className={css.root__info}>
          <div className={css.root__info__status}>
            <CheckCircleOutlined className={css.root__info__icon} />
            <Paragraph level={4}>Файл успешно загружен</Paragraph>
          </div>
          <Paragraph type={'secondary'}>
            <a href={file.url} target='_blank' rel='noreferrer'>
              {file.name}
            </a>{' '}
            {file.size}
          </Paragraph>
        </div>
      </Space>
      <Button onClick={onRemove} icon={<DeleteOutlined />} type={'text'} danger />
    </div>
  );
};
