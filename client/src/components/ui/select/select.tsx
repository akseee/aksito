import { ChangeEvent, FC } from "react";
import styles from "./select.module.css";
import clsx from "clsx";
import { TOption } from "src/utils/types";

type TSelectProps = {
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: TOption[];
  value: string;
  classOption?: string;
  classSelect?: string;
};

export const Select: FC<TSelectProps> = ({
  options,
  value,
  onSelectChange,
  classOption,
  classSelect,
}) => {
  return (
    <select
      className={clsx(styles.select, classSelect)}
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onSelectChange(e)}
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
