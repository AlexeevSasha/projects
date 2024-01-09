import type { ReactElement } from 'react';
import { Col, Flex, Grid, Row, Spin } from 'antd';
import type { ColProps } from 'antd/lib';
import cx from 'classnames';
import css from './ApplicationLayout.module.scss';

export type ApplicationLayoutProps = {
  header?: ReactElement | null;
  content?: ReactElement;
  sidebar?: ReactElement | null;
  filters?: ReactElement | null;
  isLoading?: boolean;
  contentBackground?: 'transparent' | 'white';
  contentCols?: ColProps['span'];
};

export const ApplicationLayout = (props: ApplicationLayoutProps) => {
  const {
    header,
    filters,
    content,
    sidebar,
    contentBackground = 'white',
    isLoading = false,
    contentCols = 18,
  } = props;

  const breakpoints = Grid.useBreakpoint();

  const isSidebarAsColumn = breakpoints.lg && sidebar;

  return (
    <>
      {isLoading ? (
        <div className={css.spinWrapper}>
          <Spin spinning={isLoading} className={css.spinner} />
        </div>
      ) : null}
      <Flex gap={16} vertical className={cx(css.container, { [css.isLoading]: isLoading })}>
        {header}
        <Row gutter={[{ sm: 16 }, 16]} justify='center'>
          <Col span={isSidebarAsColumn ? contentCols : 24} offset={18 - Number(contentCols)}>
            {filters && <div className={cx(css.filters)}>{filters}</div>}
            <div className={cx(css.content, css[contentBackground])}>{content}</div>
          </Col>
          {sidebar && <Col span={isSidebarAsColumn ? 6 : 24}>{sidebar}</Col>}
        </Row>
      </Flex>
    </>
  );
};
