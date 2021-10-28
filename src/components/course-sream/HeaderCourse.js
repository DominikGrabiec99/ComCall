import React from 'react';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const HeaderCourse = () => (
  <header className={block('header-course')}>
    <p>header</p>
  </header>
);

export default HeaderCourse;
