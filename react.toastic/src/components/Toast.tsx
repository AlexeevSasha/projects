import { useMemo } from 'react';
import { Progress } from './Progress';
import { Icon } from './Icon';
import { Close } from './Close';
import { DetailsToastT } from '../interfaces/toast';
import { buildToast } from '../helpers/utils/getStyleToast';
import { useDebounce } from '../helpers/hooks/useDebounce';
import { eventBustToast } from '../helpers/utils/eventBustToast';

export const Toast = (props: DetailsToastT) => {
  const { toast, icon, close } = useMemo(() => buildToast(props), [props]);
  const { closeToast, closingAnimate } = useDebounce({
    animation: toast.animation,
    cb: () =>
      eventBustToast.close({
        id: props.id,
        position: props.position,
      }),
    delay: 450,
  });

  return (
    <div
      onClick={props.closeOnClick ? closeToast : undefined}
      style={{
        ...toast,
        ...closingAnimate,
        cursor: props.closeOnClick ? 'pointer' : 'default',
      }}
      className={`Toastic ${props.pauseOnHover ? 'Toastic-pauseOnHover' : ''}`}
    >
      <Icon
        color={icon.color}
        myIcon={icon.element}
        icon={props.icon}
        animateIcon={props.animateIcon}
        hiddenIcon={props.hiddenIcon}
      />
      <div className={'Toastic__content'}>
        {props.title ? <h5 className={'Toastic__title'}>{props.title}</h5> : null}
        {props.text}
      </div>
      <Close closeToast={closeToast} style={close} />
      <Progress style={icon.progress} closeToast={closeToast} timeout={props.timeout} />
    </div>
  );
};
