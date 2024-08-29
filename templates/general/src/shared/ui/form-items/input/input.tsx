import classNames from "classnames";
import { FC } from "react";

import { createBem } from "@/shared";

import { IInputProps } from "../form-item";

import styles from "./input.module.scss";

const Input: FC<IInputProps<any>> = ({ type = "text", className, register, ...props }) => {
  const bem = createBem("input", styles);
  return <input className={classNames(className, bem(""), bem(type))} type={type} {...register} {...props} />;
};

export default Input;
