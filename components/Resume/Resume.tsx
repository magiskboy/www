import React from "react";
import style from "./Resume.module.scss";

export const Resume: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={style.root}>{children}</div>;
};
