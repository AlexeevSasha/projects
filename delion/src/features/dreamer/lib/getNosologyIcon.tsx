import type { ReactNode } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { BrainIcon, EarIcon, EyeIcon, InvalidIcon } from '@shared/assets';

const nosology: { [key: string]: ReactNode } = {
  '1': <InvalidIcon width={16} height={16} />,
  '2': <EyeIcon width={16} height={16} />,
  '3': <EarIcon width={16} height={16} />,
  '4': <MessageOutlined />,
  '5': <BrainIcon />,
};

export const getNosologyIcon = (value: number): ReactNode => nosology[value];
