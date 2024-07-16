import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Button } from "../components/Button/Button";

export default function Layout() {
  return (
    <>
      <div className={styles["layout"]}>
        <div className={styles["sidebar"]}>
          <div className={styles["user"]}>
            <img src="/avatar.svg" alt="avatar" />
            <div className={styles["name"]}>Олег Петров</div>
            <div className={styles["email"]}>artem.jlez@gmail.com</div>
          </div>
          <div className={styles["menu"]}>
            <Link to="/" className={styles["link"]}>
              <img src="/menu.svg" alt="menu" />
              Меню
            </Link>
            <Link to="/cart.svg" className={styles["link"]}>
              <img src="/cart.svg" alt="cart" />
              Корзина
            </Link>
          </div>
          <Button className={styles["exit"]}>
            <img src="/exit.svg" alt="exit" />
            Выйти
          </Button>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
