import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

import { CartItemProps } from "./CartItem.props";
import styles from "./CartItem.module.css";

export const CartItem = ({ ...props }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  console.log("dispatch", dispatch);

  const increase = () => {};
  const decrease = () => {};
  const remove = () => {};

  return (
    <>
      <div className={styles["item"]}>
        <div
          className={styles["image"]}
          style={{ backgroundImage: `url(${props.image})` }}
        ></div>
        <div className={styles["description"]}>
          <div className={styles["name"]}>{props.name}</div>
          <div className={styles["currency"]}>{props.price}&nbsp;₽</div>
        </div>

        <div className={styles["actions"]}>
          <button className={styles["button"]} onClick={decrease}>
            <img src="#" alt="Удалить из корзину" />
          </button>
          <div>{props.count}</div>
          <button className={styles["button"]} onClick={increase}>
            <img src="/cart-button.svg" alt="Добавить в корзину" />
          </button>
          <button className={styles["remove"]} onClick={remove}>
            <img src="/cart-button.svg" alt="Удалить все" />
          </button>
        </div>
      </div>
    </>
  );
};
