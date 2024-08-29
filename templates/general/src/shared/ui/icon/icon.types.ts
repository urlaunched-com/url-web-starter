import { ComponentProps } from "react";

export interface IIconProps extends ComponentProps<"svg"> {
  name: string;
  folder?: string;
  onClick?: () => void;
}
