import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { Button } from "../../components/Button/Button";

import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const items = useSelector((s: RootState) => s.cart.items);
  console.log("render", items);

  const profile = useSelector((s: RootState) => s.user.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

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
            <div className={styles["name"]}>{profile?.name}</div>
            <div className={styles["email"]}>{profile?.email}</div>
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
            {items.reduce((acc, item) => (acc += item.count), 0)}
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
