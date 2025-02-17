import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./app-header.module.css";

type AppHeaderProps = {
  user: boolean;
};

export const AppHeaderUI: FC<AppHeaderProps> = ({ user }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/">Aksito</Link>
      </h1>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? clsx(styles.active, styles.link) : styles.link
          }
        >
          Объявления
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? clsx(styles.active, styles.link) : styles.link
          }
        >
          {!user ? "Вход и регистрация" : "Выход из аккаунта"}
        </NavLink>
        <NavLink
          to="/form/publish"
          className={({ isActive }) =>
            isActive ? clsx(styles.active, styles.link) : styles.link
          }
        >
          + Разместить объявление
        </NavLink>
      </nav>
    </header>
  );
};
