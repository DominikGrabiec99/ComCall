import React from 'react';
import bemCssModules from 'bem-css-modules';

import AllMessages from './messages/AllMessages';
import SendMessages from './messages/SendMessages';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const ChatPanel = () => (
  <div className={block('chat-panel')}>
    <AllMessages />
    <SendMessages />
  </div>
);

export default ChatPanel;
