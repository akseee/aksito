import { FC } from "react";
import { useItem } from "src/hooks/useItem";
import styles from "./item.module.css";
import { Button, Preloader } from "@ui";
import { NavLink } from "react-router-dom";

export const ItemPage: FC = () => {
  const { item, isItemLoading } = useItem(1);

  const isAuth = true;

  return (
    <>
      {isItemLoading && <Preloader />}
      <div className={styles["item-header"]}>
        <NavLink to="/" className={styles.back}>{`← назад`}</NavLink>
        <h2 className={styles.type}>{item?.type}</h2>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{item?.name}</h3>
        {isAuth ? (
          <Button
            htmlType="button"
            extraClass={styles.edit}
            onClick={() => console.log(item?.id)}
          >
            Редактировать объявление
          </Button>
        ) : (
          <div></div>
        )}
        <ul className={styles.details}>
          <li className={styles.detail}>
            <div>Расположение:</div>
            <p>{item?.location}</p>
          </li>
        </ul>
        <img
          className={styles.img}
          alt="Ads image"
          src={
            item?.image ||
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
          }
        ></img>
        <div className={styles.description}>{item?.description}</div>
      </div>
    </>
  );
};
