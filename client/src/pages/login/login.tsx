import { FC } from "react";
import styles from "./login.module.css";
import { ContentWrapper } from "@ui";
import { TLoginForm } from "src/utils/types";
import { LoginForm } from "@components";
import { useLogin } from "src/hooks/useLogin";

export const LoginPage: FC = () => {
  const { mutate, error } = useLogin();

  const onSubmit = (user: TLoginForm) => {
    mutate(user);
  };

  return (
    <ContentWrapper title="Вход" extraClass={styles.box}>
      <h2 className={styles.title}>Войти в аккаунт</h2>
      <LoginForm submitForm={onSubmit} error={error}></LoginForm>
      <p style={{ opacity: 0.2 }}>
        OR: password: "123123", email: "test@example.com",
      </p>
    </ContentWrapper>
  );
};
