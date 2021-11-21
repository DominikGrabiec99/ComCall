import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import Header from '../components/Header';
import SidebarMenu from '../components/Panel/SidebarMenu';
import AdminContent from '../components/admin/AdminContent';

// eslint-disable-next-line import/no-named-default
import { default as PanelStyles } from '../styles/panel/Panel.module.scss';

const block = bemCssModules(PanelStyles);

const Admin = () => {
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.id === ':id') {
      history.push('/panel/home');
    } else if (
      params.id !== 'home' &&
      params.id !== 'calendar' &&
      params.id !== 'courses' &&
      params.id !== 'users' &&
      params.id !== 'settings'
    ) {
      history.push('/admin/home');
    }
    document.title = 'ComCall';
  }, [params]);
  return (
    <>
      <Header />
      <div className={block()}>
        <SidebarMenu />
        <AdminContent />
      </div>
    </>
  );
};

export default Admin;
