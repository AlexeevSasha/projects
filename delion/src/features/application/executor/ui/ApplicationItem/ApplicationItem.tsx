import { InfoCircleOutlined } from '@ant-design/icons';
import { Grid, Space } from 'antd';
import cx from 'classnames';
import Link from 'next/link';
import type { Application } from '@entities/application';
import { MenuIconRight16 } from '@shared/assets';
import { APP_ROUTES } from '@shared/const';
import { pluralizedDreamersCount } from '@shared/lib/pluralize';
import { Paragraph } from '@shared/ui';
import { ApplicationItemTag } from '../ApplicationItemTag/ApplicationItemTag';
import css from './ApplicationItem.module.scss';

export const ApplicationItem = (props: Application) => {
  const breakpoints = Grid.useBreakpoint();
  const {
    id,
    is_waiting_reports,
    isApplicationExecutionTypeOrganization,
    dreamers_count = 0,
  } = props;

  const withInfoIcon = is_waiting_reports || isApplicationExecutionTypeOrganization;

  return (
    <Link href={`${APP_ROUTES.EXECUTOR_APPLICATIONS}/${props.id}`}>
      <div className={cx(css.container, { [css.isXS]: breakpoints.xs })}>
        <Space size={12}>
          {withInfoIcon && (
            <div
              className={cx(css.infoIcon, {
                [css.withReports]: is_waiting_reports,
                [css.withAvailableDelivery]: isApplicationExecutionTypeOrganization,
              })}
            >
              <InfoCircleOutlined />
            </div>
          )}
          <div className={css.itemMeta}>
            <Paragraph level={6} className={css.region}>
              {props.settlement}
            </Paragraph>
            <Space size={2}>
              <Paragraph>{`№${id}, `}</Paragraph>
              <Paragraph>{pluralizedDreamersCount(dreamers_count)}</Paragraph>
            </Space>
          </div>
        </Space>
        <div className={css.tagWrapper}>
          <ApplicationItemTag {...props} />
          <MenuIconRight16 />
        </div>
      </div>
    </Link>
  );
};
