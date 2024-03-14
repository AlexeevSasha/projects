import styles from "./wrapperMenuItem.module.scss";
import { ReactElement, useRef } from "react";
import { useRipple } from "@/common/hooks/useRipple";
import { Button } from "@/common/ui/Button/Button";
import { Badge } from "@/common/components/Badge/Badge";

interface IProps {
  icon: ReactElement;
  title: string;
  onClick: () => void;
  badgeCount?: number;
}

export const WrapperMenuItem = ({ icon, title, onClick, badgeCount }: IProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const ripples = useRipple(ref, { background: "var(--conversation-ripple)" });

  return (
    <div role='presentation' onClick={onClick} ref={ref} className={styles.container}>
      <Button notHover size={"sm"} isIcon>
        {icon}
      </Button>
      <div className={styles.text}>
        {title}
        {badgeCount ? <Badge count={badgeCount} /> : null}
      </div>
      {ripples}
    </div>
  );
};
