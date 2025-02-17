import { FC, useContext, useState } from "react";
import styles from "./login.module.css";
import { Button, Input } from "@ui";
import { UserContext } from "src/context/UserContext";
import { NavLink } from "react-router-dom";

export const LoginPage: FC = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context found");
  }

  const { isAuthChecked, isAuthenticated, login, logout, data } = context;
  console.log(isAuthChecked, isAuthenticated, login, logout, data);

  const handleInputChange = () => {};

  return (
    <>
      <h2 className={styles.title}>Вход</h2>
      <div className={styles.content}>
        <form onSubmit={() => {}} className={styles.form}>
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
          <Button htmlType="submit" onClick={() => console.log("submitting")}>
            Войти
          </Button>
        </form>
        <div className={styles.links}>
          <NavLink to="/">Нет аккаунта?</NavLink>
          <NavLink to="/">Забыли пароль?</NavLink>
        </div>
      </div>
    </>
  );
};
