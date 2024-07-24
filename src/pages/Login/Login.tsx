import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userActions } from "../../store/user.slice";
import { AppDispatch, RootState } from "../../store/store";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export default function Login() {
  // const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const jwt = useSelector((s: RootState) => s.user.jwt);
  const loginErrorMessage = useSelector(
    (s: RootState) => s.user.loginErrorMessage
  );
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());

    const target = e.target as typeof e.target & LoginForm;

    // const email = target.email.value;
    // const password = target.password.value;

    const { email, password } = target;

    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
    // try {
    // в data приходит jwt token

    // const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
    //   email,
    //   password,
    // });
    // localStorage.setItem("jwt", data.access_token);
    // Прокидывание token в redux.store

    // dispatch(userActions.addJwt(data.access_token));
    // navigate("/");
    // } catch (error) {
    //   if (error instanceof AxiosError) {
    //     setError(error.response?.data.error);
    //   }
    // }
  };

  return (
    <div className={styles["login"]}>
      <Headling>Вход</Headling>
      {loginErrorMessage && (
        <div className={styles["error"]}>{loginErrorMessage}</div>
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
        <Button size="big">Вход</Button>
        <div className={styles["links"]}>
          <div>Нет аккаунта?</div>
          <Link to="/auth/register">Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
}
