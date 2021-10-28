import React from 'react';
import bemCssModules from 'bem-css-modules';
import ContextCourse from '../context/ContextCourse';

import Header from '../components/Header';
import SidebarMenu from '../components/Panel/SidebarMenu';
import ContentCourse from '../components/course-sream/ContentCourse';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const Course = () => (
  <>
    <Header />
    <div className={block()}>
      <SidebarMenu />
      <ContextCourse>
        <ContentCourse />
      </ContextCourse>
    </div>
  </>
);

export default Course;
