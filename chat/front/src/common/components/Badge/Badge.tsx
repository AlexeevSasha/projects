import styles from "./badge.module.scss";
import { classNames } from "@/common/lib/classNames/classNames";

interface IProps {
  count: number;
  style?: {
    background?: string;
    color?: string;
  };
}

export const Badge = ({ count, style }: IProps) => {
  return (
    <div
      style={style}
      className={classNames(styles.badge, {
        [styles.rectangle]: String(count).length > 2,
      })}
    >
      {count}
    </div>
  );
};
