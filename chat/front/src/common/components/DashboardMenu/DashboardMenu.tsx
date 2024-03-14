import React from "react";
import { menu } from "@/common/constants/menu";

import styles from "./dashboardMenu.module.scss";

export const DashboardMenu = () => {
  return (
    <div className={styles.container}>
      {menu.map((el, i) => (
        <React.Fragment key={i}>{el.children}</React.Fragment>
      ))}
    </div>
  );
};
