/* eslint-disable import/no-named-default */
import React from 'react';
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import * as ROUTES from '../../constans/routes';

import { default as MainHeaderStyles } from '../../styles/dashboard/About.module.scss';

const block = bemCssModules(MainHeaderStyles);

const About = () => (
  <section className={block()}>
    <div className={block('main-div')}>
      <h1 className={block('title')}>
        <p className={block('title-name')}>ComCall Welcome!</p>
        <p className={block('title-p')}>
          <Link to={ROUTES.LOGIN} className={block('title-link')}>
            Login{' '}
          </Link>{' '}
          to balance, organize, organize, search and share - all you can do in one place.
        </p>
      </h1>
    </div>
    <div className={block('div-help')} />
  </section>
);

export default About;
