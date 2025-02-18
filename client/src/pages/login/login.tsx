import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import styles from "./login.module.css";
import { Button, Input } from "@ui";
import { UserContext, userType } from "src/context/UserContext";
import { Form, Navigate, NavLink } from "react-router-dom";

export const LoginPage: FC = () => {
  // const [formState, setFormState] = useState(false);
  const [userData, setUserData] = useState<
    Pick<userType, "password" | "email">
  >({
    email: "",
    password: "",
  });

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context found");
  }

  const { isAuthChecked, isAuthenticated, login, logout, data } = context;
  console.log(isAuthChecked, isAuthenticated, login, logout, data);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    login({ ...userData, id: Number(Date.now()) });

    return <Navigate to={"/profile"} />;
  };
  // ч
  // if (isAuthenticated) {
  //   return <Navigate to={"/list"} />;
  // }

  return (
    <>
      <h2 className={styles.title}>Вход</h2>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.heading}>Войти в личный кабинет</h2>
          <Input
            placeholder="Email"
            value={userData.email}
            name="email"
            handleChange={handleInputChange}
          />

          <Input
            placeholder="Пароль"
            value={userData.password}
            name="password"
            handleChange={handleInputChange}
          />
          <Button htmlType="submit">Войти</Button>
        </form>
        <div className={styles.links}>
          <NavLink to="/">Нет аккаунта?</NavLink>
          <NavLink to="/">Забыли пароль?</NavLink>
        </div>
      </div>
    </>
  );
};
