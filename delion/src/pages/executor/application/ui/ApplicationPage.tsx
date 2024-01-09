import type { ReactElement } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Col, Divider, Flex, Grid, Row, Space, Spin, Typography } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ApplicationStatus } from '@entities/application';
import {
  ApplicationNavigation,
  ApplicationProgress,
  ContactPerson,
} from '@features/application/executor';
import { NotificationSidebar } from '@features/sidebar/ui';
import welcomeImage from '@shared/assets/contacts-hint.png';
import { useStores } from '@shared/lib';
import { pluralizedWishesCount } from '@shared/lib/pluralize';
import type { EllipsisMenuProps } from '@shared/ui';
import { Button, DisclaimerMessage, Paragraph } from '@shared/ui';
import type { ExtendedButtonProps } from '@shared/ui/Button/Button';
import { ApplicationCompleted, DreamersAccordion } from '@widgets/executor';
import { useExecutorFlow } from '@widgets/executor/lib';
import { ApplicationLayout } from '@widgets/layout';
import css from './ApplicationPage.module.scss';

const { Title } = Typography;

export const ApplicationPage = observer(() => {
  const router = useRouter();
  const breakpoints = Grid.useBreakpoint();
  const { executorS, applicationS } = useStores();
  const [loader, setLoader] = useState(true);

  const isInfoMode = router.query.hasOwnProperty('info');

  const {
    ExecutorModals,
    onInitFlow,
    onShowReminder,
    onShowRejectModal,
    onDreamExecutionToggle,
    onShowAttachReportModal,
    onReadyToLeaveFeedback,
    onShowPaymentCancelModal,
  } = useExecutorFlow();

  const [fixedContentOffset, setFixedContentOffset] = useState<number>(0);

  const isApplicationProgressCompleted =
    applicationS.application.applicationProgressInfo?.isCompleted;

  useEffect(() => {
    setLoader(true);
    executorS.getApplication(Number(router.query.id)).finally(() => {
      setLoader(executorS.request.getApplication.loader);
    });
  }, [executorS, router.query]);

  const renderDisclaimer = useMemo(() => {
    if (!isInfoMode) {
      return null;
    }

    const disclaimerRender = getDisclaimer(
      applicationS.application.is_waiting_feedback,
      applicationS.application.isApplicationExecutionTypeOrganization,
    );

    if (disclaimerRender) {
      return <Col span={24}>{disclaimerRender}</Col>;
    }
  }, [
    applicationS.application.isApplicationExecutionTypeOrganization,
    applicationS.application.is_waiting_feedback,
    isInfoMode,
  ]);

  const renderProgress = useMemo(() => {
    if (
      !applicationS.application.isApplicationExecutionTypeIndependent ||
      applicationS.application.isApplicationIndependetAndAvailableDelivery ||
      isInfoMode
    ) {
      return null;
    }

    const buttons = () => {
      switch (true) {
        case applicationS.application.is_waiting_feedback:
          return (
            <Button fullWidth={!breakpoints.xs} type='primary' onClick={onReadyToLeaveFeedback}>
              Оставить отзыв
            </Button>
          );

        case !isApplicationProgressCompleted:
          return (
            <Button
              className={css.button_dream}
              fullWidth={!breakpoints.xs}
              type='default'
              onClick={onShowReminder}
            >
              Как исполнить заявку
            </Button>
          );

        default:
          break;
      }
    };
    return (
      <Col
        span={24}
        className={cx(css.wrapper, css.progress, {
          [css.is_fixed]: breakpoints.xs,
          [css.is_completed]: isApplicationProgressCompleted,
        })}
        ref={(node) => setFixedContentOffset(node?.offsetHeight ?? 0)}
      >
        <ApplicationProgress
          total={applicationS.application.applicationProgressInfo?.total}
          completed={applicationS.application.applicationProgressInfo?.completed}
          donePercentage={applicationS.application.applicationProgressInfo?.donePercentage}
          title={
            isApplicationProgressCompleted
              ? 'Спасибо! Вы исполнили все желания мечтателей'
              : 'Осталось исполнить'
          }
          pluralizedCounter={pluralizedWishesCount(
            applicationS.application.applicationProgressInfo?.total,
          )}
          direction='column-reverse'
          button={buttons()}
        />
      </Col>
    );
  }, [
    applicationS.application.isApplicationExecutionTypeIndependent,
    applicationS.application.isApplicationIndependetAndAvailableDelivery,
    applicationS.application.applicationProgressInfo,
    applicationS.application.is_waiting_feedback,
    isInfoMode,
    breakpoints,
    isApplicationProgressCompleted,
  ]);

  const topActions = useMemo((): ReactElement | null => {
    if (!applicationS.application.isApplicationIndependetAndAvailableDelivery || isInfoMode) {
      return null;
    }

    const actions: ExtendedButtonProps[] = [
      {
        title: 'Как исполнить заявку',
        type: breakpoints.xs ? 'link' : 'default',
        onClick: onShowReminder,
        fullWidth: true,
      },
      {
        title: 'Исполнить через организаторов',
        type: 'primary',
        onClick: onInitFlow,
        fullWidth: true,
      },
    ];

    return (
      <Col
        className={cx(css.actions, { [css.is_fixed]: breakpoints.xs })}
        span={24}
        ref={(node) => setFixedContentOffset(node?.offsetHeight ?? 0)}
      >
        <Space
          style={{ flexDirection: breakpoints.xs ? 'column-reverse' : 'row' }}
          styles={{ item: { width: '100%' } }}
        >
          {actions.map((item, index) => (
            <Button {...item} key={`${item.title}-${index}`}>
              {item.title}
            </Button>
          ))}
        </Space>
      </Col>
    );
  }, [
    applicationS.application.isApplicationIndependetAndAvailableDelivery,
    isInfoMode,
    breakpoints,
    onShowReminder,
    onInitFlow,
  ]);

  const bottomActions = useMemo((): ReactElement | null => {
    if (!applicationS.application.isApplicationExecutionTypeOrganization || isInfoMode) {
      return null;
    }

    const actions: ExtendedButtonProps[] = [
      {
        title: 'Исполнить через организаторов',
        type: 'primary',
        fullWidth: true,
        onClick: onInitFlow,
      },
    ];

    return (
      <Col
        span={24}
        className={cx(css.actions, { [css.is_fixed]: breakpoints.xs })}
        ref={(node) => setFixedContentOffset(node?.offsetHeight ?? 0)}
      >
        <Space styles={{ item: { width: '100%' } }}>
          {actions.map((action, index) => (
            <Button {...action} key={index}>
              {action.title}
            </Button>
          ))}
        </Space>
      </Col>
    );
  }, [
    applicationS.application.isApplicationExecutionTypeOrganization,
    isInfoMode,
    onInitFlow,
    breakpoints,
  ]);

  const applicationNavigation = useMemo(() => {
    const ellipsisMenuConfig: EllipsisMenuProps['items'] = [
      {
        title: 'Памятка для исполнителя',
        onClick: onShowReminder,
      },
    ];

    //проверка, если можно сделать возврат средств
    const checkPay = applicationS.application?.payments?.some((el) => !el.is_expired);
    if (
      checkPay &&
      applicationS.application.is_paid &&
      applicationS.application.status == ApplicationStatus.IN_EXECUTE
    ) {
      ellipsisMenuConfig.push({
        title: 'Вернуть оплату',
        titleColor: 'danger',
        onClick: onShowPaymentCancelModal,
      });
    }

    if (applicationS.application.isApplicationRejectable) {
      ellipsisMenuConfig.push({
        title: 'Отказаться',
        titleColor: 'danger',
        onClick: onShowRejectModal,
      });
    }

    return (
      <Col span={24}>
        <ApplicationNavigation
          applicationId={applicationS.application?.id}
          settlement={applicationS.application?.settlement}
          ellipsisMenuConfig={ellipsisMenuConfig}
          isInfoMode={isInfoMode}
        />
      </Col>
    );
  }, [
    applicationS.application?.id,
    applicationS.application?.settlement,
    applicationS.application?.payments,
    onShowReminder,
    applicationS.application.isApplicationRejectable,
    isInfoMode,
  ]);

  if (loader) {
    return (
      <Spin style={{ maxHeight: '100%' }} spinning={loader}>
        <div style={{ height: '100vh' }} />
      </Spin>
    );
  }

  const applicationContent = (
    <Row
      style={{
        width: '100%',
        paddingBottom: breakpoints.xs ? fixedContentOffset : 16,
      }}
      gutter={[0, 24]}
    >
      {!breakpoints.xs ? applicationNavigation : null}
      {!breakpoints.xs && (
        <Col span={24}>
          <Divider style={{ margin: 0 }} />
        </Col>
      )}

      {topActions}
      {renderDisclaimer}
      {renderProgress}

      <Col span={24} className={cx(css.wrapper, css.transparent)}>
        <ContactPerson
          fullName={applicationS.application.agent_fio}
          phone={applicationS.application.agent_phone}
        />
      </Col>

      <Col span={24}>
        <DreamersAccordion
          onDreamExecutionToggle={onDreamExecutionToggle}
          onShowAttachReportModal={onShowAttachReportModal}
          isInfoMode={isInfoMode}
        />
      </Col>

      {bottomActions}
    </Row>
  );

  const applicationCompletedContent = (
    <Row
      style={{
        width: '100%',
        paddingBottom: breakpoints.xs ? fixedContentOffset : 16,
      }}
      gutter={[0, 24]}
    >
      {!breakpoints.xs ? applicationNavigation : null}
      <Col span={24}>
        <ApplicationCompleted />
      </Col>
    </Row>
  );

  // TODO: Move to separate component when Logistic Center Component will be ready to implement.
  const organizationExecutionInProgressContent = (
    <Row
      style={{
        width: '100%',
        paddingBottom: breakpoints.xs ? fixedContentOffset : 16,
      }}
      gutter={[0, 24]}
    >
      {!breakpoints.xs ? applicationNavigation : null}
      <Col span={24} className={css.wrapper}>
        <Space size={12}>
          <Image height={60} src={welcomeImage} alt='Приветственная иллюстрация' />
          <Flex vertical align='baseline'>
            <Title level={5}>Заявка исполняется</Title>
            <Paragraph style={{ textAlign: 'left' }}>
              Вы перевели деньги на исполнение этого желания. Здесь вы можете отследить статус этой
              заявки
            </Paragraph>
          </Flex>
        </Space>
      </Col>
    </Row>
  );

  const renderContent = () => {
    switch (true) {
      case applicationS.application.isApplicationExecuted && !isInfoMode:
        return applicationCompletedContent;

      case applicationS.application.isApplicationInExecute:
        return organizationExecutionInProgressContent;

      default: {
        return applicationContent;
      }
    }
  };

  return (
    <>
      <ApplicationLayout
        header={breakpoints.xs ? applicationNavigation : null}
        content={renderContent()}
        sidebar={<NotificationSidebar />}
        contentBackground={'transparent'}
        isLoading={loader}
      />
      <ExecutorModals />
    </>
  );
});

function getDisclaimer(isWaitingFeedback: boolean, isTypeOrganization: boolean) {
  switch (true) {
    case isWaitingFeedback:
      return <DisclaimerMessage disclaimer='Не забудьте оставить отзыв' color='warning' />;

    case isTypeOrganization:
      return (
        <DisclaimerMessage
          disclaimer='Обратите внимание, что эту заявку можно исполнить через организаторов'
          color='organization'
        />
      );

    default:
      return null;
  }
}
