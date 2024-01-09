import React, { useCallback, useEffect } from 'react';
import type { FormInstance } from 'antd';
import { Form, Space } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import type { Application } from '@entities/application';
import { KnowledgePopover } from '@features/knowledge';
import { TitleWithDescriptionBlock } from '@features/moderator';
import type { ModeratorRates } from '@features/moderator/model/moderator';
import { useDreamers } from '@pages/moderator/lib/hook/useDreamers';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { ActivityCheck, ContactsDreamers, SubmitForm } from '@widgets/moderator';

interface IProps {
  form: FormInstance<Application>;
  setLoading: (v: boolean) => void;
  nextStep: () => void;
}

export const ModeratorDreamForm = observer(({ form, setLoading, nextStep }: IProps) => {
  const { replace } = useRouter();
  const { moderatorS, userS } = useStores();

  const setForm = useCallback((application: Application) => {
    setLoading(false);
    const check = form.getFieldValue('dreamer_moderation_rate');
    if (check) return;
    form.setFieldsValue(application);
  }, []);

  const { getDreamers, info, loaded, id, moderation_time, number_dream } = useDreamers({
    setForm,
  });

  useEffect(() => {
    const type = userS.user?.moderated_dream_application?.dream_application_id
      ? 'getDreamsModerator'
      : 'getDreamsModeratorTake';
    moderatorS[type]().then((res) => {
      !res && replace(APP_ROUTES.MODERATOR.toString());
    });
  }, []);

  const onFinish = useCallback(
    async (values: Application) => {
      setLoading(true);
      const rates: ModeratorRates[] = values.dreamer_moderation_rate.map((rate) => {
        let rateData: ModeratorRates = {
          id: rate.id,
          birth_date_ids: rate.birth_date,
          document_number_ids: rate.document_number,
          snils_number_ids: rate.snils_number,
          dream_category_ids: rate.dream_category,
          present_link_1_ids: rate.present_link_1,
          present_link_2_ids: rate.present_link_2,
          theme_specification_ids: rate.theme_specification,
          document_front_file_ids: rate.document_front_file,
          parent_fio_ids: rate.parent_fio,
          dream_mark: +rate.dream_mark,
          good_deed_mark: +rate.good_deed_mark,
          present_title: rate.present_title,
          short_dream_description: rate.short_dream_description,
          price: +rate.price,
        };
        switch (rate.dreamer?.dream_category?.type) {
          case 1: {
            delete rateData.short_dream_description;
            break;
          }
          case 2: {
            delete rateData.present_title;
            break;
          }
          case 3: {
            delete rateData.dream_mark;
            delete rateData.present_title;
            delete rateData.short_dream_description;
            delete rateData.price;
            break;
          }
        }
        return rateData;
      });
      const response = await moderatorS.submitRates(id, rates);

      if (response) {
        nextStep();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setLoading(false);
    },
    [id],
  );

  const onReject = useCallback(
    async (reason: string) => {
      moderatorS.rejectDreams(id, reason).then((res) => {
        res && replace(APP_ROUTES.MODERATOR.toString());
      });
    },
    [id],
  );

  return (
    <Space direction={'vertical'} size={'large'}>
      <TitleWithDescriptionBlock
        title={`Заявка №${number_dream || ''}`}
        description={
          'Пожалуйста, внимательно проверьте заявку. Если найдете ошибку, отметьте ее справа от поля с ошибкой. \n' +
          'Также вам нужно отметить качество заполнения разделов, названия и цену подарков.'
        }
        icon={<KnowledgePopover content={'MenuAnchor'} onClick={() => {}} size={'md'} />}
      />
      <ContactsDreamers {...info} />
      <Form onFinish={onFinish} form={form}>
        <Form.List name='dreamer_moderation_rate'>{(fields) => getDreamers(fields)}</Form.List>
        <Form.Item>
          <SubmitForm onReject={onReject} form={form} />
        </Form.Item>
      </Form>
      {loaded ? (
        <ActivityCheck
          onExtendBooking={() => moderatorS.extendBooking()}
          moderation_time={moderation_time}
        />
      ) : null}
    </Space>
  );
});
