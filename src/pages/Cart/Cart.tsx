import { Headling } from "../../components/Headling/Headling";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CartItem } from "../../components/CartItem/CartItem";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import { PREFIX } from "../../helpers/API";
import axios from "axios";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE: number = 169;

export default function Cart() {
  const [cartProducts, setCardProducts] = useState<Product[]>();
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items
    ?.map((item) => {
      const product = cartProducts?.find((p) => p.id === item.id);
      if (!product) {
        return 0;
      }
      return item.count * product.price;
    })
    .reduce((acc, i) => acc + i, 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((item) => getItem(item.id)));
    setCardProducts(res);
  };

  const checkout = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(cartActions.clean());
    navigate("/success");
  };

  useEffect(() => {
    loadAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <>
      <Headling className={styles["headling"]}>Корзина</Headling>
      {items?.map((item) => {
        const product = cartProducts?.find((p) => p.id === item.id);
        if (!product) {
          return;
        }
        return <CartItem count={item.count} {...product} key={item.id} />;
      })}
      <div className={styles["line"]}>
        <div className={styles["text"]}>Итог</div>
        <div className={styles["price"]}>
          {total}&nbsp;
          <span>₽</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>Доставка</div>
        <div className={styles["price"]}>
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>
          Итог <span className={styles["total-count"]}>({items.length})</span>
        </div>
        <div className={styles["price"]}>
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <div className={styles["checkout"]}>
        <Button size="big" onClick={checkout}>
          Оформить
        </Button>
      </div>
    </>
  );
}
