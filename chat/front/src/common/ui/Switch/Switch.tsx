import { InputHTMLAttributes } from "react";
import styles from "./switch..module.scss";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
}
export const Switch = ({ id, ...attr }: IProps) => {
  return (
    <div className={styles.container}>
      <input className={styles.checkbox} id={id} {...attr} type='checkbox' />
      <label className={styles.label} htmlFor={id}>
        <span className={styles.inner} />
        <span className={styles.switch} />
      </label>
    </div>
  );
};
