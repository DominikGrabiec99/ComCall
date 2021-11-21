import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import io from 'socket.io-client';
import Peer from 'simple-peer';

import UserContext from '../../../context/user';
import FirebaseContext from '../../../context/firebase';

import VideoUser from './VideoUser';
import StreamOptions from './StreamOptions';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/room/Room.module.scss';

const block = bemCssModules(CourseStyles);

const RoomContent = () => {
  const { id, courseId } = useParams();

  const { actualUser, user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);

  const [peers, setPeers] = useState([]);
  const [isStarted, setIsstarted] = useState(false);

  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = id;

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const closeCourseStream = async () => {
    if (actualUser[0].isTeacher && courseId) {
      await firebase.firestore().collection(`courses`).doc(courseId).update({
        streamId: ''
      });
    }

    window.close();
  };

  useEffect(() => {
    if (isStarted) return null;
    socketRef.current = io.connect('/');
    let stream = null;

    async function getStream() {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }

    getStream();

    let ObjectMediaDevice = {};

    try {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) =>
          devices.forEach((device) => {
            if (device.kind === 'audioinput' && device.label) {
              ObjectMediaDevice.audio = true;
            }
            if (device.kind === 'videoinput') {
              ObjectMediaDevice.video = true;
            }
            if (device.kind !== 'audioinput' && device.kind !== 'videoinput' && device.labe) {
              ObjectMediaDevice = {};
            }
          })
        )
        .then(() => {
          navigator.mediaDevices.getUserMedia(ObjectMediaDevice).then(async (stream) => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit('join-room', roomID);
            socketRef.current.on('all-users', (users) => {
              const peers = [];
              users.forEach((userID) => {
                const peer = createPeer(userID, socketRef.current.id, stream);
                peersRef.current.push({
                  peerID: userID,
                  peer
                });
                peers.push(peer);
              });
              setPeers(peers);
            });

            socketRef.current.on('user-joined', (payload) => {
              const peer = addPeer(payload.signal, payload.callerID, stream);
              peersRef.current.push({
                peerID: payload.callerID,
                peer
              });

              setPeers((users) => [...users, peer]);
            });

            socketRef.current.on('receiving returned signal', (payload) => {
              const item = peersRef.current.find((p) => p.peerID === payload.id);
              item.peer.signal(payload.signal);
            });
          });
        });
    } catch (err) {
      console.log(err);
    }

    setIsstarted(true);

    return () => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      window.addEventListener('beforeunload', async (e) => {
        e.preventDefault();
        await closeCourseStream();
      });
    };
  }, []);

  const checkPeersLength = () => {
    if (peers.length + 1 === 1) {
      return 'users-box-room-1';
    }
    if (peers.length + 1 === 2) {
      return 'users-box-room-2-1';
    }
    if (peers.length + 1 < 5) {
      return 'users-box-room-2';
    }
    if (peers.length + 1 < 10) {
      return 'users-box-room-3';
    }
    if (peers.length + 1 < 16) {
      return 'users-box-room-4';
    }
    if (peers.length + 1 < 25) {
      return 'users-box-room-5';
    }
    if (peers.length + 1 < 36) {
      return 'users-box-room-6';
    }
  };

  const randomColorBg = () => {
    const color = Math.floor(Math.random() * 360);

    return { backgroundColor: `hsl(${color}deg, 50%, 10%)` };
  };

  return (
    <section className={block('content-room')}>
      <div className={`${block('users-box-room')} ${block(checkPeersLength())}`}>
        <article className={block('user-view')} style={randomColorBg()}>
          <div className={block('user-name-box')}>
            <p className={block('user-name')}>{user.displayName}</p>
          </div>
          <video className={block('user-video')} muted ref={userVideo} autoPlay playsInline />
        </article>
        {peers.map((peer, index) => (
          <VideoUser key={index} peer={peer} randomColorBg={randomColorBg} />
        ))}
      </div>
      <StreamOptions closeCourseStream={closeCourseStream} />
    </section>
  );
};

export default RoomContent;
