import { ChangeEvent, FC } from "react";
import styles from "./input.module.css";

type InputProps = {
  placeholder: string;
  value: string;
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<InputProps> = ({
  placeholder,
  value,
  name,
  handleChange,
}) => (
  <input
    onChange={handleChange}
    name={name}
    placeholder={placeholder}
    value={value}
    className={styles.input}
  ></input>
);
