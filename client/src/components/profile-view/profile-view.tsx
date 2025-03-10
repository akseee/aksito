import { FC, useContext } from "react";
import styles from "./profile-view.module.css";
import { TItemType, TUserType } from "src/utils/types";
import { CardPreview } from "../ui/card-preview";
import { Button } from "@ui";
import { UserContext } from "src/context/UserContext";
import { DEFAULT_USER_IMAGE } from "src/utils/constants";

type TProfileProps = {
  user: TUserType;
  items: TItemType[];
};

export const ProfileView: FC<TProfileProps> = ({ user, items }) => {
  const context = useContext(UserContext);

  const { logout } = context;
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
        src={user.image || DEFAULT_USER_IMAGE}
      ></img>

      <div className={styles.items}>
        <h3 className={styles["items-title"]}>Мои объявления</h3>
        <ul className={styles["items-list"]}>
          {items.length === 0 && (
            <p className={styles.warn}>У вас еще нет объявлений</p>
          )}
          {items.map((item) => {
            return (
              <CardPreview
                id={item.id}
                onClick={() => console.log("fake click")}
                type={item.type}
                title={item.name}
                category={item.type}
                location={item.location}
                extraClass={styles.item}
                key={item.id}
              ></CardPreview>
            );
          })}
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
