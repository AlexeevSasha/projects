import { useCallback, useEffect, useMemo, useState } from 'react';
import { InfoCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import type { Application } from '@entities/application';
import { ApplicationStatus } from '@entities/application';
import { ApplicationCancel } from '@features/application/trustee';
import { DreamerCollapseTitle, editCheckDreams } from '@features/dreamer';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Collapse, Paragraph } from '@shared/ui';
import { DreamerFeedbackCard } from '@widgets/dreamer/ui/DreamerCheckInformation/ui/DreamerFeedbackCard/DreamerFeedbackCard';
import { DreamerReportCard } from '@widgets/dreamer/ui/DreamerCheckInformation/ui/DreamerReportCard/DreamerReportCard';
import css from './DreamerCheckInformation.module.scss';
import { DreamerContactsCard } from './ui/DreamerContactsCard/DreamerContactsCard';
import { DreamerInfoCard } from './ui/DreamerInfoCard/DreamerInfoCard';

interface IProps {
  isBack: boolean;
  next: () => void;
  fromTrustee?: boolean;
}

export const DreamerCheckInformation = ({ next, isBack, fromTrustee }: IProps) => {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(true);
  const {
    trusteeS,
    applicationS: { application },
    userS,
  } = useStores();

  useEffect(() => {
    const applicationId = userS.user?.dream_application_id || application.id;

    // TODO add redirect if no application
    if (applicationId) setLoading(false);

    trusteeS
      .getApplication(applicationId)
      .then((res) => {
        !isBack && res?.confirmation_code && next();
      })
      .finally(() => setLoading(false));
  }, [userS.user?.dream_application_id, isBack, application.id, trusteeS, next]);

  const items = useMemo(() => {
    const dreamer = application.dreamers.map((dreamer) => ({
      key: String(dreamer.id),
      label: (
        <DreamerCollapseTitle
          dream_category={dreamer.dream_category}
          id={dreamer.id}
          title={`${dreamer.first_name} ${dreamer.last_name} ${dreamer.middle_name}`}
        />
      ),
      children: <DreamerInfoCard key={dreamer.id} {...dreamer} />,
      id: `dreamer${dreamer.id}`,
    }));

    const contact = {
      key: 'contact',
      label: 'Контакты',
      id: 'dreamercontacts',
      children: (
        <DreamerContactsCard
          isEdit={editCheckDreams(application.status)}
          agent_phone={application.agent_phone}
          agent_email={application.agent_email}
          settlement={application.settlement}
        />
      ),
    };

    const otherItems = [];

    if (application.trustee_feedback) {
      otherItems.push({
        key: 'feedback',
        label: 'Отзыв',
        id: 'dreamerfeedback',
        children: <DreamerFeedbackCard trustee_feedback={application.trustee_feedback} />,
      });
    }

    if (application.report_text) {
      otherItems.push({
        key: 'report',
        label: 'Отчёт об исполнении',
        id: 'dreamerreport',
        children: (
          <DreamerReportCard report_text={application.report_text} report={application.report} />
        ),
      });
    }

    return [contact, ...dreamer, ...otherItems];
  }, [application]);

  const collapseProps = useMemo(() => {
    const props: CollapseProps = {
      items: items,
    };

    if (!fromTrustee) return props;

    if (application?.trustee_feedback || application?.report_text) {
      props.defaultActiveKey = ['feedback', 'report'];
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
    }

    return props;
  }, [fromTrustee, items]);

  const onCancelDream = useCallback(async () => {
    trusteeS.cancelDreams().then((res) => {
      res && replace(APP_ROUTES.TRUSTEE.toString());
    });
  }, []);

  return (
    <Spin spinning={loading}>
      <InformationTitle onCancel={onCancelDream} {...application} />
      {!loading && <Collapse showTitleWhenClose {...collapseProps} />}
      {editCheckDreams(application.status) && (
        <Space size={'middle'} className={css.buttons}>
          <Button
            onClick={() => replace(APP_ROUTES.TRUSTEE_APPLICATION.toString())}
            icon={<LeftOutlined style={{ fontSize: 14 }} />}
            fullWidth
          >
            Вернуться к заявке
          </Button>
          <Button onClick={next} fullWidth type='primary'>
            Все верно <RightOutlined style={{ fontSize: 14 }} />
          </Button>
        </Space>
      )}
    </Spin>
  );
};

interface InformationTitleProps extends Application {
  onCancel: () => Promise<void>;
}

const InformationTitle = ({ onCancel, ...props }: InformationTitleProps) => {
  if (editCheckDreams(props.status)) {
    return (
      <Space align={'start'} size={'middle'} className={css.helper}>
        <InfoCircleOutlined />
        <Paragraph>
          Пожалуйста, внимательно проверьте заявку и не допускайте ошибок. <br /> После того, как вы
          подадите её, исправить ошибки будет нельзя.
        </Paragraph>
      </Space>
    );
  }
  return (
    <Space style={{ justifyContent: 'space-between' }} className={css.helper}>
      <Space direction={'vertical'} align={'start'} size={0}>
        <Paragraph level={4}>Ваша заявка №{props.id}</Paragraph>
        <Paragraph className={css.helper__description}>
          от {props.created && dayjs(props.created || '').format('DD.MM.YYYY')}
        </Paragraph>
      </Space>
      {[ApplicationStatus.WAIT_MODERATION, ApplicationStatus.NEED_REVISION].includes(
        props.status,
      ) && (
        <ApplicationCancel
          withoutPopover
          button={<Button type={'primary'}>Отменить заявку</Button>}
          onCancel={onCancel}
        />
      )}
    </Space>
  );
};
