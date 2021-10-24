import React from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';
import Course from './Course';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyle } from '../../../../styles/panel/content/Courses.module.scss';

const block = bemCssModules(CoursesStyle);

const Courses = ({ arrayCourse }) => (
  <div className={block()}>
    {arrayCourse &&
      arrayCourse.map((course) => {
        const { image, courseId, name } = course;
        return (
          <Course key={courseId} image={image} name={name} courseId={courseId} course={course} />
        );
      })}
  </div>
);

export default Courses;

Courses.propTypes = {
  arrayCourse: PropTypes.array
};
