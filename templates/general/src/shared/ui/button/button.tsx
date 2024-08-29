import { FC } from "react";

import { createBem } from "@/shared/lib";

import styles from "./button.module.scss";
import { IButtonProps } from "./button.types";

const Button: FC<IButtonProps> = ({ type = "button", onClick, text, ...props }) => {
  const bem = createBem("button", styles);
  return (
    <button {...props} className={bem("")} type={type} onClick={onClick ?? onClick}>
      <span className={bem("text")}>{text}</span>
    </button>
  );
};

export default Button;
