import classNames from "classnames";
import { FC } from "react";

import { createBem } from "@/shared";

import { ITextareaProps } from "../form-item";

import styles from "./textarea.module.scss";

const Textarea: FC<ITextareaProps<any>> = ({ register, className, ...props }) => {
  const bem = createBem("textarea", styles);
  return <textarea className={classNames(bem(""), className)} {...register} {...props} />;
};

export default Textarea;
