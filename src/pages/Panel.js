import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import UserContext from '../context/user';

import Header from '../components/Header';
import SidebarMenu from '../components/Panel/SidebarMenu';
import ContentPanel from '../components/Panel/ContentPanel';

// eslint-disable-next-line import/no-named-default
import { default as PanelStyles } from '../styles/panel/Panel.module.scss';

const block = bemCssModules(PanelStyles);

const Panel = () => {
  const params = useParams();
  const history = useHistory();
  const { actualUser } = useContext(UserContext);

  useEffect(() => {
    if (actualUser.length !== 0 && actualUser[0].isAdmin) {
      history.push('/admin/home');
    }
    if (params.id === ':id') {
      history.push('/panel/home');
    } else if (
      params.id !== 'home' &&
      params.id !== 'chat' &&
      params.id !== 'calendar' &&
      params.id !== 'document' &&
      params.id !== 'listTasks' &&
      params.id !== 'settings' &&
      params.id !== 'messages'
    ) {
      history.push('/panel/home');
    }
    document.title = 'ComCall';
  }, [params]);

  return (
    <>
      <Header />
      <div className={block()}>
        <SidebarMenu />
        <ContentPanel />
      </div>
    </>
  );
};

export default Panel;
