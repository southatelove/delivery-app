import { useEffect, useState } from "react";
import { Headling } from "../../components/Headling/Headling";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Search } from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await fetch(`${PREFIX}/products`);
        if (!res.ok) {
          return;
        }
        const data = (await res.json()) as Product[];
        setProducts(data);
      } catch (error) {
        console.error(error);
        return;
      }
    };
    getMenu();
  }, []);

  return (
    <>
      <div className={styles["head"]}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.ingredients.join(", ")}
          price={product.price}
          rating={product.rating}
          image={product.image}
        />
      ))}
    </>
  );
};
