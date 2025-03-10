import { FC } from "react";
import { useItem } from "src/hooks/useItem";
import styles from "./item.module.css";
import { Button, ContentWrapper, ItemDetail, Preloader } from "@ui";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import clsx from "clsx";

export const ItemPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const token = localStorage.getItem("authToken");
  const { userId } = jwtDecode<{ userId: number }>(token!);

  const { item, isItemLoading } = useItem(id ?? "");

  const owner = item && userId === item!.owner_id;
  return (
    <ContentWrapper
      title={"Объявление"}
      button={true}
      extraClass={clsx(styles.box, owner && styles.owner)}
    >
      {isItemLoading && <Preloader />}
      {item && (
        <>
          <h3 className={clsx(styles.title, owner && styles["owner-title"])}>
            {owner && "Мое объявление:  "}
            {item.name}
          </h3>
          {owner ? (
            <Button
              extraClass={styles.edit}
              onClick={() => navigate(`/form/edit/${item.id}`)}
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
            onError={(e) =>
              (e.currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg")
            }
          />
          <div className={styles.description}>{item.description}</div>
        </>
      )}
    </ContentWrapper>
  );
};
