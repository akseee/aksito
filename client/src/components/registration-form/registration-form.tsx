import { FC } from "react";
import { TUserType } from "src/utils/types";
import styles from "./registration-form.module.css";
import { Button } from "@ui";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

type TRegistrationFormProps = {
  registerForm: (user: TUserType) => void;
  error: Error | null;
};

export const RegistrationForm: FC<TRegistrationFormProps> = ({
  registerForm,
  error,
}) => {
  const { register, handleSubmit, formState } = useForm<TUserType>();

  const loading = formState.isLoading;
  const nameError = formState.errors["name"]?.message;
  const surnameError = formState.errors["surname"]?.message;
  const cityError = formState.errors["city"]?.message;
  const emailError = formState.errors["email"]?.message;
  const passwordError = formState.errors["password"]?.message;

  return (
    <form onSubmit={handleSubmit(registerForm)} className={styles.form}>
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
      {error && (
        <p className={styles.error}>
          {(error as AxiosError<{ error: string }>)?.response?.data?.error ||
            "Ошибка регистрации"}
        </p>
      )}
    </form>
  );
};
