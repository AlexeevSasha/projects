import { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { type RejectApplicationReason } from '@entities/application';
import type { Dreamer } from '@entities/dreamer';
import type { UploadReportParams } from '@features/application/executor/model/executor';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { AttachReportModal } from '@widgets/executor/ui/StartExecutionModal/AttachReportModal/AttachReportModal';
import { ConfirmSelfExecuteModal } from '@widgets/executor/ui/StartExecutionModal/ConfirmSelfExecuteModal/ConfirmSelfExecuteModal';
import { PaymentCancelModal } from '@widgets/executor/ui/StartExecutionModal/PaymentCancelModal/PaymentCancelModal';
import { PaymentModal } from '@widgets/executor/ui/StartExecutionModal/PaymentModal/PaymentModal';
import { RejectApplicationModal } from '@widgets/executor/ui/StartExecutionModal/RejectApplicationModal/RejectApplicationModal';
import { ReminderSelfExecuteModal } from '@widgets/executor/ui/StartExecutionModal/ReminderSelfExecuteModal/ReminderSelfExecuteModal';
import { StartExecutionModal } from '@widgets/executor/ui/StartExecutionModal/StartExecutionModal';

const initialData: {
  isInited: boolean;
  isSelfExecuteModalConfirmOpened: boolean;
  isReminderSelfExecuteModalOpened: boolean;
  isReminderOpen: boolean;
  isPaymentModalOpened: boolean;
  isPaymentCancelModalOpened: boolean;
  isRejectModalOpen: boolean;
  isShowReportModalOpen: boolean;
  selectedDreamer?: Dreamer;
} = {
  isInited: false,
  isSelfExecuteModalConfirmOpened: false,
  isReminderSelfExecuteModalOpened: false,
  isReminderOpen: false,
  isPaymentModalOpened: false,
  isPaymentCancelModalOpened: false,
  isRejectModalOpen: false,
  isShowReportModalOpen: false,
  selectedDreamer: undefined,
};

const isReminderSelfExecutionShownForUserKey = 'reminder-shown';

export const useExecutorFlow = () => {
  const router = useRouter();
  const { applicationS, executorS } = useStores();
  const [state, setState] = useState(initialData);
  const [modal, modalContext] = Modal.useModal();

  const onUpdateState = (newState: Partial<typeof initialData>) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const onConfirmExecutionWithOriganization = useCallback(() => {
    onUpdateState({ ...initialData, isPaymentModalOpened: true });
  }, []);

  useEffect(() => {
    const isReminderShownFirstTime = localStorage.getItem(isReminderSelfExecutionShownForUserKey);

    if (
      !isReminderShownFirstTime &&
      applicationS.application.isApplicationExecutionTypeIndependent
    ) {
      onUpdateState({ isReminderOpen: true });
      localStorage.setItem(isReminderSelfExecutionShownForUserKey, 'true');
    }
  }, [applicationS.application.isApplicationExecutionTypeIndependent]);

  const onConfirmExecutionIndependent = useCallback(
    (withCaution: boolean) => {
      if (withCaution) {
        return onUpdateState({ isReminderSelfExecuteModalOpened: true });
      } else {
        executorS.changeExecutionType(applicationS.application.id);
      }
    },
    [applicationS.application.id, executorS],
  );

  const onInitFlow = useCallback(() => {
    onUpdateState({ isInited: true });
  }, []);

  const onShowReminder = useCallback(() => {
    onUpdateState({ isReminderOpen: true });
  }, []);

  const onShowRejectModal = useCallback(() => {
    onUpdateState({ isRejectModalOpen: true });
  }, []);

  const onShowAttachReportModal = useCallback(
    (id: number) => {
      const selectedDreamer = executorS.getDreamerById(id);

      onUpdateState({ isShowReportModalOpen: true, selectedDreamer });
    },
    [executorS],
  );

  const onShowPaymentCancelModal = useCallback(() => {
    onUpdateState({ isPaymentCancelModalOpened: true });
  }, []);

  const onReadyToLeaveFeedback = useCallback(() => {
    router.push({
      pathname: APP_ROUTES.EXECUTOR_APPLICATION_FEEDBACK,
      query: {
        id: applicationS.application.id,
      },
    });
  }, [applicationS.application.id, router]);

  const onDreamExecutionToggle = useCallback(
    (id: number) => {
      executorS.toggleExecutorDreamStatus(id);
    },
    [executorS],
  );

  // Начальная модалка со степами выполнения заявки через организацию.
  const startExecutionModal = useMemo(() => {
    const onInitSelfExecution = () => {
      if (applicationS.application.is_new_region) {
        onUpdateState({ isSelfExecuteModalConfirmOpened: true });
      } else {
        onUpdateState({ isReminderSelfExecuteModalOpened: true });
      }
    };

    const onCancel = () => {
      onUpdateState({ isInited: false });
    };

    return (
      <StartExecutionModal
        isOpened={state.isInited}
        onCancel={onCancel}
        onInitSelfExecution={onInitSelfExecution}
        onInitOrgExecution={onConfirmExecutionWithOriganization}
      />
    );
  }, [applicationS.application.is_new_region, onConfirmExecutionWithOriganization, state.isInited]);

  /* Модалка предупреждения что исполнение самостоятельно грозит неудобством с новыми регионами */
  const confirmNewRegionCautionsModal = useMemo(() => {
    const onCancel = () => {
      onUpdateState({ isSelfExecuteModalConfirmOpened: false });
    };

    const onConfirm = () => onConfirmExecutionIndependent(true);

    return (
      <ConfirmSelfExecuteModal
        isOpened={state.isSelfExecuteModalConfirmOpened}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );
  }, [onConfirmExecutionIndependent, state.isSelfExecuteModalConfirmOpened]);

  /* Рендер модалки информации перед принятием решения о том как будет исполняться заявка. */
  const reminderSelfExecuteModal = useMemo(() => {
    const onCancel = () => {
      if (state.isReminderOpen) {
        return onUpdateState({ isReminderOpen: false });
      }

      return onUpdateState({ isReminderSelfExecuteModalOpened: false });
    };

    return (
      <ReminderSelfExecuteModal
        isOpened={state.isReminderSelfExecuteModalOpened || state.isReminderOpen}
        isReminderWithoutActions={state.isReminderOpen}
        onCancel={onCancel}
        onConfirmOrganizationExecution={onConfirmExecutionWithOriganization}
        onConfirmSelfExecution={() => onConfirmExecutionIndependent(false)}
      />
    );
  }, [
    onConfirmExecutionIndependent,
    onConfirmExecutionWithOriganization,
    state.isReminderOpen,
    state.isReminderSelfExecuteModalOpened,
  ]);

  /* Рендер модалки оплаты */
  const paymentModal = useMemo(() => {
    const onCancel = () => {
      onUpdateState({ isPaymentModalOpened: false });
    };

    const onBack = () => {
      onUpdateState({ ...initialData, isInited: true });
    };

    return (
      <PaymentModal isOpened={state.isPaymentModalOpened} onBack={onBack} onCancel={onCancel} />
    );
  }, [state.isPaymentModalOpened]);

  /* Рендер модалки отмена оплаты */
  const paymentCancelModal = useMemo(() => {
    const onCancel = () => {
      onUpdateState({ isPaymentCancelModalOpened: false });
    };

    return <PaymentCancelModal isOpened={state.isPaymentCancelModalOpened} onCancel={onCancel} />;
  }, [state.isPaymentCancelModalOpened]);

  /* Рендер модалки отказа от заявки */
  const rejectApplicationModal = useMemo(() => {
    const onCancel = () => onUpdateState({ isRejectModalOpen: false });

    const onConfirm = async (values: { reason: RejectApplicationReason; comment?: string }) => {
      const isRejected = await executorS.rejectApplication({
        id: applicationS.application.id,
        reason: values.reason,
        comment: values?.comment,
        created: dayjs().format(),
      });

      if (isRejected) {
        const wantRedirectToDreams = await modal.confirm({
          title: 'Вы успешно отказались от желания.',
          cancelText: 'На главную',
          okText: 'Выбрать другую мечту',
        });
        wantRedirectToDreams
          ? router.push(APP_ROUTES.EXECUTOR_FIND_APPLICATIONS)
          : router.push(APP_ROUTES.EXECUTOR_APPLICATIONS);
      }
    };

    return (
      <>
        <RejectApplicationModal
          isOpened={state.isRejectModalOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
        {modalContext}
      </>
    );
  }, [
    state.isRejectModalOpen,
    modalContext,
    modal,
    executorS,
    applicationS.application.id,
    router,
  ]);

  const renderLeaveReportModal = useMemo(() => {
    const onSendReport = (params: Omit<UploadReportParams, 'id'>) => {
      const selectedDreamerId = state.selectedDreamer?.id;

      if (selectedDreamerId) {
        executorS.uploadReport({ id: selectedDreamerId, ...params }).then((isSuccessful) => {
          if (isSuccessful) {
            onUpdateState({ isShowReportModalOpen: false });
          }
        });
      }
    };

    const onCancel = () => {
      onUpdateState({ isShowReportModalOpen: false });
    };

    return (
      <AttachReportModal
        isOpened={state.isShowReportModalOpen}
        onSendReport={onSendReport}
        selectedDreamer={state.selectedDreamer}
        onCancel={onCancel}
      />
    );
  }, [executorS, state.isShowReportModalOpen, state.selectedDreamer]);

  const ExecutorModals = () => (
    <>
      {startExecutionModal}
      {confirmNewRegionCautionsModal}
      {reminderSelfExecuteModal}
      {paymentModal}
      {rejectApplicationModal}
      {renderLeaveReportModal}
      {paymentCancelModal}
    </>
  );

  return {
    onInitFlow,
    ExecutorModals,
    onShowReminder,
    onShowRejectModal,
    onDreamExecutionToggle,
    onShowAttachReportModal,
    onReadyToLeaveFeedback,
    onShowPaymentCancelModal,
  };
};
