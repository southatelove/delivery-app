import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

import styles from "./Success.module.css";
import { CheckOut } from "../../assets/png";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className={styles["success"]}>
      <img src={CheckOut} alt="изображерние пиццы" />
      <div className={styles["text"]}>Ваш заказ успешно оформлен!</div>
      <Button size="big" onClick={() => navigate("/")}>
        Сделать новый
      </Button>
    </div>
  );
}
