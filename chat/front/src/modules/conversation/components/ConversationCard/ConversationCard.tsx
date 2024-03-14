import styles from "./conversationCard.module.scss";
import { useRipple } from "@/common/hooks/useRipple";
import { useRef } from "react";
import { classNames } from "@/common/lib/classNames/classNames";

export const ConversationCard = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const ripples = useRipple(ref, { background: "var(--conversation-ripple)" });

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.avatar} />
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.name}>Test Name</div>
          <div className={styles.date}>11.12.2013</div>
        </div>
        <div className={styles.info}>
          <div className={classNames(styles.name, styles.message)}>last message last message</div>
        </div>
      </div>
      {ripples}
    </div>
  );
};
