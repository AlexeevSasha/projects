import { ToastT } from '../interfaces/toast';

type Props = Pick<ToastT, 'animateIcon' | 'hiddenIcon' | 'icon'> & {
  myIcon: JSX.Element;
  color: string;
};

export const Icon = ({ color, myIcon, animateIcon, hiddenIcon, icon }: Props) => {
  if (hiddenIcon) return null;

  return (
    <div className={'Toastic-icon' + `${animateIcon ? ' animate' : ''}`}>
      {icon || myIcon}
      {animateIcon && !icon ? (
        <div style={{ borderColor: color }} className={'Toastic-icon__circle'}></div>
      ) : null}
    </div>
  );
};
