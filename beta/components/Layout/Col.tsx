import React from 'react';
import classnames from 'classnames';
import style from './Col.module.scss';

const Col: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={classnames({
    [style.root]: true,
    'col': true
  })}>
    {children}
  </div>
}

export default Col;
