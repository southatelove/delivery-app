import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const jwt = useSelector((s: RootState) => s.user.jwt);
  const registerErrorMessage = useSelector(
    (s: RootState) => s.user.registerErrorMessage
  );
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearEmailError());

    const target = e.target as typeof e.target & RegisterForm;

    const { email, password, name } = target;

    await sendEmail(email.value, password.value, name.value);
  };

  const sendEmail = async (email: string, password: string, name: string) => {
    dispatch(register({ email, password, name }));
  };

  return (
    <div className={styles["register"]}>
      <Headling>Регистрация</Headling>
      {registerErrorMessage && (
        <div className={styles["error"]}>{registerErrorMessage}</div>
      )}
      <form className={styles["form"]} onSubmit={onSubmit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input placeholder="Email" id="email" name="email" type="email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            placeholder="Введите пароль"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваше Имя</label>
          <Input placeholder="Введите имя" id="name" name="name" type="name" />
        </div>
        <Button size="big">Вход</Button>
        <div className={styles["links"]}>
          <div>Есть аккаунт?</div>
          <Link to="/auth/login">Войти</Link>
        </div>
      </form>
    </div>
  );
}
