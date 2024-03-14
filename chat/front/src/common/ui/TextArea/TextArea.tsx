import { InputHTMLAttributes, useEffect, useRef } from "react";
import { classNames } from "@/common/lib/classNames/classNames";

import inputCls from "../Input/input.module.scss";
import cls from "./testArea.module.scss";

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  id: string;
}

export const TextArea = ({ id, ...attr }: IProps) => {
  const myRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    myRef.current.style.height = "auto";
    myRef.current.style.height = myRef.current.scrollHeight + "px";
    myRef.current.scrollTop = myRef.current.scrollHeight;
  }, [attr?.value]);

  return <textarea ref={myRef} id={id} className={classNames("scroll scroll__hidden", inputCls.input, cls.textArea)} rows={1} {...attr} />;
};
