import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import courseGlobal from '../../context/courseGlobal';
import UserContext from '../../context/user';
import { getMessagesCourse } from '../../services/firebase';

import HeaderCourse from './HeaderCourse';
import List from './list/List';
import ChatPanel from './ChatPanel';
import PanelTask from './task-panel/PanelTask';
import Loading from '../Loading';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const ContentCourse = () => {
  const [isVisible, setIsVisaible] = useState(false);
  const { user } = useContext(UserContext);
  const { course, setCourse, userIsInCourseList, setUserCourse, setIsLoading, isLoading } =
    useContext(courseGlobal);

  const { courseId, docId } = course.length !== 0 && course[0];

  useEffect(() => {
    async function getCourseMess() {
      if (user && courseId) {
        await getMessagesCourse(courseId, setCourse, setIsLoading).then(() => setIsLoading(false));
      }
    }

    getCourseMess();

    return () => {
      setIsLoading(true);
    };
  }, [courseId]);

  useEffect(() => {
    setUserCourse(user);
  }, []);

  const handleOnClickTogglePanel = () => setIsVisaible(!isVisible);

  if (isLoading) {
    return (
      <div className={block('content-course')}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={block('content-course')}>
      {course.length === 0 && !userIsInCourseList ? (
        <p>You do not have access to this course</p>
      ) : (
        <>
          <section className={block('container-course')}>
            <HeaderCourse />
            <div className={block('stream-panel')}>
              <List handleOnClickTogglePanel={handleOnClickTogglePanel} />
            </div>
            <ChatPanel />
          </section>
          {isVisible && (
            <section className={block('add-task-panel')}>
              <PanelTask handleOnClickTogglePanel={handleOnClickTogglePanel} courseId={docId} />
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default ContentCourse;
