import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { Button } from "../../components/Button/Button";

import cn from "classnames";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(styles["link"], {
                  [styles.active]: isActive,
                })
              }
            >
              <img src="/menu.svg" alt="menu" />
              Меню
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles["link"], {
                  [styles.active]: isActive,
                })
              }
            >
              <img src="/cart.svg" alt="cart" />
              Корзина
            </NavLink>
          </div>
          <Button className={styles["exit"]} onClick={logout}>
            <img src="/exit.svg" alt="exit" />
            Выйти
          </Button>
        </div>
        <div className={styles["content"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
