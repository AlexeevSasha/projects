import { WrapperMenuItem } from "@/common/components/WrapperMenuItem/WrapperMenuItem";
import NightIcon from "../../../../public/icon/night.svg";
import { useContext, useState } from "react";
import { AppContext } from "@/common/components/ContextProvider";
import { Switch } from "@/common/ui/Switch/Switch";
import styles from "./nightMode.module.scss";
import { ThemeEnum } from "@/common/types/theme";

export const NightMode = () => {
  const { changeTheme, theme } = useContext(AppContext);
  const [checked, setChecked] = useState(theme !== ThemeEnum.LIGHT);

  const onChangeTheme = () => {
    changeTheme();
    setChecked((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <WrapperMenuItem onClick={onChangeTheme} title={"Night mode"} icon={<NightIcon />} />
      <div className={styles.switch}>
        <Switch onChange={onChangeTheme} checked={checked} id={"night-switch"} name={"night-switch"} />
      </div>
    </div>
  );
};
