import { FC } from "react";
import styles from "./search-bar.module.css";
import { Button } from "@ui";

export const SearchBar: FC = () => {
  return (
    <form className={styles.form}>
      <Button extraClass={styles.category} onClick={() => console.log("click")}>
        категория
      </Button>
      <input
        className={styles.input}
        type="search"
        name="search"
        placeholder="Enter search"
        value={""}
        onChange={(e) => console.log(e)}
      />
      <Button
        extraClass={styles.search}
        htmlType="submit"
        onClick={() => console.log("submitted")}
      >
        найти
      </Button>
    </form>
  );
};
