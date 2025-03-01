import { FC, ReactNode } from "react";
import styles from "./content-wrapper.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

type ContentWrapperProps = {
  title: string;
  children: ReactNode;
  button?: boolean;
  extraClass?: string;
  to?: string;
};

export const ContentWrapper: FC<ContentWrapperProps> = ({
  title,
  children,
  button = false,
  extraClass,
}) => (
  <main className={styles.wrapper}>
    <div className={clsx(styles.header)}>
      {button && (
        <NavLink to="/" className={styles.back}>{`← на главную`}</NavLink>
      )}
      <h2 className={styles.title}>{title}</h2>
    </div>
    <div className={clsx(styles.content, extraClass)}>{children}</div>
  </main>
);
