import type { ListProps } from 'antd';
import { Grid, List, Space } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './DreamersMetaList.module.scss';

type DreamerMetaListDataSource = {
  title: string;
  value: string;
};

type DreamersMetaList = ListProps<DreamerMetaListDataSource>;

export const DreamersMetaList = (props: DreamersMetaList) => {
  const breakpoints = Grid.useBreakpoint();
  return (
    <List
      dataSource={props.dataSource}
      itemLayout={breakpoints.xs ? 'vertical' : 'horizontal'}
      renderItem={(item, index) => {
        if (!item.value) {
          return null;
        }

        return (
          <List.Item key={`${item.title}-${index}`}>
            <Space
              styles={{ item: { width: '100%', display: 'flex', alignItems: 'flex-start' } }}
              align='start'
              direction={breakpoints.xs ? 'vertical' : 'horizontal'}
            >
              <Paragraph className={css.metaTitle}>{item.title}</Paragraph>
              <Paragraph className={css.metaValue}>{item.value}</Paragraph>
            </Space>
          </List.Item>
        );
      }}
    />
  );
};
