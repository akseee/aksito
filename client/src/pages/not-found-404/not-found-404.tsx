import { ContentWrapper } from "@ui";
import { FC } from "react";
import styles from "./not-found-404.module.css";

export const NotFound404: FC = () => (
  <ContentWrapper title="Ошибка" extraClass={styles.error} button={true}>
    <div className={styles.error}>Ошибка 404. Страница не найдена.</div>
  </ContentWrapper>
);
