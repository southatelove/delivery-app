import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import styles from "./InfoProduct.module.css";
import { Button } from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.slice";

export function InfoProduct() {
  const data = useLoaderData() as { data: Product };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const data = useLoaderData() as Product;
  // return <div>{data.id}</div>;

  const addToCart = (id: number) => {
    dispatch(cartActions.add(id));
  };

  return (
    <>
      <Suspense fallback={<>Загрузка...</>}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <>
              <div className={styles["header-info"]}>
                <button
                  className={styles["backIcon"]}
                  onClick={() => navigate(-1)}
                >
                  <img src="/backIcon.svg" />
                </button>
                <p>{data.name}</p>
                <Button
                  size="small"
                  className={styles["add-to-cart"]}
                  onClick={() => addToCart(data.id)}
                >
                  <img src="/cart-button.svg" />В корзину
                </Button>
              </div>
              <div className={styles["info"]}>
                <div
                  className={styles["img"]}
                  style={{ backgroundImage: `url(${data.image})` }}
                ></div>
                <div className={styles["description"]}>
                  <div className={styles["price"]}>
                    <p>Цена</p>
                    {data.price}&nbsp;
                    <span className={styles["currency"]}>₽</span>
                  </div>
                  <div className={styles["rating"]}>
                    <p>Рейтинг</p>
                    <span>
                      {data.rating}&nbsp;
                      <img src="/rating.svg" alt="Иконка звезды" />
                    </span>
                  </div>
                  <div>
                    <p>Состав:</p>
                    <div className={styles["ingredients"]}>
                      {data.ingredients.map((ingredient) => (
                        <ul key={ingredient}>
                          <li>{ingredient}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
