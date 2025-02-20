import { FC } from "react";
import styles from "./login-form.module.css";
import { useForm } from "react-hook-form";
import { TLoginForm } from "src/utils/types";
import { Button } from "@ui";
import { NavLink } from "react-router-dom";

type LoginFormProps = {
  submitForm: (user: TLoginForm) => void;
  error: Error | null;
};

export const LoginForm: FC<LoginFormProps> = ({ submitForm, error }) => {
  const { register, handleSubmit, formState } = useForm<TLoginForm>();
  const loading = formState.isLoading;
  const emailError = formState.errors["email"]?.message;

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
        <p className={styles.error}>{emailError}</p>
        <input
          {...register("email", {
            required: "Введите почту!",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "Неправильный формат почты",
            },
          })}
          type="text"
          placeholder="Введите почту"
          className={styles.input}
        />
        <input
          {...register("password", {
            required: "Введите пароль!",
          })}
          type="password"
          placeholder="Введите пароль"
          className={styles.input}
        />
        <Button htmlType="submit" extraClass={styles.login}>
          {loading ? "Выполняется вход" : "Войти"}
        </Button>
        {error && (
          <div className={styles.error}>
            Ошибка входа в аккаунт. Пожалуйста, проверьте свои данные
          </div>
        )}
      </form>
      <div className={styles.links}>
        <NavLink to="/register">Нет аккаунта?</NavLink>
        <NavLink to="/forgot-password">Забыли пароль?</NavLink>
      </div>
    </>
  );
};
