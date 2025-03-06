import { FC, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import { Pagination, SearchBar } from "@components";

import { ContentWrapper, Preloader } from "@ui";
import { CardPreview } from "src/components/ui/card-preview";

import { useItems } from "src/hooks/useItems";

import styles from "./list.module.css";
import { Link } from "react-router-dom";

export const ListPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 5;
  const { data, areItemsLoading, error } = useItems(currentPage, currentLimit);
  const items = data?.items || [];

  const onPageChange = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(page));
      return params;
    });
  };

  const onLimitChange = (limit: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("limit", String(limit));
      return params;
    });
  };

  useEffect(() => {
    if (data && (currentPage > data.totalPages || currentPage < 1)) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set(
          "page",
          String(Math.min(Math.max(currentPage, 1), data.totalPages))
        );
        return params;
      });
    }
  }, [currentPage, data, setSearchParams]);

  return (
    <ContentWrapper title="Список объявлений">
      <SearchBar></SearchBar>
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      ></Pagination>
      <ul className={styles["cards-list"]}>
        {error && (
          <p className={styles.warn}> Ошибка сервера: {error.message}</p>
        )}
        {data?.totalItems === 0 && (
          <p className={styles.warn}>
            Объявлений еще нет,
            <Link to={"/form/publish"} className={styles.link}>
              будь первым кто разместит!
            </Link>
          </p>
        )}
        {areItemsLoading && <Preloader />}
        {items?.map((item) => {
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
        })}
      </ul>
    </ContentWrapper>
  );
};
