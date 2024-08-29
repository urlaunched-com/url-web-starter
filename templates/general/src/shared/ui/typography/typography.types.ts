import { PropsWithChildren } from "react";

export enum ETypographyVariant {
  BODY = "body",
}

type TextTags =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "strong"
  | "em"
  | "small"
  | "s"
  | "cite"
  | "q"
  | "dfn"
  | "abbr"
  | "time"
  | "code"
  | "var"
  | "samp"
  | "kbd"
  | "sub"
  | "sup"
  | "i"
  | "b"
  | "u"
  | "mark"
  | "ruby"
  | "rt"
  | "rp"
  | "bdi"
  | "bdo"
  | "wbr";

export interface ITypographyProps extends PropsWithChildren {
  variant?: ETypographyVariant;
  className?: string;
  Tag?: TextTags;
}
