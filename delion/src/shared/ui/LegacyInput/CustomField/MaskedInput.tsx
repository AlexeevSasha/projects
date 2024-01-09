import type { BaseSyntheticEvent, FocusEvent, KeyboardEvent } from 'react';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import type { InputStatus } from 'antd/es/_util/statusUtils';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import type { NamePath } from 'antd/lib/form/interface';
import type { InputProps } from 'antd/lib/input';
import Input from 'antd/lib/input';
import type { AnyMaskedOptions } from 'imask';
import IMask from 'imask';
import { observer } from 'mobx-react';

export interface MaskedInputProps extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> {
  mask: MaskType;
  definitions?: InputMaskOptions['definitions'];
  value?: string;
  defaultValue?: string;
  maskOptions?: InputMaskOptions;
  onChange?: (event: MaskedEvent<HTMLInputElement>) => void;
  molForm?: FormInstance;
  handleStatusChange?: (value: InputStatus) => void;
  fullName?: NamePath;
  molPattern?: RegExp;
}

export { IMask };

export const MaskedInput = observer(
  forwardRef<InputRef, MaskedInputProps>(function MolMaskedInput(props: MaskedInputProps, antdRef) {
    const {
      mask,
      maskOptions: _maskOptions,
      value: _value,
      defaultValue,
      definitions,
      ...antdProps
    } = props;

    const {
      molPattern,
      status = 'error',
      molForm,
      fullName,
      handleStatusChange,
      ...otherAntdProps
    } = antdProps;
    const [fieldStatus, setFieldStatus] = useState<InputStatus>('');

    useEffect(() => {
      setFieldStatus(status);
    }, [status]);

    const innerRef = useRef<HTMLInputElement | null>(null);

    const maskOptions = useMemo(() => {
      return {
        mask,
        definitions: {
          '0': /[0-9]/,
          ..._maskOptions?.definitions,
          ...definitions,
        },
        lazy: true, // make placeholder always hidden
        ..._maskOptions,
      } as AnyMaskedOptions;
    }, [mask]);

    const placeholder = useMemo(() => {
      return IMask.createPipe({ ...maskOptions, lazy: false })('');
    }, [maskOptions]);

    const imask = useRef<IMask.InputMask<AnyMaskedOptions> | null>(null);

    const propValue = (typeof _value === 'string' ? _value : defaultValue) || '';

    const lastValue = useRef(propValue);

    const [value, setValue] = useState(propValue);

    const _onEvent = useCallback(
      (ev: MaskedEvent<HTMLInputElement>, execOnChangeCallback = false) => {
        const masked = imask.current;
        if (!masked) return;

        if (ev.target) {
          if (ev.target.value !== masked.value) {
            masked.value = ev.target.value;
            ev.target.value = masked.value;
            lastValue.current = masked.value;
          }
        }

        Object.assign(ev, {
          maskedValue: masked.value,
          unmaskedValue: masked.unmaskedValue,
        });

        masked.updateValue();
        setValue(lastValue.current);

        if (execOnChangeCallback) {
          props.onChange?.(ev);
        }
      },
      [],
    );

    const _onAccept = useCallback((ev: OnChangeEvent) => {
      if (!ev?.target) return;

      const input = innerRef.current;
      const masked = imask.current;
      if (!input || !masked) return;

      ev.target.value = masked.value;
      input.value = masked.value;
      lastValue.current = masked.value;

      _onEvent(ev, true);
    }, []);

    function updateMaskRef() {
      const input = innerRef.current;

      if (imask.current) {
        imask.current.updateOptions(maskOptions);
      }

      if (!imask.current && input) {
        imask.current = IMask<AnyMaskedOptions>(input, maskOptions);
        imask.current.on('accept', _onAccept);
      }

      if (imask.current && imask.current.value !== lastValue.current) {
        imask.current.value = lastValue.current;
        imask.current.alignCursor();
      }
    }

    function updateValue(value: string) {
      lastValue.current = value;
      const input = innerRef.current;
      const masked = imask.current;
      if (!(input && masked)) return;
      masked.value = value;
      // updating value with the masked
      //   version (imask.value has a setter that triggers masking)
      input.value = masked.value;
      lastValue.current = masked.value;
    }

    useEffect(() => {
      updateMaskRef();

      return () => {
        imask.current?.destroy();
        imask.current = null;
      };
    }, [mask]);

    useEffect(() => {
      updateValue(propValue);
      const err =
        (!lastValue.current && molForm?.getFieldError(fullName).length) ||
        (lastValue.current && !molPattern?.test(lastValue.current))
          ? 'error'
          : '';
      setFieldStatus(err);
      handleStatusChange?.(err);
    }, [propValue]);

    const eventHandlers = useMemo(() => {
      return {
        onBlur(ev: FocusEvent<HTMLInputElement>) {
          _onEvent(ev);
          props.onBlur?.(ev);
        },

        // onPaste(ev: React.ClipboardEvent<HTMLInputElement>) {
        //   lastValue.current = ev.clipboardData?.getData('text');
        //
        //   if (ev.target) {
        //     // @ts-ignore
        //     ev.target.value = lastValue.current;
        //   }
        //
        //   _onEvent(ev, true);
        //   props.onPaste?.(ev);
        // },

        onFocus(ev: FocusEvent<HTMLInputElement>) {
          _onEvent(ev);
          props.onFocus?.(ev);
        },

        [KEY_PRESS_EVENT]: (ev: KeyboardEvent<HTMLInputElement>) => {
          // @ts-ignore
          _onEvent(ev, true);
          props[KEY_PRESS_EVENT]?.(ev);
        },
      };
    }, []);

    return (
      <Input
        placeholder={placeholder}
        {...otherAntdProps}
        {...eventHandlers}
        onChange={(ev) => _onEvent(ev, true)}
        value={value}
        status={fieldStatus}
        ref={function handleInputMask(ref) {
          if (antdRef) {
            if (typeof antdRef == 'function') {
              antdRef(ref);
            } else {
              antdRef.current = ref;
            }
          }

          if (ref?.input) {
            innerRef.current = ref.input;
            innerRef.current.value = lastValue.current;
            if (!imask.current) {
              updateMaskRef();
            }
          }
        }}
      />
    );
  }),
);

function keyPressPropName() {
  if (typeof navigator !== 'undefined') {
    return navigator.userAgent.match(/Android/i) ? 'onBeforeInput' : 'onKeyPress';
  }
  return 'onKeyPress';
}

const KEY_PRESS_EVENT = keyPressPropName();

export type UnionToIntersection<T> = (T extends unknown ? (x: T) => unknown : never) extends (
  x: infer R,
) => unknown
  ? {
      [K in keyof R]: R[K];
    }
  : never;

type OnChangeParam = Parameters<Exclude<InputProps['onChange'], undefined>>[0];

interface MaskedProps {
  maskedValue: string;
  unmaskedValue: string;
}

interface OnChangeEvent extends OnChangeParam, MaskedProps {}
interface OnChangeEvent extends OnChangeParam, MaskedProps {}

interface MaskedEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, T, T>,
    Partial<MaskedProps> {}

interface IMaskOptionsBase extends UnionToIntersection<IMask.AnyMaskedOptions> {}

export type InputMaskOptions = {
  [K in keyof IMaskOptionsBase]?: IMaskOptionsBase[K];
};

type MaskFieldType = string | RegExp | Function | Date | InputMaskOptions;

interface IMaskOptions extends Omit<InputMaskOptions, 'mask'> {
  mask: MaskFieldType;
}

interface MaskOptionsList extends Array<IMaskOptions> {}

export type MaskType = MaskFieldType | MaskOptionsList;
