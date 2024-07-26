import { Headling } from "../../components/Headling/Headling";
// import styles from "./Cart.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CartItem } from "../../components/CartItem/CartItem";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import { PREFIX } from "../../helpers/API";
import axios from "axios";

export default function Cart() {
  const [cartProducts, setCardProducts] = useState<Product[]>();
  const items = useSelector((s: RootState) => s.cart.items);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((item) => getItem(item.id)));
    setCardProducts(res);
  };

  useEffect(() => {
    loadAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  return (
    <>
      <Headling>Корзина</Headling>
      {items?.map((item) => {
        const product = cartProducts?.find((p) => p.id === item.id);
        if (!product) {
          return;
        }
        return <CartItem count={item.count} {...product} key={item.id} />;
      })}
    </>
  );
}
