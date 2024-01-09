import type { FC } from 'react';
import type { DividerProps } from 'antd';
import { Divider as AntDivider } from 'antd';

interface Props extends DividerProps {
  marginTop?: number;
  marginBottom?: number;
}

export const Divider: FC<Props> = ({ marginTop = 0, marginBottom = 0, style, ...rest }) => {
  return <AntDivider {...rest} style={{ marginTop, marginBottom, ...style }} />;
};
