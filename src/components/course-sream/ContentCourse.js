import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';
import courseGlobal from '../../context/courseGlobal';
import UserContext from '../../context/user';

import HeaderCourse from './HeaderCourse';
import StreamPanel from './StreamPanel';
import ChatPanel from './ChatPanel';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const ContentCourse = () => {
  const { user } = useContext(UserContext);
  const { course, userIsInCourseList, setUserCourse } = useContext(courseGlobal);

  useEffect(() => {
    setUserCourse(user);
  }, []);

  return (
    <div className={block('content-course')}>
      {course.length === 0 && !userIsInCourseList ? (
        <p>You do not have access to this course</p>
      ) : (
        <section className={block('container-course')}>
          <HeaderCourse />
          <StreamPanel />
          <ChatPanel />
        </section>
      )}
    </div>
  );
};

export default ContentCourse;
