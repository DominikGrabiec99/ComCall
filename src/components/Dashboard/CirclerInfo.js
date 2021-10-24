/* eslint-disable import/no-named-default */
import React, { useState } from 'react';
import bemCssModules from 'bem-css-modules';
import { circleBox } from '../../constans/text';

import { default as CirclerInfoStyles } from '../../styles/dashboard/CirclerInfo.module.scss';

const block = bemCssModules(CirclerInfoStyles);

const Statistics = () => {
  const [circleNumber, setCircleNumber] = useState(1);

  const handleOnClickChangeNumerCircle = (e) => {
    setCircleNumber(e.target.id);
    // e.target.parentElement.className += ` ${block('active-circle')}`;
  };

  const circleElemnts1 = circleBox.map((circle) => {
    if (circle.id <= 4) {
      return (
        <div
          key={circle.id}
          className={`${block('small-circle')} ${block(circle.class)} ${
            Number(circleNumber) === Number(circle.id) ? block('active-circle') : null
          }`}
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={circle.icon}
            alt={circle.title}
            className={block('icon-circle')}
            onClick={(e) => handleOnClickChangeNumerCircle(e)}
            id={circle.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleOnClickChangeNumerCircle(e);
              }
            }}
          />
        </div>
      );
    }
    return null;
  });

  const circleElemnts2 = circleBox.map((circle) => {
    if (circle.id > 4) {
      return (
        <div
          key={circle.id}
          className={`${block('small-circle')} ${block(circle.class)} ${
            Number(circleNumber) === Number(circle.id) ? block('active-circle') : null
          }`}
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={circle.icon}
            alt={circle.title}
            className={block('icon-circle')}
            onClick={(e) => handleOnClickChangeNumerCircle(e)}
            id={circle.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleOnClickChangeNumerCircle(e);
              }
            }}
          />
        </div>
      );
    }
    return null;
  });

  const circleElementsBox = circleBox.map((circle) => (
    <article
      className={`${block('container-description')} ${
        Number(circleNumber) === Number(circle.id) ? block('is-visible') : block('is-not-visible')
      }`}
      key={circle.id}
    >
      <div className={block('title-box')}>
        <h2>{circle.title}</h2>
        <img src={circle.images} alt="" className={block('img-box')} />
      </div>
      <div className={block('text-box')}>
        <p className={block('text-circle')}>{circle.text}</p>
      </div>
    </article>
  ));

  return (
    <section className={block()}>
      <section className={block('left-box')}>
        <div className={block('circle-box')}>
          <div className={block('circle')}>
            <img src="/images/logo.png" alt="ComCall logo" className={block('logo-img')} />
            {circleElemnts1}
            <div className={block('square')}>{circleElemnts2}</div>
          </div>
        </div>
      </section>
      <section className={block('right-box')}>
        <div className={block('box')}>{circleElementsBox}</div>
      </section>
    </section>
  );
};

export default Statistics;
