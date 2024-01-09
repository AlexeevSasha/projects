import type { ReactNode } from 'react';
import { useRef } from 'react';
import type { FormItemProps } from 'antd';
import { Col, Form, Row } from 'antd';
import classNames from 'classnames';
import { Paragraph } from '@shared/ui';
import css from './TitleWithInputBox.module.scss';

interface ITitleWithInputBoxProps extends FormItemProps {
  title: string;
  input: ReactNode;
  strong?: boolean;
  isBackground?: boolean;
  popover?: ReactNode;
}

export const TitleWithInputBox = ({
  title,
  input,
  strong,
  isBackground,
  popover,
  ...attr
}: ITitleWithInputBoxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const setSuccess = (success: boolean) => {
    if (!isBackground) return;
    ref.current?.classList.toggle(css.container__success, success);
  };

  return (
    <div ref={ref} className={classNames(css.container)}>
      <Row gutter={[16, 8]} align={'middle'}>
        <Col className={css.title} md={15} span={24}>
          <Paragraph level={4} strong={strong}>
            {title}
          </Paragraph>
        </Col>
        <Col md={9} span={24}>
          <div
            className={classNames(css.background, {
              [css.background__popover]: popover,
            })}
          >
            <Form.Item
              {...attr}
              rules={[
                ...(attr.rules || []),
                {
                  validator: (_, value) => {
                    setSuccess(!!value);
                    return Promise.resolve();
                  },
                },
              ]}
              style={{ margin: 0 }}
            >
              {input}
            </Form.Item>
            {popover ? <div>{popover}</div> : null}
          </div>
        </Col>
      </Row>
    </div>
  );
};
