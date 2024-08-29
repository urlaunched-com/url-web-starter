"use client";

import classNames from "classnames";
import React, { FC } from "react";

import { createBem } from "@/shared/lib";

import styles from "./typography.module.scss";
import { ETypographyVariant, ITypographyProps } from "./typography.types";

const Typography: FC<ITypographyProps> = ({ Tag = "p", variant = ETypographyVariant.BODY, children, className }) => {
  const bem = createBem("text", styles);

  return <Tag className={classNames(bem("", variant), className)}>{children}</Tag>;
};

export default Typography;
