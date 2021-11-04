import React, { createContext } from 'react';

const courseGlobal = createContext({
  id: '',
  userCourse: null,
  setUserCourse: () => {},
  course: [],
  setCourse: () => {},
  userActual: {},
  setUserActual: () => {},
  userIsInCourseList: false,
  setUserIsInCourseList: () => {},
  isLoading: true,
  setIsLoading: () => {},
  message: '',
  setMessage: () => {},
  handleSubmitMessage: () => {},
  scroll: {}
});

export default courseGlobal;
