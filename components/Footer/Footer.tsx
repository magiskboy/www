import React from "react";
import style from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={style.root}>
      Powered by{" "}
      <a style={{ fontWeight: 500 }} href="https://nextjs.org">
        NextJS
      </a>
    </footer>
  );
};
