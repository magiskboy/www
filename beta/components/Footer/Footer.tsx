import React from 'react';
import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return <footer className={style.root}>
    Made by <a style={{ fontWeight: 500 }} href="https://nextjs.org">NextJS</a>
  </footer>
}

export default Footer;
