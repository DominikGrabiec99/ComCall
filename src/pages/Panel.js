import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import Footer from '../components/Footer';
import bemCssModules from 'bem-css-modules';
import Header from '../components/Header';
import SidebarMenu from '../components/Panel/SidebarMenu';
import ContentPanel from '../components/Panel/ContentPanel';

// eslint-disable-next-line import/no-named-default
import { default as PanelStyles } from '../styles/panel/Panel.module.scss';

const block = bemCssModules(PanelStyles);

const Panel = () => {
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
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
