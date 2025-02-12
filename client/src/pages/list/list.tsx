import { Preloader } from "@ui";
import { FC, useState } from "react";
import { RequestStatus } from "src/utils/types";

import styles from "./list.module.css";
import { Pagination, SearchBar } from "@components";
import { CardPreview } from "src/components/ui/card-preview";

export const ListPage: FC = () => {
  const [loading] = useState("loading");

  return (
    <>
      <h2 className={styles.title}>Список объявлений</h2>
      <div className={styles.content}>
        <SearchBar></SearchBar>
        <Pagination></Pagination>
        {loading === RequestStatus.LOADING ? (
          <Preloader />
        ) : (
          <ul className={styles["cards-list"]}>
            <CardPreview
              type={"property"}
              onClick={() => console.log("click")}
              title={"Продам почку"}
              category={"Недвижимость"}
              location={"Москва"}
              key={1}
            ></CardPreview>
            <CardPreview
              type={"property"}
              onClick={() => console.log("click")}
              title={"Продам двадцать два коня и лося"}
              category={"Недвижимость"}
              location={"Санкт-Петербург"}
              image={
                "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
              }
              key={2}
            ></CardPreview>
            <CardPreview
              type={"service"}
              onClick={() => console.log("click")}
              title={"Пройду весь Elden Ring на час"}
              category={"Услуги"}
              location={"Балашиха"}
              key={3}
            ></CardPreview>
          </ul>
        )}
      </div>
    </>
  );
};
