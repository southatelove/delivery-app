import { FormEvent, useEffect, useState } from "react";
import { Headling } from "../../components/Headling/Headling";
import { Search } from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [search, setSearch] = useState<string>("");

  // useEffect(() => {
  //   const getMenu = async () => {
  //     try {
  //       const res = await fetch(`${PREFIX}/products`);
  //       if (!res.ok) {
  //         return;
  //       }
  //       const data = (await res.json()) as Product[];
  //       setProducts(data);
  //     } catch (error) {
  //       console.error(error);
  //       return;
  //     }
  //   };
  //   getMenu();
  // }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getMenu = async (search?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name: search,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    getMenu(search);
  }, [search]);

  return (
    <>
      <div className={styles["head"]}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" onChange={onSearch} />
      </div>
      {error && <>{error}</>}
      {!isLoading && <MenuList products={products} />}
      {isLoading && <>Загружаем продукты...</>}
      {!isLoading && products.length === 0 && (
        <>Не найдено блюд по запросу...</>
      )}
    </>
  );
};

export default Menu;
