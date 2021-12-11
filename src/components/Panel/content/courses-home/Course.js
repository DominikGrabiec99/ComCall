import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyle } from '../../../../styles/panel/content/Courses.module.scss';

const block = bemCssModules(CoursesStyle);

const Course = ({ image, name, courseId, course }) => (
  <div className={block('box-course')}>
    <Link className={block('link')} to={`/course/${courseId}`} params={{ course }}>
      <img className={block('image')} src={image} alt={name} />
      <div className={block('text-box')}>
        <p className={block('text')}> {` ${name}`}</p>
      </div>
    </Link>
  </div>
);

export default Course;

Course.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  courseId: PropTypes.string,
  course: PropTypes.object
};
