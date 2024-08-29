const customImageLoader = ({ src }: { src: string }) => {
  const isContainUrl = src.startsWith("http");
  return isContainUrl ? src : `${process.env.NEXT_PUBLIC_IMAGE_CDN}/${src}`;
};

export default customImageLoader;
