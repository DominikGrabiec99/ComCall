import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import courseGlobal from '../../context/courseGlobal';
import UserContext from '../../context/user';
import { getMessagesCourse } from '../../services/firebase';

import HeaderCourse from './HeaderCourse';
import StreamPanel from './StreamPanel';
import ChatPanel from './ChatPanel';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const ContentCourse = () => {
  const { user } = useContext(UserContext);
  const { course, setCourse, userIsInCourseList, setUserCourse, setIsLoading } =
    useContext(courseGlobal);

  const { courseId } = course.length !== 0 && course[0];

  useEffect(() => {
    async function getCourseMess() {
      if (user && courseId) {
        await getMessagesCourse(courseId, setCourse, setIsLoading).then(() => setIsLoading(false));
      }
    }

    getCourseMess();
  }, [courseId]);

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
