import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Firebase from 'firebase/compat/app';
import { getCoursesByCourseId, getUserByUserId } from '../services/firebase';
import courseGlobal from './courseGlobal';

import FirebaseContext from './firebase';
import UserContext from './user';

const ContextCourse = ({ children }) => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [userCourse, setUserCourse] = useState([]);
  const [userActual, setUserActual] = useState(null);
  const [userIsInCourseList, setUserIsInCourseList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const scroll = useRef();

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

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

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [scroll.current]);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (!message) {
      return null;
    }

    if (course.length === 0) {
      return null;
    }

    try {
      const today = new Date();
      const newItem = {
        id: `${today.getTime()}${user.uid.slice(0, 5)}`,
        author: user.uid,
        time: today.getTime(),
        text: message
      };

      await firebase
        .firestore()
        .collection(`courses`)
        .doc(course[0].docId)
        .update({
          messages: Firebase.firestore.FieldValue.arrayUnion(newItem)
        });

      setMessage('');
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      console.log(e);
    }
  };

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
        setUserIsInCourseList,
        isLoading,
        setIsLoading,
        message,
        setMessage,
        handleSubmitMessage,
        scroll
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
