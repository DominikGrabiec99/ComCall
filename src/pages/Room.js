import React from 'react';
import bemCssModules from 'bem-css-modules';

import Header from '../components/Header';
import SidebarMenu from '../components/Panel/SidebarMenu';
import RoomContent from '../components/course-sream/room/RoomContent';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../styles/course/room/Room.module.scss';

const block = bemCssModules(CourseStyles);

const Room = () => (
  <>
    <Header />
    <div className={block()}>
      <SidebarMenu />
      <RoomContent />
    </div>
  </>
);

export default Room;
