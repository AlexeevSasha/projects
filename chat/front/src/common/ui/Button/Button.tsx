import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "@/common/lib/classNames/classNames";
import cls from "./Button.module.scss";
import { ButtonColor, ButtonSize } from "@/common/types/button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isIcon?: boolean;
  isIconSaveColor?: boolean;
  fullWith?: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
  notHover?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, ...attr }: ButtonProps) => {
  const buildClass = classNames(cls.button, {
    [cls[attr.color]]: !!attr.color,
    [cls[attr.size]]: !!attr.size,
    [cls.fullWith]: attr.fullWith,
    [cls.icon]: attr.isIcon,
    [cls.iconSvg]: attr.isIcon && !attr.isIconSaveColor,
    [cls.iconSm]: attr.size == "sm" && attr.isIcon,
    [cls.notHover]: attr.notHover,
  });

  return (
    <button className={buildClass} {...attr}>
      {children}
    </button>
  );
};
