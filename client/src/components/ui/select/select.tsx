import { ChangeEvent, FC } from "react";
import styles from "./select.module.css";
import clsx from "clsx";
import { TOption } from "src/utils/types";

type TSelectProps = {
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: TOption[];
  classOption?: string;
  classSelect?: string;
};

export const Select: FC<TSelectProps> = ({
  options,
  onSelectChange,
  classOption,
  classSelect,
}) => {
  return (
    <select
      className={clsx(styles.select, classSelect)}
      onChange={(e) => onSelectChange(e)}
    >
      {options.map((option) => {
        return (
          <option
            className={classOption}
            value={option.value}
            key={option.value}
          >
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
