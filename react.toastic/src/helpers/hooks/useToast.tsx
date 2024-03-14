import { useEffect } from 'react';
import { eventBustToast } from '../utils/eventBustToast';
import { EventBusNames } from '../../interfaces/enum';
import { Toast } from '../../components/Toast';
import { DetailsToastT } from '../../interfaces/toast';

interface IProps {
  setToasts: (prev: (value: Map<any, JSX.Element[]>) => Map<any, JSX.Element[]>) => void;
}

export const useToast = ({ setToasts }: IProps) => {
  const addToast = (event: CustomEvent<DetailsToastT>) => {
    setToasts((prev) => {
      const prevElements = Array.from(prev.get(event.detail.position)?.values() || []);
      return new Map(prev).set(event.detail.position, [
        ...prevElements,
        <Toast key={event.detail.id} {...event.detail} />,
      ]);
    });
  };

  const deleteToast = (event: CustomEvent<DetailsToastT>) => {
    const { position, id } = event.detail;
    setToasts((prev) => {
      const newToast = new Map(prev);
      const allElementByPosition = prev.get(position);
      if (!allElementByPosition) return newToast;
      return newToast.set(
        position,
        allElementByPosition?.filter((el) => el.props.id !== id),
      );
    });
  };

  useEffect(() => {
    eventBustToast.on(EventBusNames.OPEN, addToast);
    eventBustToast.on(EventBusNames.CLOSE, deleteToast);

    return () => {
      eventBustToast.off(EventBusNames.OPEN, addToast);
      eventBustToast.off(EventBusNames.CLOSE, deleteToast);
    };
  }, []);
};
