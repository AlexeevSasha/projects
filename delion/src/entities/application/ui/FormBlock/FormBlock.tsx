import type { FC, ReactNode } from 'react';
import { Col, Flex, Grid, Row, Space, Typography } from 'antd';
import classNames from 'classnames';
import { ApplicationStatus } from '@entities/application';
import { useStores } from '@shared/lib';
import { Paragraph, PopupHint, StatusHint } from '@shared/ui';
import type { PopupHintProps } from '@shared/ui';
import css from './FormBlock.module.scss';

const { Title } = Typography;

interface Props {
  id?: string;
  title?: string;
  description?: string | ReactNode;
  children: ReactNode;
  hints?: ReactNode[] | ReactNode;
  hintAlign?: Omit<AlignSetting, 'left' | 'right'>;
  absolute?: boolean;
  errors?: Option[];
  titleHint?: PopupHintProps;
}

export const FormBlock: FC<Props> = ({
  id,
  children,
  hints,
  title,
  titleHint,
  description,
  absolute = true,
  hintAlign = 'start',
  errors = [],
}) => {
  const { applicationS } = useStores();
  const breakpoint = Grid.useBreakpoint();

  const isModeration = applicationS.application.status === ApplicationStatus.NEED_REVISION;

  return (
    <Row wrap={false} className={css.container} gutter={16}>
      <Col id={!title ? id : `form-block-${id}`} flex={'auto'} className={css.container__formSide}>
        {title && (
          <Flex id={id} align='start' justify={'space-between'}>
            <Title level={5}>{title}</Title>
            {!breakpoint.md && !!titleHint && <PopupHint {...titleHint} />}
          </Flex>
        )}
        <div className={css.container__formSide__content}>
          {description && <Paragraph level={5}>{description}</Paragraph>}
          <div className={css.container__formSide__content__inputs}>{children}</div>
        </div>
      </Col>
      {breakpoint.md && (
        <Col
          span={10}
          className={classNames(css.container__hintSide, css[`container__hintSide_${hintAlign}`])}
        >
          {isModeration ? (
            !!errors.length && (
              <StatusHint
                status={'warning'}
                text={
                  <Flex vertical>
                    {errors.map((error, index) => (
                      <Paragraph
                        key={index}
                        style={{ display: 'inline-block', lineHeight: '10px' }}
                        level={6}
                      >
                        {error.label}
                      </Paragraph>
                    ))}
                  </Flex>
                }
              />
            )
          ) : (
            <div
              className={classNames(css.container__hintSide__hint, {
                [css.container__hintSide__hint_absolute]: absolute,
              })}
            >
              <Space size={12} direction='vertical'>
                {Array.isArray(hints)
                  ? hints.map((item, index) => <div key={index}>{item}</div>)
                  : hints}
              </Space>
            </div>
          )}
        </Col>
      )}
    </Row>
  );
};
