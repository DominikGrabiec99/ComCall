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
  // ///
  // call: {},
  // callAccepted: false,
  // myVideo: {},
  // userVideo: {},
  // stream: null,
  // callEnded: false,
  // name: '',
  // me: '',
  // answerCall: () => {},
  // callUser: (id) => {},
  // leaveCall: () => {},
  // setStartStream: () => {},
  // setIsCalling: () => {},
  // isCalling: false
  ///
  // peers: [],
  // socketRef: {},
  // userVideo: {},
  // peersRef: {}
});

export default courseGlobal;
