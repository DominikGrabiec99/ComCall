/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import courseGlobal from '../../../context/courseGlobal';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const StreamOptions = () =>
  // const { leaveCall, callUser, stream, course, setStartStream, setIsCalling } =
  //   useContext(courseGlobal);

  null;
// <section className={block('container-options-call')}>
//   {stream ? (
//     <>
//       <div className={`${block('icon-container')} ${block('icon-container-video')}`}>
//         <span className="material-icons-outlined">videocam</span>
//         {/* <span className="material-icons-outlined">videocam_off</span> */}
//       </div>
//       <div className={`${block('icon-container')} ${block('icon-container-end')}`}>
//         <span className="material-icons-outlined" onClick={leaveCall}>
//           phone_disabled
//         </span>
//       </div>
//       <div className={`${block('icon-container')} ${block('icon-container-volume')}`}>
//         {/* <span className="material-icons-outlined">volume_off</span> */}
//         <span className="material-icons-outlined">volume_mute</span>
//       </div>
//     </>
//   ) : (
//     <div className={`${block('icon-container')} ${block('icon-container-call')}`}>
//       <span
//         className="material-icons-outlined"
//         onClick={() => {
//           if (course[0].streamId === '') {
//             setStartStream(true);
//           } else {
//             setIsCalling(true);
//             callUser(course[0].streamId);
//           }
//         }}
//       >
//         call
//       </span>
//     </div>
//   )}
// </section>
export default StreamOptions;
