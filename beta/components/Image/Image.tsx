import React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import style from "./Image.module.scss";

const Image: React.FC<ImageProps> = ({ title, ...rest }) => {
  return (
    <div className={`image ${style.root}`}>
      <NextImage {...rest} />
      <h5>{title}</h5>
    </div>
  );
};

export default Image;

type ImageProps = NextImageProps & { title?: string };
