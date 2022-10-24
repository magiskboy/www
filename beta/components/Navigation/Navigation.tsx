import React, { HTMLAttributes } from "react";
import Link from "next/link";
import style from "./Navigation.module.scss";
import classnames from "classnames";

export const Navigation: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  navs,
  socials,
  ...rest
}) => {
  return (
    <div
      className={classnames({
        [style.root]: true,
        navigator: true,
      })}
      {...rest}
    >
      <div className={style.top}>
        <Link href="/" className="brand">
          Nguyễn Khắc Thành
        </Link>
        <div className={style.social}>
          {socials.map((item) => (
            <a
              href={item.link}
              target="_blank"
              style={{ margin: "0 .5rem" }}
              rel="noreferrer"
              key={item.link}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
      <div className={style.bottom}>
        {navs.map((item) => (
          <Link href={item.link} key={item.link}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

interface Props {
  navs: { title: string; link: string }[];
  socials: { title: string; link: string }[];
}
