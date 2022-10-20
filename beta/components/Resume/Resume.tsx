import React from 'react';
import style from './Resume.module.scss';

const Resume: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={style.root}>{children}</div>
}

export default Resume;
