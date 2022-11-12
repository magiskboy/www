import React from 'react';
import style from './Caution.module.scss';

export const Caution: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <div className={style.root}>
    <strong className={style.title}>Chú ý</strong>
    <p className={style.content}>{children}</p>
  </div>
}