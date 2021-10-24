import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as ROUTS from '../constans/routes';

// eslint-disable-next-line import/no-named-default
import { default as NotFoundStyles } from '../styles/notFound/NotFound.module.scss';

const block = bemCssModules(NotFoundStyles);

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found ComCall';
  }, []);

  return (
    <>
      <Header />
      <div className={block()}>
        <h1 className={block('title')}>
          This page doesn't exist :({' '}
          <Link to={ROUTS.DASHBOARD} className={block('link')}>
            Comeback to home page!
          </Link>
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
