import { ContentWrapper, Preloader } from "@ui";
import { FC } from "react";

import styles from "./list.module.css";
import { Pagination, SearchBar } from "@components";
import { CardPreview } from "src/components/ui/card-preview";
import { NavLink } from "react-router-dom";
import { useItems } from "src/hooks/useItems";

export const ListPage: FC = () => {
  const { items, areItemsLoading } = useItems();

  return (
    <ContentWrapper title="Список объявлений">
      <SearchBar></SearchBar>
      <Pagination></Pagination>
      <ul className={styles["cards-list"]}>
        {areItemsLoading ? (
          <Preloader />
        ) : items?.length === 0 ? (
          <p>Объявлений нет:c Будь первым кто его разместит!</p>
        ) : (
          items?.map((item) => {
            return (
              <NavLink to={`item/${item.id}`} key={item.id}>
                <CardPreview
                  id={item.id}
                  type={item.type}
                  onClick={() => console.log(item.id)}
                  title={item.name}
                  category={item.type}
                  location={item.location}
                  image={
                    item.image !== ""
                      ? item.image
                      : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                ></CardPreview>
              </NavLink>
            );
          })
        )}
      </ul>
    </ContentWrapper>
  );
};
