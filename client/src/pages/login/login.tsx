import { FC, useContext } from "react";
import styles from "./login.module.css";
import { ContentWrapper } from "@ui";
import { UserContext } from "src/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { TLoginForm } from "src/utils/types";
import { api } from "src/api/api";
import { LoginForm } from "@components";

export const LoginPage: FC = () => {
  const { mutate, error, isError } = useMutation({
    mutationKey: ["login user"],
    mutationFn: async (loginData: TLoginForm) => {
      const response = await api.post<{ token: string }>(
        "/users/login",
        loginData
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context found");
  }

  const { login } = context;

  const onSubmit = (user: TLoginForm) => {
    mutate(user);
  };

  return (
    <ContentWrapper title="Вход" extraClass={styles.box}>
      <h2 className={styles.title}>Войти в аккаунт</h2>
      <LoginForm
        submitForm={onSubmit}
        error={isError ? error : null}
      ></LoginForm>
      <p style={{ opacity: 0.2 }}>
        OR: password: "123123", email: "test@example.com",
      </p>
    </ContentWrapper>
  );
};
