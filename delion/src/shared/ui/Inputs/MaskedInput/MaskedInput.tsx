import type { BaseSyntheticEvent, FocusEvent, KeyboardEvent } from 'react';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, type InputProps, type InputRef } from 'antd';
import type { InputStatus } from 'antd/es/_util/statusUtils';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import type { NamePath } from 'antd/lib/form/interface';
import type { AnyMaskedOptions } from 'imask';
import IMask from 'imask';
import { observer } from 'mobx-react';

export interface MaskedInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue' | 'form' | 'pattern' | 'mask'> {
  mask: AnyMaskedOptions['mask'];
  value?: string;
  defaultValue?: string;
  maskOptions?: Omit<AnyMaskedOptions, 'mask'>;
  onChange?: (event: MaskedEvent<HTMLInputElement>) => void;
  form?: FormInstance;
  handleStatusChange?: (value: InputStatus) => void;
  fullName?: NamePath;
  pattern?: RegExp;
}

export const MaskedInput = observer(
  forwardRef<InputRef, MaskedInputProps>(function MolMaskedInput(props: MaskedInputProps, antdRef) {
    const {
      mask,
      maskOptions: _maskOptions = {} as AnyMaskedOptions,
      value = '',
      defaultValue = '',
      ...rest
    } = props;
    const { pattern, status = '', form, fullName, handleStatusChange, ...antdProps } = rest;
    const [fieldStatus, setFieldStatus] = useState<InputStatus>(status);

    const innerRef = useRef<HTMLInputElement | null>(null);
    const imask = useRef<IMask.InputMask<AnyMaskedOptions> | null>(null);
    const lastValue = useRef(value || defaultValue);

    const maskOptions = useMemo<AnyMaskedOptions>(
      // @ts-ignore type error AnyMaskedOptions['mask'] prop is not in AnyMaskedOptions (mask omitted)
      () => ({ mask, ..._maskOptions }),
      [mask, _maskOptions],
    );

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

    useEffect(() => {
      lastValue.current = value;
      const input = innerRef.current;
      const masked = imask.current;
      if (!(input && masked)) return;
      masked.value = value || '';
      // updating value with the masked
      //   version (imask.value has a setter that triggers masking)
      input.value = masked.value;
      lastValue.current = masked.value;
    }, [value]);

    useEffect(() => {
      const err =
        (!lastValue.current && form?.getFieldError(fullName).length) ||
        (lastValue.current && !pattern?.test(lastValue.current))
          ? 'error'
          : status;
      setFieldStatus(err);
      handleStatusChange?.(err);
    }, [value]);

    const eventHandlers = useMemo(() => {
      return {
        onBlur(ev: FocusEvent<HTMLInputElement>) {
          _onEvent(ev);
          props.onBlur?.(ev);
        },

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
        {...antdProps}
        {...eventHandlers}
        status={fieldStatus}
        onChange={(ev) => _onEvent(ev, true)}
        value={value}
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
    return navigator.userAgent.match(/Android/i) ? 'onBeforeInput' : 'onKeyDown';
  }
  return 'onKeyDown';
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

interface MaskedEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, T, T>,
    Partial<MaskedProps> {}

declare type MaskFieldType = string | Date | RegExp | Function;

export declare type MaskType = MaskFieldType;
