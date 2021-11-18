import React from 'react';
import { useParams } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import ContextCalendar from '../../context/ContextCalendar';
import ContextChat from '../../context/ContexChat';

import HomePanel from './content/courses-home/HomePanel';
import ChatPanel from './content/chat/ChatPanel';
import CalendarPanel from './content/CalendarPanel';
import DocumentPanel from './content/DocumentPanel';
import SettingsPanel from './content/SettingsPanel';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../styles/panel/ContentPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const ContentPanel = () => {
  const params = useParams();
  const { id } = params;

  if (id === 'home') {
    return (
      <div className={block()}>
        <HomePanel />
      </div>
    );
  }

  if (id === 'chat') {
    return (
      <ContextChat>
        <div className={block()}>
          <ChatPanel />
        </div>
      </ContextChat>
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

  if (id === 'listTasks') {
    return (
      <div className={block()}>
        <DocumentPanel />
      </div>
    );
  }

  if (id === 'document') {
    return (
      <div className={block()}>
        <DocumentPanel />
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

  if (id === 'messages') {
    return (
      <ContextChat>
        <div className={block()}>
          <ChatPanel />
        </div>
      </ContextChat>
    );
  }

  return null;
};

export default ContentPanel;
