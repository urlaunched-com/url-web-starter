"use client";

import Image from "next/image";
import { FC, useState } from "react";

import customImageLoader from "./custom-image-loader";
import { ICustomImageProps } from "./custom-image.types";

const CustomImage: FC<ICustomImageProps> = ({ alt, title, src: currentSrc, withPlaceholder, ...props }) => {
  const [hasPlaceholder, setHasPlaceholder] = useState(withPlaceholder);
  const [isError, setIsError] = useState(false);

  const addPlaceholder = () => {
    setIsError(true);
    setHasPlaceholder(true);
  };

  const removePlaceholder = () => {
    if (!isError) {
      setHasPlaceholder(false);
    }
  };

  const isExternal = hasPlaceholder ? false : typeof currentSrc === "string" && currentSrc.includes("http");
  const loader = isExternal ? customImageLoader : undefined;

  if (isError) {
    console.error("Image loading error", currentSrc);
  }

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      title={title}
      loader={loader}
      onLoad={removePlaceholder}
      onError={addPlaceholder}
    />
  );
};

export default CustomImage;
