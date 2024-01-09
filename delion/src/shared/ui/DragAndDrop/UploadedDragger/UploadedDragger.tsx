import type { FC } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Avatar, Button, Flex, Space } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './UploadedDragger.module.scss';

interface Props {
  file: UploadFile;
  onRemove: () => void;
}

export const UploadedDragger: FC<Props> = ({ file, onRemove }) => {
  return (
    <Flex justify={'space-between'} align={'center'} className={css.root}>
      <Space size={16}>
        <Avatar size={80} src={file.url} shape='square' />
        <Paragraph type={'secondary'}>
          <a href={file.url} target='_blank' rel='noreferrer'>
            {file.name}
          </a>
        </Paragraph>
      </Space>
      <Paragraph type={'secondary'}>{file.size}</Paragraph>
      <Button onClick={onRemove} icon={<DeleteOutlined />} type={'text'} danger />
    </Flex>
  );
};
