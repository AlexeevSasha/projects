import { useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import type { Application } from '@entities/application';
import css from './ActivityCheck.module.scss';

const inactiveTime = 5 * 60 * 1000;
const checkTime = 5 * 60 * 1000;

let secondTimerId: NodeJS.Timeout;

interface IProps extends Pick<Application, 'moderation_time'> {
  onExtendBooking: () => Promise<void>;
}

export const ActivityCheck = ({ moderation_time, onExtendBooking }: IProps) => {
  const { replace } = useRouter();
  const [modal, contextHolder] = Modal.useModal();

  const showConfirm = () => {
    const instance = modal.warning({
      title: 'Вы все ещё тут?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content:
        'Пожалуйста, нажмите кнопку, чтобы подтвердить ваше присутствие. В противном случае заявка будет автоматически отменена',
      onOk() {
        secondTimerId && clearTimeout(secondTimerId);
        onExtendBooking().then(() => {
          firstTimer(checkTime);
        });
      },
      okText: 'Я все ещё тут',
      className: css.container,
    });
    secondTimerId = setTimeout(async () => {
      replace('/moderator').then(() => instance.destroy());
    }, inactiveTime);
  };

  const firstTimer = (time: number) => setTimeout(showConfirm, time);

  useEffect(() => {
    // Найди разницу в миллисекундах c текущей датой
    const time = dayjs(moderation_time).diff(dayjs(), 'millisecond');
    firstTimer(time);

    return () => {
      secondTimerId && clearTimeout(secondTimerId);
    };
  }, []);

  return contextHolder;
};
