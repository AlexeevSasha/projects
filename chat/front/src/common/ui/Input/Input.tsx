import { FC, InputHTMLAttributes, useCallback, useState } from "react";
import { classNames } from "@/common/lib/classNames/classNames";
import IconEyeOpen from "../../../../public/icon/eye_open.svg";
import IconEyeClose from "../../../../public/icon/eye_close.svg";

import styles from "./input.module.scss";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  error?: string;
}

export const Input: FC<IProps> = ({ id, error, ...attr }) => {
  const [type, setType] = useState(attr.type);
  const toggleType = useCallback(() => setType((prev) => (prev === "password" ? "text" : "password")), []);

  return (
    <div>
      <div className={styles.container}>
        <input
          id={id}
          className={classNames(styles.input, {
            [styles.inputError]: !!error,
            [styles.inputPassword]: attr.type === "password",
          })}
          {...attr}
          type={type}
        />
        <label
          htmlFor={id}
          className={classNames(styles.label, {
            [styles.labelTop]: !!attr.value,
            [styles.labelTopError]: !!error,
          })}
        >
          {attr.placeholder}
        </label>
        {attr.type === "password" ? (
          <div role='presentation' className={styles.eye} onClick={toggleType}>
            {type === "password" ? <IconEyeOpen /> : <IconEyeClose />}
          </div>
        ) : null}
      </div>
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};
