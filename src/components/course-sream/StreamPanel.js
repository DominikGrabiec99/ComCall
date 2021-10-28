import React from 'react';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const StreamPanel = () => (
  <div className={block('stream-panel')}>
    <p>stream</p>
  </div>
);

export default StreamPanel;
