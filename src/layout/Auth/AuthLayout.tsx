import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export const AuthLayout = () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src="/logo.svg" alt="логотип" />
      </div>
      <div className={styles["content"]}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
