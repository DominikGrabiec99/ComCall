import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Firebase from 'firebase/compat/app';
///
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';
///
import { getCoursesByCourseId, getUserByUserId } from '../services/firebase';
import courseGlobal from './courseGlobal';

import FirebaseContext from './firebase';
import UserContext from './user';

///
// const socket = io('http://localhost:5000');
///

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

  ///
  // const [stream, setStream] = useState(null);
  // const [me, setMe] = useState('');
  // const [name, setName] = useState(user.displayName);
  // const [call, setCall] = useState({});
  // const [callAccepted, setCallAccepted] = useState(false);
  // const [callEnded, setCallEnded] = useState(false);
  // const [startStream, setStartStream] = useState(false);
  // const [isCalling, setIsCalling] = useState(false);

  // const myVideo = useRef();
  // const userVideo = useRef();
  // const connectionRef = useRef();

  ///

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
      scroll.current.scrollIntoView({ behavior: 'smooth' });
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

  ///

  // useEffect(() => {
  //   if (!startStream) return;
  //   async function updateCallData() {
  //     await firebase.firestore().collection(`courses`).doc(course[0].docId).update({
  //       streamId: me
  //     });
  //   }

  //   try {
  //     navigator.mediaDevices.getUserMedia({ audio: true }).then((currentStream) => {
  //       setStream(currentStream);
  //       myVideo.current.srcObject = currentStream;
  //     });

  //     updateCallData();

  //     window.addEventListener('beforeunload', () => {
  //       firebase.firestore().collection(`courses`).doc(course[0].docId).update({
  //         streamId: ''
  //       });
  //       setCallEnded(true);
  //       connectionRef.current.destroy();
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [startStream]);

  // useEffect(() => {
  //   socket.on('me', (id) => setMe(id));

  //   socket.on('callUser', ({ from, name: callerName, signal }) => {
  //     setCall({ isReceivingCall: true, from, name: callerName, signal });
  //   });
  // }, [startStream]);

  // const answerCall = () => {
  //   setCallAccepted(true);
  //   setIsCalling(false);
  //   setStartStream(true);

  //   const peer = new Peer({ initiator: false, trickle: false, stream });

  //   peer.on('signal', (data) => {
  //     socket.emit('answerCall', { signal: data, to: call.from });
  //   });

  //   peer.on('stream', (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };

  // const callUser = (id) => {
  //   const peer = new Peer({ initiator: true, trickle: false, stream });

  //   peer.on('signal', (data) => {
  //     console.log(data);
  //     socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
  //   });

  //   peer.on('stream', (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   socket.on('callAccepted', (signal) => {
  //     setCallAccepted(true);
  //     setIsCalling(false);
  //     setStartStream(true);

  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);
  //   connectionRef.current.destroy();

  //   window.location.reload();
  // };

  // const [peers, setPeers] = useState([]);
  // const socketRef = useRef();
  // const userVideo = useRef();
  // const peersRef = useRef([]);
  // const roomID = '';
  // user.displayName

  // const createPeer = (userToSignal, callerID, stream, name) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream
  //   });

  //   peer.on('signal', (signal) => {
  //     socketRef.current.emit('sending signal', { userToSignal, callerID, name, signal });
  //   });

  //   return peer;
  // };

  // const addPeer = (incomingSignal, callerID, name, stream) => {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream
  //   });

  //   peer.on('signal', (signal) => {
  //     socketRef.current.emit('returning signal', { signal, callerID, name });
  //   });

  //   peer.signal(incomingSignal);

  //   return peer;
  // };

  // useEffect(() => {
  //   if (userVideo.current === undefined) return;
  //   socketRef.current = io.connect('/');
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     userVideo.current.srcObject = stream;
  //     socketRef.current.emit('join rooom', roomID);
  //     socketRef.current.on('all users', (users) => {
  //       const peers = [];
  //       users.forEach((userID) => {
  //         const peer = createPeer(userID, socketRef.current.id, stream, user.displayName);
  //         peersRef.current.push({
  //           peerId: userID,
  //           peer
  //         });
  //         peers.push(peer);
  //       });
  //       setPeers(peers);
  //     });
  //     socketRef.current.on('user join', (payload) => {
  //       const peer = addPeer(payload.signal, payload.callerID, payload.name, stream);
  //       peersRef.current.push({
  //         peerID: payload.callerID,
  //         peer
  //       });
  //       setPeers((users) => [...users, peer]);
  //     });

  //     socketRef.current.on('receiving returned signal', (payload) => {
  //       const item = peers.current.find((p) => p.peerID === payload.id);
  //       item.peer.signal(payload.signal);
  //     });
  //   });
  // }, [userVideo]);

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
        // call,
        // callAccepted,
        // myVideo,
        // userVideo,
        // stream,
        // callEnded,
        // name,
        // me,
        // answerCall,
        // callUser,
        // leaveCall,
        // setStartStream,
        // setIsCalling,
        // isCalling
        // peers,
        // socketRef,
        // userVideo,
        // peersRef
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
