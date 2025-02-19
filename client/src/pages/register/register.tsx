import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import { Button } from "@ui";
import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/api";
import { UserContext } from "src/context/UserContext";
import { NavLink } from "react-router-dom";

type UserType = {
  name: string;
  surname: string;
  city: string;
  email: string;
  password: string;
  image?: string;
};

export const RegisterPage: FC = () => {
  const { register, handleSubmit } = useForm<UserType>();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context found");
  }

  const { login } = context;
  const { mutate } = useMutation({
    mutationKey: ["register user"],
    mutationFn: async (RegisterData: UserType) => {
      const response = await api.post<{ token: string }>(
        "/users/register",
        RegisterData
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token);
    },
  });

  const onSubmit = (user: UserType) => {
    mutate(user);
  };

  return (
    <>
      <div className={styles["item-header"]}>
        <NavLink to="/login" className={styles.back}>{`← назад`}</NavLink>
        <h2 className={styles.title}>Вход</h2>
      </div>
      <div className={styles.content}>
        <h2 className={styles.heading}>Зарегистрироваться</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            {...register("name", {
              required: "Введите имя!",
            })}
            type="text"
            placeholder="Введите имя"
            className={styles.input}
          />
          <input
            {...register("surname", {
              required: "Введите фамилию!",
            })}
            type="text"
            placeholder="Введите фамилию"
            className={styles.input}
          />
          <input
            {...register("city", {
              required: "Введите город!",
            })}
            type="text"
            placeholder="Введите город"
            className={styles.input}
          />
          <input
            {...register("email", {
              required: "Введите почту!",
            })}
            type="text"
            placeholder="Введите почту"
            className={styles.input}
          />
          <input
            {...register("image")}
            type="text"
            placeholder="Добавьте фото"
            className={styles.input}
          />
          <input
            {...register("password", {
              required: "Введите пароль!",
            })}
            type="text"
            placeholder="Введите пароль"
            className={styles.input}
          />
          <Button htmlType="submit">Создать аккаунт</Button>
        </form>
      </div>
    </>
  );
};
