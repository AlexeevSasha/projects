import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { usePrevious } from "@/common/hooks/usePrevious";

type IErrors<T> = Record<keyof T, string> | undefined;

interface IForm<T> {
  initialValues: T;
  onSubmit: (value: T) => void;
  validationSchema?: (values: T) => T;
}

export const useForm = <T extends Record<string, any>>({ initialValues, onSubmit, validationSchema }: IForm<T>) => {
  const checkSubmit = useRef(false);
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<IErrors<T>>(undefined);

  const prevValues = usePrevious<T>(values);

  const reset = useCallback(() => {
    setErrors(undefined);
    setValues(initialValues);
  }, []);

  const handleChange = useCallback(({ target }: ChangeEvent<HTMLElement>) => {
    const data: { key: keyof T; value: string | boolean } = { key: "", value: "" };
    if (target instanceof HTMLInputElement) {
      const { type, checked, value, name } = target;
      data.value = type === "checkbox" ? checked : value;
      data.key = name;
    } else if (target instanceof HTMLTextAreaElement) {
      data.value = target.value;
      data.key = target.name;
    }

    const value = { [data.key]: data.value };

    setValues((prev) => ({ ...prev, ...value }));
    checkSubmit.current && handlerError(value);
  }, []);

  const handlerError = useCallback(
    (currentValue?: object) => {
      checkSubmit.current = true;
      const errors = validationSchema({ ...prevValues.current, ...currentValue });
      setErrors(errors);
      return !!Object.values(errors).filter((el) => el).length;
    },
    [prevValues],
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const errors = handlerError();
      !errors && onSubmit(values);
    },
    [values],
  );

  return {
    values,
    errors,
    handleSubmit,
    reset,
    handleChange,
  };
};
