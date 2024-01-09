import type { FC, ReactNode } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Grid } from 'antd';
import { drawer } from '@shared/ui/popup';
import css from './PopupHint.module.scss';

export interface PopupHintProps {
  title: ReactNode;
  body?: ReactNode;
  mobileOnly?: boolean;
}

export const PopupHint: FC<PopupHintProps> = ({ title, body, mobileOnly = true }) => {
  const breakpoint = Grid.useBreakpoint();

  const openPopup = () => {
    drawer.open(body, { title });
  };

  if (mobileOnly && breakpoint.md) {
    return '';
  }

  return <QuestionCircleOutlined className={css.icon} onClick={openPopup} />;
};
