import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import { Button } from "@ui";
import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/api";
import { UserContext } from "src/context/UserContext";
import { NavLink } from "react-router-dom";
import { AxiosError } from "axios";

type UserType = {
  name: string;
  surname: string;
  city: string;
  email: string;
  password: string;
  image?: string;
};

export const RegisterPage: FC = () => {
  const { register, handleSubmit, formState } = useForm<UserType>();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context found");
  }

  const { login } = context;
  const { mutate, error, isError } = useMutation({
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

  const loading = formState.isLoading;
  const nameError = formState.errors["name"]?.message;
  const surnameError = formState.errors["surname"]?.message;
  const cityError = formState.errors["city"]?.message;
  const emailError = formState.errors["email"]?.message;
  const passwordError = formState.errors["password"]?.message;

  return (
    <>
      <div className={styles["item-header"]}>
        <NavLink to="/login" className={styles.back}>{`← назад`}</NavLink>
        <h2 className={styles.title}>Регистрация</h2>
      </div>
      <div className={styles.content}>
        <h2 className={styles.heading}>Зарегистрироваться</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.error}>{nameError}</p>
          <input
            {...register("name", {
              required: "Введите имя!",
            })}
            type="text"
            placeholder="Имя"
            className={styles.input}
          />
          <p className={styles.error}>{surnameError}</p>
          <input
            {...register("surname", {
              required: "Введите фамилию!",
            })}
            type="text"
            placeholder="Фамилия"
            className={styles.input}
          />
          <p className={styles.error}>{emailError}</p>
          <input
            {...register("email", {
              required: "Введите почту!",
            })}
            type="text"
            placeholder="Почта"
            className={styles.input}
          />
          <p className={styles.error}>{cityError}</p>
          <input
            {...register("city", {
              required: "Введите город!",
            })}
            type="text"
            placeholder="Город"
            className={styles.input}
          />
          <p></p>
          <input
            {...register("image")}
            type="text"
            placeholder="Добавьте фотографию"
            className={styles.input}
          />
          <p className={styles.error}>{passwordError}</p>
          <input
            {...register("password", {
              required: "Введите пароль!",
            })}
            type="password"
            placeholder="Ваш пароль"
            className={styles.input}
          />
          <Button htmlType="submit">
            {loading ? `Создаем аккаунт` : `Создать аккаунт`}
          </Button>
          {isError && (
            <p className={styles.error}>
              {(error as AxiosError<{ error: string }>)?.response?.data
                ?.error || "Ошибка регистрации"}
            </p>
          )}
        </form>
      </div>
    </>
  );
};
