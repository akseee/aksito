import { FC, useContext } from "react";
import { useItem } from "src/hooks/useItem";
import styles from "./item.module.css";
import { Button, ContentWrapper, ItemDetail, Preloader } from "@ui";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "src/context/UserContext";

export const ItemPage: FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { id } = useParams<{ id: string }>();

  const { isAuthenticated } = context;
  const { item, isItemLoading } = useItem(id ?? "");

  return (
    <ContentWrapper title={"Объявление"} button={true} extraClass={styles.box}>
      {isItemLoading && <Preloader />}
      {item && (
        <>
          <h3 className={styles.title}>{item.name}</h3>
          {isAuthenticated ? (
            <Button
              htmlType="button"
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
