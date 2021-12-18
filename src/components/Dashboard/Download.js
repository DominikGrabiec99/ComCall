import React from 'react';
import bemCssModules from 'bem-css-modules';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constans/routes';
import { about } from '../../constans/text';
// eslint-disable-next-line import/no-named-default
import { default as DownloadStyles } from '../../styles/dashboard/Download.module.scss';

const block = bemCssModules(DownloadStyles);

const Download = () => {
  const aboutSection = about.map((article) => (
    <article className={`${block('article')} ${block('article-left')}`} key={article.id}>
      <section className={block('wrapper-article')}>
        <div className={block('section-box')}>
          <h3 className={block('title-article')}>{article.title}</h3>
          <p className={block('text-article')}>{article.text}</p>
        </div>
        <img src={article.image} alt={article.title} className={block('img-article')} />
      </section>
    </article>
  ));

  return (
    <section className={block()}>
      <div className={block('box-download')}>
        <div className={block('new-person')}>
          <h2 className={block('title-download')}>Are you new here?</h2>
          <div>
            <Link to={ROUTES.SIGN_UP} className={block('link-signup')}>
              <button type="button" className={block('btn-signup')}>
                Create account now
              </button>
            </Link>
          </div>
        </div>
        <div className={block('box-about')}>
          <h2 className={block('title-download')}>Find out how we work</h2>
          <div className={block('box-article')}>{aboutSection}</div>
        </div>
      </div>
    </section>
  );
};

export default Download;
