import { FC } from "react";
import styles from "./card-preview.module.css";
import clsx from "clsx";

type CardPreviewProps = {
  onClick: () => void;
  type: string;
  title: string;
  category: string;
  location: string;
  image?: string;
  key: number;
};

export const CardPreview: FC<CardPreviewProps> = ({
  onClick,
  type,
  title,
  category,
  location,
  image,
  key,
}) => {
  return (
    <li key={key} className={styles.card}>
      <div className={styles["image-container"]}>
        {image ? (
          <img className={styles.img} src={image} alt={title} />
        ) : (
          <img
            className={styles.img}
            src={
              "https://filestore.community.support.microsoft.com/api/images/72e3f188-79a1-465f-90ca-27262d769841"
            }
            alt={title}
          />
        )}
      </div>
      <div className={styles.content}>
        <p className={clsx(styles.category, styles[type])}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.location}>{location}</p>
        <div onClick={onClick} className={styles.clickable}>
          открыть
        </div>
      </div>
    </li>
  );
};
