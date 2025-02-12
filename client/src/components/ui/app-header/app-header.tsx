import { FC } from "react";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const AppHeaderUI: FC = () => (
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
        Вход и регистрация
      </NavLink>
      <NavLink
        to="/form"
        className={({ isActive }) =>
          isActive ? clsx(styles.active, styles.link) : styles.link
        }
      >
        + Разместить объявление
      </NavLink>
    </nav>
  </header>
);
