import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/room/Room.module.scss';

const block = bemCssModules(CourseStyles);

const VideoUser = ({ peer, randomColorBg }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });

    return () => {
      ref.current = null;
    };
  }, []);
  return (
    <article className={block('user-view')} style={randomColorBg()}>
      <div className={block('user-name-box')}>
        <p className={block('user-name')}>user</p>
      </div>
      <video className={block('user-video')} muted ref={ref} autoPlay playsInline />
    </article>
  );
};

export default VideoUser;

VideoUser.propTypes = {
  peer: PropTypes.object,
  randomColorBg: PropTypes.func
};
