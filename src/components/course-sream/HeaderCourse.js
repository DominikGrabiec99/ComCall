import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import courseGlobal from '../../context/courseGlobal';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const HeaderCourse = () => {
  const { course } = useContext(courseGlobal);
  const { name } = course[0];

  return (
    <header className={block('header-course')}>
      <h1 className={block('header-name')}>{name}</h1>
    </header>
  );
};

export default HeaderCourse;
