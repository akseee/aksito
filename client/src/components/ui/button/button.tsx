import { FC, ReactNode, SyntheticEvent } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

type ButtonProps = {
  type?: "secondary" | "primary";
  size?: "small" | "medium" | "large";
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  extraClass?: string;
  htmlType: "button" | "submit" | "reset";
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  extraClass,
  size = "medium",
  onClick = () => console.log("click"),
  htmlType = "button",
  children,
}) => (
  <button
    onClick={onClick}
    type={htmlType}
    className={clsx(styles.button, extraClass, size)}
  >
    {children}
  </button>
);
