import { FC, ReactNode, SyntheticEvent } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

type ButtonProps = {
  type?: "secondary" | "primary";
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  extraClass?: string;
  htmlType: "button" | "submit" | "reset";
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  extraClass,
  onClick = () => console.log("click"),
  htmlType = "button",
  children,
}) => (
  <button
    onClick={onClick}
    type={htmlType}
    className={clsx(styles.button, extraClass)}
  >
    {children}
  </button>
);
