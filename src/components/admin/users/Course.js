import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Users.module.scss';
import { getCoursesByCourseId } from '../../../services/firebase';

const block = bemCssModules(CoursesStyles);

const Course = ({
  courseId,
  coursesState,
  setCoursesState,
  method,
  setRemoveCourse,
  removeCourse
}) => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    async function getCourse() {
      setCourse(await getCoursesByCourseId(courseId));
    }

    getCourse();

    return () => {
      setCourse([]);
    };
  }, []);

  const handleOnClkickRemove = () => {
    setCoursesState(
      coursesState.filter((course) => {
        if (courseId === course) {
          setRemoveCourse([...removeCourse, course]);
          return null;
        }

        return course;
      })
    );
  };

  const handleOnClkickAdd = () => {
    if (coursesState.includes(courseId)) return;
    setCoursesState([...coursesState, courseId]);
  };

  if (course.length === 0) return null;

  return (
    <div className={block('course-container')}>
      <p className={block('course-param')}>{course[0].courseId}</p>
      <p className={block('course-param')}>{course[0].name}</p>
      {method === 'remove' && (
        <button type="button" onClick={handleOnClkickRemove} className={block('course-btn')}>
          <span className="material-icons">clear</span>
        </button>
      )}
      {method === 'add' && (
        <button type="button" onClick={handleOnClkickAdd} className={block('course-btn')}>
          <span className="material-icons">add</span>
        </button>
      )}
    </div>
  );
};

export default Course;

Course.propTypes = {
  courseId: PropTypes.string,
  coursesState: PropTypes.array,
  setCoursesState: PropTypes.func,
  method: PropTypes.string,
  setRemoveCourse: PropTypes.func,
  removeCourse: PropTypes.array
};
