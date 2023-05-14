import React from "react";
import style from "./Address.module.scss";

export const Address: React.FC<Props> = ({ left, right }) => {
  return (
    <div className={style.root}>
      <div className={style.left}>
        {React.Children.map(left, (item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </div>
      <div className={style.right}>
        {React.Children.map(right, (item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface Props {
  left: React.ReactNode[];
  right: React.ReactNode[];
}
