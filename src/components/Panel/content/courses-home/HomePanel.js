import React, { useEffect, useState, useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import { getCoursesByUserId } from '../../../../services/firebase';
import Courses from './Courses';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyle } from '../../../../styles/panel/content/Courses.module.scss';
import Loading from '../../../Loading';
import UserContext from '../../../../context/user';

const block = bemCssModules(CoursesStyle);

const HomePanel = () => {
  const { user } = useContext(UserContext);
  const [arrayCourse, setArrayCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function getCoursesArray() {
      setArrayCourse(await getCoursesByUserId(user.uid, setIsLoading));
    }

    getCoursesArray();
  }, [user]);

  // eslint-disable-next-line no-nested-ternary
  return isLoading && (arrayCourse === null || arrayCourse.length === 0) ? (
    <Loading />
  ) : arrayCourse !== null && arrayCourse.length <= 0 ? (
    <p className={block('no-courses')}>You have not been assigned to any courses :(</p>
  ) : (
    <Courses arrayCourse={arrayCourse} />
  );
};

export default HomePanel;
