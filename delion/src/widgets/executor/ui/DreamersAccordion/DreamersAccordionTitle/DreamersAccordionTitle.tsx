import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { theme, Row, Col, Space } from 'antd';
import type { Dreamer } from '@entities/dreamer';
import { pluralizeYears } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import css from './DreamersAccordionTitle.module.scss';

export type DreamerAccordionTitleProps = Dreamer & {
  isActive?: boolean;
  wishIcon?: ReactElement;
  isInfoMode: boolean;
};

export const DreamersAccordionTitle = (props: DreamerAccordionTitleProps) => {
  const {
    first_name,
    isDreamExecuted,
    isDreamHasReportAttached,
    age,
    isActive,
    wishIcon,
    isInfoMode = false,
  } = props;

  const {
    token: { colorSuccess, colorTextPlaceholder, colorWarning },
  } = theme.useToken();

  const checkCircleColor = useMemo(() => {
    if (isInfoMode) {
      return null;
    }

    switch (true) {
      case isDreamExecuted:
        return <InfoCircleOutlined className={css.checkmark} style={{ color: colorWarning }} />;
      case isDreamHasReportAttached:
        return <CheckCircleFilled className={css.checkmark} style={{ color: colorSuccess }} />;

      default:
        return (
          <CheckCircleFilled className={css.checkmark} style={{ color: colorTextPlaceholder }} />
        );
    }
  }, [isDreamExecuted, isDreamHasReportAttached, isInfoMode]);

  return (
    <Row justify={isActive ? 'start' : 'space-between'} align='top'>
      <Col>
        <Space size={8} align='center' styles={{ item: { display: 'flex' } }}>
          {checkCircleColor}
          <Paragraph level={3}>{`${first_name}${isActive ? ', ' : ''}`}</Paragraph>
        </Space>
      </Col>
      <Col>
        <Space align='start'>
          <Paragraph level={3}>{`${age} ${pluralizeYears(Number(age))}`}</Paragraph>
          {isActive ? null : <span className={css.dreamerIcon}>{wishIcon}</span>}
        </Space>
      </Col>
    </Row>
  );
};
