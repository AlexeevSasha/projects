import styles from "./layout.module.scss";
import { Header } from "@/modules/chat/components/header/Header";
import { Footer } from "@/modules/chat/components/footer/Footer";
import { Chat } from "@/modules/chat/components/chat/Chat";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Chat />
      <Footer />
    </div>
  );
};
