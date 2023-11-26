import React, { HTMLAttributes } from "react";
import Link from "next/link";
import style from "./Navigation.module.scss";
import classnames from "classnames";
import { useTranslation } from 'next-i18next'
import { LangSwitcher } from '../LangSwitcher';
import { ThemeSwitcher } from '../ThemeSwitcher';


export const Navigation: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  navs,
  socials,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={classnames({
        [style.root]: true,
        navigator: true,
      })}
      {...rest}
    >
      <div className={style.top}>
        <div>
          <LangSwitcher />
          <ThemeSwitcher />
        </div>
        <div className={style.social}>
          {socials.map((item) => (
            <a
              href={item.link}
              target="_blank"
              style={{ margin: "0 .5rem" }}
              rel="noreferrer"
              key={t(item.link)}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
      <div className={style.bottom}>
        {navs.map((item) => (
          <Link href={item.link} key={item.link}>
            {t(item.title)}
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
