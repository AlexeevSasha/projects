import { InputHTMLAttributes } from "react";
import { classNames } from "@/common/lib/classNames/classNames";
import SearchIcon from "../../../../public/icon/search.svg";

import input from "../Input/input.module.scss";
import styles from "./inputSearch.module.scss";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const InputSearch = ({ id, ...attr }: IProps) => {
  return (
    <div className={input.container}>
      <input
        id={id}
        className={classNames(input.input, styles.search, {
          [styles.searchFixed]: !!attr.value,
        })}
        {...attr}
        type={"search"}
      />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  );
};
