import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export const ProductCard = ({
  id,
  name,
  description,
  image,
  price,
  rating,
}: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(cartActions.add(id));
  };
  return (
    <>
      <Link to={`/product/${id}`} className={styles["link"]}>
        <div className={styles["card"]}>
          <div
            className={styles["head"]}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className={styles["price"]}>
              {price}&nbsp;
              <span className={styles["currency"]}>₽</span>
            </div>
            <button
              className={styles["add-to-cart"]}
              onClick={(e) => addToCart(e)}
            >
              <img src="/cart-button.svg" alt="Добавить в корзину" />
            </button>
            <div className={styles["rating"]}>
              {rating}&nbsp;
              <img src="/rating.svg" alt="Иконка звезды" />
            </div>
          </div>
          <div className={styles["footer"]}>
            <div className={styles["title"]}>{name}</div>
            <div className={styles["description"]}>{description}</div>
          </div>
        </div>
      </Link>
    </>
  );
};
