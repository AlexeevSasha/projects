import styles from "./header.module.scss";

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Alexeev Alexander</h3>
        <p>17.09.2022</p>
      </div>
      <div>icon</div>
    </div>
  );
};
