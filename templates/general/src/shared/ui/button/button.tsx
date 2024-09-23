import Link from "next/link";
import { FC } from "react";
import classNames from "classnames";

import { createBem } from "@/shared/lib";

import styles from "./button.module.scss";
import { IButtonProps } from "./button.types";
import { ETypographyVariant, Typography } from "@/shared";

const Button: FC<IButtonProps> = ({
  type = "button",
  onClick,
  text,
  href,
  title,
  textVariant = ETypographyVariant.MOBILE_B1,
  className = "",
  textClassName = "",
  target,
  ...props
}) => {
  const bem = createBem("button", styles);

  const buttonClass = classNames(bem(""), className);

  if (href) {
    return (
      <Link href={href} title={title} className={buttonClass} target={target}>
        <Typography
          variant={textVariant}
          Tag="span"
          className={classNames(bem("text"), textClassName)}>
          {text}
        </Typography>
      </Link>
    );
  }

  return (
    <button {...props} className={buttonClass} type={type} onClick={onClick}>
      <Typography
        variant={textVariant}
        Tag="span"
        className={classNames(bem("text"), textClassName)}>
        {text}
      </Typography>
    </button>
  );
};

export default Button;
