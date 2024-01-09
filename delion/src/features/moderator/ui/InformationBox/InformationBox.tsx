import type { ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import type { FormItemProps } from 'antd';
import { Col, Form, Row, Select, Space } from 'antd';
import classNames from 'classnames';
import { cashCatalogue } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import css from './InformationBox.module.scss';

type CatalogueNameSelect =
  | 'Snils'
  | 'Agreement'
  | 'Birthday'
  | 'CategoryDocument'
  | 'Document'
  | 'DreamCategory'
  | 'PresentLink'
  | 'ThemeSpecification'
  | 'ParentInfo';

interface IInformationBoxProps extends FormItemProps {
  title: string | string[];
  description: ReactNode;
  popover?: ReactNode;
  catalogue?: CatalogueNameSelect;
  multipleContent?: boolean;
}

//если несколько полей передавать массивом
export const InformationBox = ({
  title,
  description,
  popover,
  catalogue,
  multipleContent,
  ...attr
}: IInformationBoxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const someFields = useMemo(() => {
    if (!Array.isArray(title) || !Array.isArray(description)) return null;
    return (
      <Space size={'middle'}>
        {title?.map((el, i) => (
          <Space key={i} className={css.info} direction={'vertical'}>
            <Paragraph className={css.info__title}>{el}</Paragraph>
            <div className={css.info__description}> {description[i]}</div>
          </Space>
        ))}
      </Space>
    );
  }, []);

  const setError = (error: boolean) => {
    ref.current?.classList.toggle(css.container__error, error);
  };

  return (
    <div ref={ref} className={classNames(css.container, { [css.container__error]: false })}>
      <Row align='middle' gutter={[16, 16]}>
        <Col span={24} md={15}>
          {!multipleContent ? (
            <Space className={css.info} direction={'vertical'}>
              <Paragraph className={css.info__title}>{title}</Paragraph>
              <div className={css.info__description}> {description}</div>
            </Space>
          ) : (
            someFields
          )}
        </Col>
        <Col span={catalogue ? 24 : 0} md={9}>
          {catalogue && (
            <SelectWithPopover
              setError={setError}
              {...attr}
              catalogue={catalogue}
              popover={popover}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

interface IProps extends FormItemProps {
  catalogue: CatalogueNameSelect;
  setError: (v: boolean) => void;
  popover?: ReactNode;
}

const SelectWithPopover = ({ popover, catalogue, setError, ...args }: IProps) => {
  const options = useMemo(() => cashCatalogue.get(catalogue) || [], []);

  return (
    <div
      className={classNames(css.action, {
        [css.action__popover]: popover,
      })}
    >
      <Form.Item
        noStyle
        {...args}
        rules={[
          ...(args.rules || []),
          {
            validator: (_, value) => {
              setError(!!value?.length);
              return Promise.resolve();
            },
          },
        ]}
      >
        <Select
          showSearch={false}
          mode='multiple'
          className={classNames(css.select)}
          placeholder={'Здесь нет ошибок'}
          options={options}
        />
      </Form.Item>

      {popover ? <div className={css.popover}> {popover}</div> : null}
    </div>
  );
};
