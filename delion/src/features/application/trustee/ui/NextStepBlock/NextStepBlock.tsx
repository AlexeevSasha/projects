import { useEffect, type FC, useState } from 'react';
import { ArrowRightOutlined, CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Flex, Grid, Space, Typography } from 'antd';
import { useWatch } from 'rc-field-form';
import type { Application } from '@entities/application';
import type { Dreamer } from '@entities/dreamer';
import { APP_ROUTES } from '@shared/const';
import { nextStepInfo } from '@shared/const/nextStepInfo';
import { objectKeys, scrollToElementId, useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import css from './NextStepBlock.module.scss';

const { Title } = Typography;

interface Props {
  onClick: () => void;
  onAddDreamer: () => void;
  form: FormInstance;
  title?: string;
  hidden?: boolean;
  step?: keyof typeof nextStepInfo;
}

export const NextStepBlock: FC<Props> = ({
  onClick,
  onAddDreamer,
  title = 'Начните заполнять данные',
  form,
  hidden = false,
  step,
}) => {
  const { applicationS } = useStores();
  const values: Record<keyof Application | keyof Dreamer, unknown> = useWatch([], { form });
  const [fieldCount, setFieldCount] = useState(0);
  const breakpoint = Grid.useBreakpoint();

  const requiredFields = new Set([
    'agent_phone',
    'settlement',
    'last_name',
    'first_name',
    'birth_date',
    'photo_id',
    'document_number',
    'document_file_id',
    // 'agreement_file_id',
    'category_id',
    'document_front_file_id',
    'document_back_file_id',
    'dreamer_info',
    'interest_ids',
    'participation_experience',
    'achievements',
    'cherished_desire',
    'dream_category_id',
    'theme_id',
    'theme_specification_id',
    'dream_description',
    'parent_fio',
    'parent_birth_date',
    'parent_settlement',
    'parent_address',
    'parent_snils_number',
    'good_deed_category_id',
  ]);

  if (!applicationS.application.is_new_region) {
    requiredFields.add('snils_number');
    requiredFields.add('snils_file_id');
  }

  if (form.getFieldValue('wish_type') === 1) {
    requiredFields.add('present_link_1');
    requiredFields.add('present_link_2');
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      let count = 0;

      if (values === undefined) return;
      console.log(form.getFieldsValue());

      objectKeys(values).forEach((key) => {
        const value = values[key];
        if ((!values[key] || (Array.isArray(value) && !value.length)) && requiredFields.has(key)) {
          if (Array.isArray(value) && value.length) {
            return;
          }

          if (value?.hasOwnProperty('$d')) return;

          count++;
        }
      });

      setFieldCount(count);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [applicationS.application.is_new_region, values]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if there's a hash fragment in the URL
      if (window.location.hash) {
        // Use history.replaceState to replace the current URL without the hash fragment
        history.replaceState(
          null,
          document.title,
          window.location.pathname + window.location.search,
        );
      }
    };

    // Add an event listener to listen for scroll events
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (hidden) return <></>;

  const onNext = async () => {
    const emptyRequired = objectKeys(values).find((fieldName) => {
      const value = values[fieldName];

      if (value && typeof value == 'number') {
        return false;
      }

      if ((Array.isArray(value) || typeof value == 'string') && value.length) return false;

      if (value && typeof value === 'object' && value.hasOwnProperty('$d')) return false;

      return requiredFields.has(fieldName);
    });

    console.log(values, emptyRequired);

    if (!emptyRequired) return;

    form.setFields([{ name: emptyRequired, errors: ['Поле обязательно для заполнения'] }]);

    scrollToElementId(emptyRequired);
  };

  if (fieldCount < 1 && applicationS.isFullFilled) {
    return (
      <Flex className={css.filled} vertical gap={24}>
        <Space align='start'>
          <CheckCircleOutlined className={css.filled__icon} />
          <div className={css.container__text}>
            <Title level={5}>Поздравляем, заявка заполнена!</Title>
            <Paragraph level={6}>Вы можете добавить еще мечтателя, либо отправить заявку</Paragraph>
          </div>
        </Space>
        <Flex gap={16} vertical={!breakpoint.md} wrap={'wrap'} style={{ width: '100%' }}>
          <Button
            type={'primary'}
            block
            htmlType='submit'
            href={APP_ROUTES.TRUSTEE_APPLICATION_DREAMS}
          >
            Отправить заявку <ArrowRightOutlined />
          </Button>
          <Button onClick={onAddDreamer}>
            <PlusOutlined /> Новый мечтатель
          </Button>
        </Flex>
      </Flex>
    );
  }

  if (fieldCount === 0) {
    return (
      <div className={css.filled}>
        <Space align={'start'}>
          <CheckCircleOutlined className={css.filled__icon} />
          <div className={css.container__text}>
            <Paragraph>Вы закончили этот раздел</Paragraph>
            <Paragraph level={6}>
              {step ? nextStepInfo[step].text : 'Перейти к следующему разделу'}
            </Paragraph>
          </div>
        </Space>
        <Button
          block={!breakpoint.md}
          type={'primary'}
          htmlType='submit'
          onClick={async () => {
            await onClick();
            await onNext();
          }}
        >
          {step ? nextStepInfo[step].buttonText : 'Перейти'} <ArrowRightOutlined />
        </Button>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.container__text}>
        <Paragraph>{title}</Paragraph>
        <Paragraph level={6}>{`Вам нужно заполнить информацию в ${fieldCount} пол${
          fieldCount % 10 === 1 ? 'е' : 'ях'
        }`}</Paragraph>
      </div>
      <Button htmlType='submit' onClick={onNext}>
        Продолжить заполнять
      </Button>
    </div>
  );
};
