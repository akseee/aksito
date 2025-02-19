import { FC, useContext } from "react";
import styles from "./login.module.css";
import { Button } from "@ui";
import { UserContext } from "src/context/UserContext";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "src/utils/types";
import { api } from "src/api/api";

export const LoginPage: FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const loading = formState.isLoading;

  const { mutate, error } = useMutation({
    mutationKey: ["login user"],
    mutationFn: async (loginData: LoginForm) => {
      const response = await api.post<{ token: string }>(
        "/users/login",
        loginData
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token);
    },
  });

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context found");
  }

  const { login } = context;

  const onSubmit = (user: LoginForm) => {
    mutate(user);
  };

  return (
    <>
      <h2 className={styles.title}>Вход</h2>
      <div className={styles.content}>
        <h2 className={styles.heading}>Войти в личный кабинет</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            {...register("email", {
              required: "Введите почту!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email address",
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
          <Button htmlType="submit">
            {loading ? "Выполняется вход" : "Войти"}
          </Button>
          {error && <div className={styles.error}>{error.message}</div>}
        </form>
        <div className={styles.links}>
          <NavLink to="/register">Нет аккаунта?</NavLink>
          <NavLink to="/">Забыли пароль?</NavLink>
        </div>
      </div>
    </>
  );
};
