/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/room/Room.module.scss';

const block = bemCssModules(CourseStyles);

const StreamOptions = () => (
  <section className={block('container-options-call')}>
    <div className={`${block('icon-container')} ${block('icon-container-video')}`}>
      <span className="material-icons-outlined">videocam</span>
      {/* <span className="material-icons-outlined">videocam_off</span> */}
    </div>
    <div
      className={`${block('icon-container')} ${block('icon-container-end')}`}
      onClick={() => window.close()}
    >
      <span className="material-icons-outlined">phone_disabled</span>
    </div>
    <div className={`${block('icon-container')} ${block('icon-container-volume')}`}>
      {/* <span className="material-icons-outlined">volume_off</span> */}
      <span className="material-icons-outlined">volume_mute</span>
    </div>
  </section>
);
export default StreamOptions;
