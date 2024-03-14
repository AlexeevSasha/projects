import { useCallback, useRef } from "react";
import { useResizableWidth } from "@/common/hooks/useResizableWidth";
import { Conversations } from "@/modules/conversation/components/Conversation";
import { drawer } from "@/modules/popup/helpers/drawer";
import { Button } from "@/common/ui/Button/Button";
import { DashboardMenu } from "@/common/components/DashboardMenu/DashboardMenu";
import MenuIcon from "../../../../public/icon/menu.svg";
import styles from "./sideBar.module.scss";
import { InputSearch } from "@/common/ui/InputSearch/InputSearch";
import { InviteFriend } from "@/modules/friend/component/InviteFriend";

export const SideBar = () => {
  const ref = useRef(null);
  const { activeEvent, width } = useResizableWidth(ref);

  const openDashboardMenu = useCallback(() => {
    drawer.open({ children: <DashboardMenu />, position: "left" });
  }, []);

  return (
    <aside style={{ width }} className={styles.container}>
      <div className={styles.containerMenu}>
        <Button onClick={openDashboardMenu} isIcon>
          <MenuIcon />
        </Button>
        <InputSearch id={"search"} name={"search"} type={"search"} />
        <InviteFriend />
      </div>
      <Conversations />
      <div className={styles.verticalLine} ref={ref} />
      {activeEvent ? <div className={styles.freeze} /> : null}
    </aside>
  );
};
