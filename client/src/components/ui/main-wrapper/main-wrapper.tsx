import { FC, ReactNode } from "react";
import styles from "./main-wrapper.module.css";

type MainWrapperProps = {
  children: ReactNode;
};

export const MainWrapper: FC<MainWrapperProps> = ({ children }) => (
  <main className={styles.wrapper}>{children}</main>
);
