import React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import style from "./Image.module.scss";

export const Image: React.FC<ImageProps> = ({ title, ...rest }) => {
  rest = {
    ...rest,
    width: rest.width || 500,
    height: rest.height || 300,
    blurDataURL: "/images/empty.jpg",
    placeholder: "blur",
    style: {
      ...(rest.style || {}),
      objectFit: 'contain',
    }
  };

  return (
    <div className={`image ${style.root}`}>
      <NextImage {...rest} />
      <h5>{title}</h5>
    </div>
  );
};

type ImageProps = NextImageProps & { title?: string };
