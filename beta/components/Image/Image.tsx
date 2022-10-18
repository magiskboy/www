import React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import style from "./Image.module.scss";

const Image: React.FC<ImageProps> = ({ title, ...rest }) => {
  if (!rest.width) {
    rest.width = '500px';
  }

  if (!rest.height) {
    rest.height = '300px';
  }
  return (
    <div className={`image ${style.root}`}>
      <NextImage {...rest} layout="responsive" />
      <h5>{title}</h5>
    </div>
  );
};

export default Image;

type ImageProps = NextImageProps & { title?: string };
