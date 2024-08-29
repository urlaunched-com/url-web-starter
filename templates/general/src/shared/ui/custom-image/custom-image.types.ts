import { ImageProps } from "next/image";

export interface ICustomImageProps extends ImageProps {
  withPlaceholder?: boolean;
}
