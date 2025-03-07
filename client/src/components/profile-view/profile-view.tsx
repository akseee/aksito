import { FC, useContext } from "react";
import styles from "./profile-view.module.css";
import { TUserType } from "src/utils/types";
import { CardPreview } from "../ui/card-preview";
import { Button } from "@ui";
import { UserContext } from "src/context/UserContext";

type TProfileProps = {
  user: TUserType;
};
export const ProfileView: FC<TProfileProps> = ({ user }) => {
  const context = useContext(UserContext);

  const { logout } = context;
  console.log(user);
  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <h3 className={styles.name}>
          {user.surname} {user.name}
        </h3>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.phone}>{user.phone}</p>
      </div>
      <img
        className={styles.image}
        src={
          user.image ||
          "https://img.freepik.com/free-vector/sweet-eyed-kitten-cartoon-character_1308-133242.jpg?t=st=1741370557~exp=1741374157~hmac=d81fd96ecb84927ab4070d44fb9b56ae0e6d009d4f33dbedd79908f59b7f2a69&w=996"
        }
      ></img>

      <div className={styles.items}>
        <h3 className={styles["items-title"]}>Мои объявления</h3>
        <ul className={styles["items-list"]}>
          {/* {user.items?.map((item) => {
            return (
              <CardPreview
                id={item.id}
                onClick={() => console.log("fake click")}
                type={item.type}
                title={item.name}
                category={item.type}
                location={item.location}
                extraClass={styles.item}
              ></CardPreview>
            );
          })} */}
          <CardPreview
            id={0}
            onClick={() => console.log("fake click")}
            type={"Услуги"}
            title={"Фотограф"}
            category={"Услуги"}
            location={"Самара"}
            extraClass={styles.item}
          ></CardPreview>
          <CardPreview
            id={1}
            onClick={() => console.log("fake click")}
            type={"Авто"}
            title={"BWM 9 d7c/x"}
            category={"Авто"}
            location={"Москва"}
            extraClass={styles.item}
          ></CardPreview>
        </ul>
      </div>
      <div className={styles.buttons}>
        <Button onClick={() => console.log("edit")}>
          Редактировать профиль
        </Button>
        <Button extraClass={styles.logout} onClick={() => logout()}>
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};
