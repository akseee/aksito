import { Preloader } from "@ui";
import { FC, useState } from "react";
import { RequestStatus } from "src/utils/types";

import styles from "./list.module.css";
import { SearchBar } from "@components";

export const ListPage: FC = () => {
  const [loading] = useState("success");

  return (
    <>
      <h2 className={styles.title}>Список объявлений</h2>
      <div className={styles.content}>
        <SearchBar></SearchBar>

        <div className={styles.pagination}>1 2 3 4 5 6 7 </div>
        {loading === RequestStatus.LOADING ? (
          <Preloader />
        ) : (
          <div className={styles["list-container"]}>
            <ul className={styles.list}>
              <li className={styles["card-item"]}>1</li>
              <li className={styles["card-item"]}>2</li>
              <li className={styles["card-item"]}>3</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
