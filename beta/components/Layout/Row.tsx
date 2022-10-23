import React from "react";
import classnames from "classnames";
import style from "./Row.module.scss";

export const Row: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={classnames({
        [style.root]: true,
        row: true,
      })}
    >
      {children}
    </div>
  );
};
