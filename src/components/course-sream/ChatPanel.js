import React from 'react';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const ChatPanel = () => (
  <div className={block('chat-panel')}>
    <p>chat</p>
  </div>
);

export default ChatPanel;
