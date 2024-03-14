import styles from "./footer.module.scss";
import { KeyboardEvent, useState } from "react";
import { TextArea } from "@/common/ui/TextArea/TextArea";

export const Footer = () => {
  const [message, setMessage] = useState("");

  const onEnterPress = (e: KeyboardEvent) => {
    if (e.keyCode === 13 && !e.ctrlKey) {
      setMessage("");
      e.preventDefault();
    }
    if ((e.keyCode === 13 || e.which === 13) && e.ctrlKey) {
      setMessage((prev) => prev + " \n ");
    }
  };

  return (
    <div className={styles.container}>
      <TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id={"text-area"}
        placeholder={"Write a message..."}
        onKeyDown={onEnterPress}
      />
    </div>
  );
};
