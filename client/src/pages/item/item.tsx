import { FC } from "react";
import { useItem } from "src/hooks/useItem";
import styles from "./item.module.css";
import { Button, ContentWrapper, ItemDetail, Preloader } from "@ui";

export const ItemPage: FC = () => {
  const { item, isItemLoading } = useItem(1);

  if (!item) return <p>Объявление не найдено</p>;

  const isAuth = true;

  return (
    <ContentWrapper title={item.type} button={true} extraClass={styles.box}>
      {isItemLoading ?? <Preloader />}
      <h3 className={styles.title}>{item.name}</h3>
      {isAuth ? (
        <Button
          htmlType="button"
          extraClass={styles.edit}
          onClick={() => console.log(item.id)}
        >
          Редактировать объявление
        </Button>
      ) : (
        <div></div>
      )}
      <ItemDetail item={item} />
      <img
        className={styles.img}
        alt="Ads image"
        src={
          item.image ||
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
      />
      <div className={styles.description}>{item.description}</div>
    </ContentWrapper>
  );
};
