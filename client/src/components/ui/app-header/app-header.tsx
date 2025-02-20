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
        <Link to="https://github.com/akseee">Aksito</Link>
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
        {!user ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? clsx(styles.active, styles.link) : styles.link
            }
          >
            Вход и регистрация
          </NavLink>
        ) : (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? clsx(styles.active, styles.link) : styles.link
            }
          >
            Мой аккаунт
          </NavLink>
        )}

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
