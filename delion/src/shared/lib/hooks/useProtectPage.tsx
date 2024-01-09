import { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import type { Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';
import { APP_ROOT_ROUTES, APP_ROUTES } from '@shared/const';

export const useProtectPage = (
  callback: () => Promise<unknown>,
  successFn?: () => void,
  message = 'Введённые вами данные могут не сохраниться',
) => {
  const router = useRouter();

  const handleCallback = (next?: Url) => {
    callback().then(() => {
      removeListener();

      router.push(next || APP_ROOT_ROUTES.TRUSTEE);
      return;
    });
  };

  const onRouteChangeStart = (nextPath: string) => {
    const isSending = nextPath === APP_ROUTES.TRUSTEE_APPLICATION_DREAMS;
    if (nextPath) {
      Modal.confirm({
        title: isSending ? 'Подать заявку' : 'Сохранить и закрыть',
        content: isSending ? (
          <span>После подачи заявки Вы больше не сможете добавить в нее мечтателей.</span>
        ) : (
          <span>
            Вы уверены, что хотите закрыть? <br />
            Вы сможете продолжить создание заявки позже с того места, откуда закончили
          </span>
        ),
        okText: isSending ? 'Да' : 'Сохранить и закрыть',
        cancelText: isSending ? 'Вернуться' : 'Отмена',
        onOk: () => {
          handleCallback(nextPath);
          successFn?.();
        },
        width: 400,
      });
    }

    throw 'cancelRouteChange';
  };

  const beforeUnloadHandler = useCallback(
    (event: BeforeUnloadEvent) => {
      event.preventDefault();

      event.returnValue = message;

      return event;
    },
    [message],
  );

  const removeListener = () => {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
    router.events.off('routeChangeStart', onRouteChangeStart);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler);
    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      removeListener();
    };
  }, []);

  return {
    removeListener,
    handleCallback,
  };
};
