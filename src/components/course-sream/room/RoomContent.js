import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import io from 'socket.io-client';
import Peer from 'simple-peer';

import UserContext from '../../../context/user';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/room/Room.module.scss';

const block = bemCssModules(CourseStyles);

const RoomContent = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [peers, setPeers] = useState([]);
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

  useEffect(() => {
    socketRef.current = io.connect('/');
    let stream = null;

    async function getStream() {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }

    getStream();

    navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit('join-room', roomID);
      socketRef.current.on('all-users', (users) => {
        const peers = [];
        users.forEach((userID) => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          console.log('peer1', peer);
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

    return () => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  return (
    <section className={block('content-room')}>
      <article className={block('user-view')}>
        <div>
          <p className={block('user-name')}>{user.displayName}</p>
        </div>
        <video muted ref={userVideo} autoPlay playsInline />
      </article>
      {peers.map((peer, index) => console.log(peer))}
    </section>
  );
};

export default RoomContent;

// <section className={block('stream-grid')}>
//   {stream && (
//     <article className={block('user-view')}>
//       <div>
//         <p className={block('user-name')}>{name || 'User Name'}</p>
//       </div>
//       <video playsInline muted ref={myVideo} autoPlay className={block('stream-video')} />
//     </article>
//   )}
//   {callAccepted && !callEnded && (
//     <article className={block('user-view')}>
//       <div>
//         <p className={block('user-name')}>{call.name || 'User Name'}</p>
//       </div>
//       {/* // eslint-disable-next-line jsx-a11y/media-has-caption */}
//       <video playsInline autoPlay ref={userVideo} className={block('stream-video')} />
//     </article>
//   )}
//   {call.isReceivingCall && !callAccepted && (
//     <div className={block('answer-call')}>
//       <p>{call.name} is calling</p>
//       <button type="button" className={block('answer-call-btn')} onClick={answerCall}>
//         <p>Answer</p>
//       </button>
//     </div>
//   )}
//   {isCalling && (
//     <div className={block('answer-call')}>
//       <p>Is calling...</p>
//     </div>
//   )}
// </section>
