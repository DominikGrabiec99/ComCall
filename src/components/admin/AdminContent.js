import React from 'react';
import { useParams } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import ContextCalendar from '../../context/ContextCalendar';

import CalendarPanel from '../Panel/content/CalendarPanel';
import CoursesPanel from './courses/CoursesPanel';
import HomePanel from './home/HomePanel';
import UsersPanel from './users/UsersPanel';
import SettingsPanel from './settings/SettingsPanel';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../styles/panel/ContentPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const AdminContent = () => {
  const params = useParams();
  const { id } = params;

  if (id === 'home') {
    return (
      <div className={block()}>
        <HomePanel />
      </div>
    );
  }

  if (id === 'courses') {
    return (
      <div className={block()}>
        <CoursesPanel />
      </div>
    );
  }

  if (id === 'users') {
    return (
      <div className={block()}>
        <UsersPanel />
      </div>
    );
  }

  if (id === 'calendar') {
    return (
      <div className={block()}>
        <ContextCalendar>
          <CalendarPanel />
        </ContextCalendar>
      </div>
    );
  }

  if (id === 'settings') {
    return (
      <div className={block()}>
        <SettingsPanel />
      </div>
    );
  }

  return null;
};

export default AdminContent;
