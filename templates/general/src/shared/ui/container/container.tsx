import classNames from "classnames";
import { FC, HTMLAttributes, PropsWithChildren, PropsWithoutRef } from "react";

import { createBem } from "@/shared";

import styles from "./container.module.scss";

const Container: FC<PropsWithoutRef<PropsWithChildren<HTMLAttributes<"div">>>> = ({ children, className }) => {
  const bem = createBem("container", styles);
  return <div className={classNames(bem(""), className)}>{children}</div>;
};

export default Container;
