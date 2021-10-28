import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCoursesByCourseId, getUserByUserId } from '../services/firebase';
import courseGlobal from './courseGlobal';

const ContextCourse = ({ children }) => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [userCourse, setUserCourse] = useState([]);
  const [userActual, setUserActual] = useState(null);
  const [userIsInCourseList, setUserIsInCourseList] = useState(false);

  useEffect(() => {
    async function getCourseById() {
      setCourse(await getCoursesByCourseId(id));
    }

    getCourseById();
  }, [id]);

  useEffect(() => {
    async function getUserById() {
      if (userCourse.length !== 0) {
        setUserActual(await getUserByUserId(userCourse.uid));
      }
    }

    getUserById();
  }, [userCourse]);

  useEffect(() => {
    if (userActual) {
      setUserIsInCourseList(userActual[0].courses.includes(id));
    }
  }, [userActual]);

  return (
    <courseGlobal.Provider
      value={{
        id,
        userCourse,
        setUserCourse,
        course,
        setCourse,
        userActual,
        setUserActual,
        userIsInCourseList,
        setUserIsInCourseList
      }}
    >
      {children}
    </courseGlobal.Provider>
  );
};

export default ContextCourse;

ContextCourse.propTypes = {
  children: PropTypes.object
};
