import type { FC } from 'react';
import { Flex, Grid } from 'antd';
import { StatusHint } from '@shared/ui';

interface Props {
  errors?: Option[];
  isMobile?: boolean;
}

export const ModerationErrorHint: FC<Props> = ({ errors = [], isMobile = true }) => {
  const breakpoint = Grid.useBreakpoint();
  const isHidden = isMobile && breakpoint.md;

  if (isHidden || !errors.length) return <></>;

  return (
    <Flex vertical gap={4}>
      {errors.map(({ label, value }) => (
        <StatusHint key={value} status={'warning'} text={label} />
      ))}
    </Flex>
  );
};
