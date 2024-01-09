import type { FC } from 'react';
import { Space } from 'antd';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { Paragraph } from '@shared/ui';
import type { HintProps } from '../Hint';
import css from './ImageHint.module.scss';

interface Props extends HintProps {
  image: ImageProps['src'];
}

export const ImageHint: FC<Props> = ({ description, title, image }) => {
  return (
    <Space className={css.container} size={12} direction='vertical'>
      {!!title && <Paragraph level={4}>{title}</Paragraph>}
      {!!description && <Paragraph level={5}>{description}</Paragraph>}
      <Image src={image} alt='Иллюстрация подсказки' height={193} />
    </Space>
  );
};
