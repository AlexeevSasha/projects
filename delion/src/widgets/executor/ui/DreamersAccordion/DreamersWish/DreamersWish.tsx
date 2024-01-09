import type { ReactElement } from 'react';
import { Divider, Grid, Space } from 'antd';
import cx from 'classnames';
import { Button, Paragraph } from '@shared/ui';
import css from './DreamersWish.module.scss';

type DreamersWishProps = {
  title: string;
  description?: string;
  links?: string[];
  wishIcon?: ReactElement;
};

export const DreamersWish = (props: DreamersWishProps) => {
  const { title, wishIcon, links, description } = props;

  const breakpoints = Grid.useBreakpoint();

  return (
    <Space
      className={css.dreamerWishContainer}
      align='start'
      direction='vertical'
      split={<Divider style={{ margin: 0 }} />}
      styles={{ item: { width: '100%' } }}
      size={16}
    >
      <Space className={css.dreamerWishHeader} align='start'>
        <Paragraph>{title}</Paragraph>
        <span className={css.wishIcon}>{wishIcon}</span>
      </Space>
      {links?.some((item) => item) ? (
        <Space
          styles={{ item: { width: '100%', display: 'flex' } }}
          align='start'
          direction={breakpoints.xs ? 'vertical' : 'horizontal'}
        >
          <Paragraph className={css.linkTitle}>Ссылки на подарок</Paragraph>
          <Space direction='vertical' styles={{ item: { width: '100%', display: 'flex' } }}>
            {links.map((item) => (
              <Button
                href={item}
                key={item}
                textLink
                type='link'
                className={cx(css.buttons, { [css.isMobile]: breakpoints.xs })}
              >
                {item}
              </Button>
            ))}
          </Space>
        </Space>
      ) : null}
      <Space>{description && <Paragraph>{description}</Paragraph>}</Space>
    </Space>
  );
};
