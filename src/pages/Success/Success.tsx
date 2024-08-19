import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

import styles from "./Success.module.css";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className={styles["success"]}>
      <img src="/checkout.png" alt="изображерние пиццы" />
      <div className={styles["text"]}>Ваш заказ успешно оформлен!</div>
      <Button size="big" onClick={() => navigate("/")}>
        Сделать новый
      </Button>
    </div>
  );
}
