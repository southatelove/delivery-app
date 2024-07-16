import { Headling } from "../../components/Headling/Headling";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Search } from "../../components/Search/Search";
import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <>
      <div className={styles["head"]}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <ProductCard
        id={1}
        title="Наслаждение"
        description={"Салями, руккола"}
        image={""}
        price={300}
        rating={4.5}
        image="/product-demo.png"
      />
    </>
  );
};
