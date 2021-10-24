import React from 'react';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as LoadingStyles } from '../styles/Loading.module.scss';

const block = bemCssModules(LoadingStyles);

const Loading = () => (
  <div className={block()}>
    <div className={block('box-loading')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
