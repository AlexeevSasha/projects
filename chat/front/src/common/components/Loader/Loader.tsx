import { classNames } from "@/common/lib/classNames/classNames";
import cls from "./loader.module.scss";

interface LoaderProps {
  loading: boolean;
  size?: "sm" | "lg";
}

export const Loader = ({ loading, size }: LoaderProps) => {
  if (!loading) return null;
  return (
    <div className={cls.container}>
      <div
        className={classNames(cls.loader, {
          [cls[size]]: !!size,
        })}
      />
    </div>
  );
};
