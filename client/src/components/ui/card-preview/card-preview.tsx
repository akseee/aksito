import { FC } from "react";
import styles from "./card-preview.module.css";
import clsx from "clsx";

type CardPreviewProps = {
  id: number;
  onClick: () => void;
  type: string;
  title: string;
  category: string;
  location: string;
  image?: string;
};

enum Colors {
  "Недвижимость" = "property",
  "Услуги" = "service",
  "Авто" = "auto",
}

export const CardPreview: FC<CardPreviewProps> = ({
  onClick,
  title,
  category,
  location,
  image,
}) => {
  const color = Colors[category as keyof typeof Colors] || "";

  return (
    <li className={styles.card} onClick={onClick}>
      <div className={styles["image-container"]}>
        <img
          className={styles.img}
          onError={(e) =>
            (e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg")
          }
          src={
            image ||
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
          }
          alt={title}
        />
      </div>
      <div className={styles.content}>
        <p className={clsx(styles.category, styles[color])}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.location}>{location}</p>
        <div className={styles.clickable}>открыть</div>
      </div>
    </li>
  );
};
