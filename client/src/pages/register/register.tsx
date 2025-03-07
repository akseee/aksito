import { FC, useContext } from "react";
import styles from "./register.module.css";
import { ContentWrapper } from "@ui";
import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/api";
import { UserContext } from "src/context/UserContext";
import { RegistrationForm } from "@components";
import { TUserType } from "src/utils/types";

export const RegisterPage: FC = () => {
  const context = useContext(UserContext);

  const { login } = context;
  const { mutate, error } = useMutation({
    mutationKey: ["register user"],
    mutationFn: async (RegisterData: TUserType) => {
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

  const onSubmit = (user: TUserType) => {
    mutate(user);
  };

  return (
    <ContentWrapper title="Регистрация" button extraClass={styles.box}>
      <h2 className={styles.heading}>Зарегистрироваться</h2>
      <RegistrationForm
        registerForm={onSubmit}
        error={error}
      ></RegistrationForm>
    </ContentWrapper>
  );
};
