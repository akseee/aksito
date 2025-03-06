import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./search-bar.module.css";
import { Button, Select } from "@ui";
import { CATEGORIES, optionsCategories } from "src/utils/constants";
import { TSearchField } from "src/utils/types";

type TSearchBarProps = {
  onSearchSubmit: (data: TSearchField) => void;
};

export const SearchBar: FC<TSearchBarProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState<string>("");
  const [select, setSelect] = useState<string>(CATEGORIES.ALL);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit({ query, select });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <Select
        options={optionsCategories}
        classSelect={styles.select}
        onSelectChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setSelect(e.target.value);
        }}
        value={select}
      ></Select>
      <input
        className={styles.input}
        type="search"
        name="query"
        placeholder="Enter search"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <Button extraClass={styles.search} htmlType="submit">
        найти
      </Button>
    </form>
  );
};
