import React from 'react';
import bemCssModules from 'bem-css-modules';
import CoursesChart from './CoursesChart';
import UsersChart from './UsersChart';

// eslint-disable-next-line import/no-named-default
import { default as HomeStyles } from '../../../styles/admin/Home.module.scss';

const block = bemCssModules(HomeStyles);

const HomePanel = () => (
  <div className={block()}>
    <h2 className={block('header-title')}>New Users</h2>
    <UsersChart />
    <h2 className={block('header-title')}>Users in Courses</h2>
    <CoursesChart />
  </div>
);

export default HomePanel;
