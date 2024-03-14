import { CloseIcon } from './icons/CloseIcon';

interface IProps {
  style: { background: string };
  closeToast: () => void;
}

export const Close = ({ style, closeToast }: IProps) => {
  return (
    <button onClick={closeToast} className={'Toastic__close'}>
      <CloseIcon color={style.background} />
    </button>
  );
};
