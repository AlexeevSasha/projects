import type { FC } from 'react';
import { Divider, Space } from 'antd';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { Paragraph } from '@shared/ui';
import css from './FileListHint.module.scss';

type FileHint = {
  image: ImageProps['src'];
  description: string;
  alt?: string;
};

interface Props {
  files: FileHint[];
}

export const FileListHint: FC<Props> = ({ files }) => {
  return (
    <Space
      className={css.container}
      split={<Divider style={{ margin: '8px 0' }} />}
      direction='vertical'
      size={0}
    >
      {files.map(({ image, description, alt = 'Изображение документа' }, index) => (
        <Space key={index} size={16}>
          <Image src={image} alt={alt} width={68} />
          <Paragraph level={6}>{description}</Paragraph>
        </Space>
      ))}
    </Space>
  );
};
