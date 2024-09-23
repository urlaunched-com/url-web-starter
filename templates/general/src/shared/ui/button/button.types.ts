import { LinkProps } from "next/link";
import { ButtonHTMLAttributes, HTMLAttributeAnchorTarget } from "react";
import { ETypographyVariant } from "@/shared";

interface IButtonWithoutLink extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  type?: "button"|"submit"|"reset";
  text: string;
  href?: undefined;
  textVariant?: ETypographyVariant;
  textClassName?: string;
  target?: undefined;
}

interface IButtonWithLink extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  href: LinkProps["href"];
  title: string;
  text: string;
  onClick?: () => void;
  textVariant?: ETypographyVariant;
  textClassName?: string;
  target?: HTMLAttributeAnchorTarget
}

export type IButtonProps = IButtonWithoutLink|IButtonWithLink;
