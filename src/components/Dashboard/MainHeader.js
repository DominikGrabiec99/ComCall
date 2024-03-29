/* eslint-disable import/no-named-default */
import React from 'react';
import bemCssModules from 'bem-css-modules';

import { default as MainHeaderStyles } from '../../styles/dashboard/About.module.scss';

const block = bemCssModules(MainHeaderStyles);

const About = () => (
  <section className={block()}>
    <div className={block('main-div')}>
      <h1 className={block('title')}>
        <p className={block('title-name')}>ComCall Welcome!</p>
        <p className={block('title-p')}>
          Learning, consultations, assignments - all this in one place especially for you!
        </p>
      </h1>
    </div>
    <div className={block('div-help')} />
  </section>
);

export default About;
