import { ChangeEvent, FC, useState } from "react";
import styles from "./search-bar.module.css";
import { Button, Select } from "@ui";
import { optionsCategories } from "src/utils/constants";

type TSearchBarProps = {
  onSearchSubmit: () => void;
};

export const SearchBar: FC<TSearchBarProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState("");

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={onSearchSubmit}>
      <Select
        options={optionsCategories}
        classSelect={styles.select}
        onSelectChange={onSelectChange}
      ></Select>
      <input
        className={styles.input}
        type="search"
        name="search"
        placeholder="Enter search"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
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
