/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import { NavLink } from 'react-router-dom';
import { sidebarOption, sidebarOptionAdmin } from '../../constans/text';

import UserContext from '../../context/user';

import NavLinkElement from './sidebarMenu/NavLinkElement';

// eslint-disable-next-line import/no-named-default
import { default as SidebarMenuStyles } from '../../styles/panel/SidebarMenu.module.scss';

const block = bemCssModules(SidebarMenuStyles);

const SidebarMenu = () => {
  const sidebar = useRef();
  const [isVisibility, setIsVisibility] = useState(false);
  const [openArrowIsVisible, setOpenArrowIsVisible] = useState(true);

  const { actualUser } = useContext(UserContext);

  const handleOnClickToggle = () => {
    if (!sidebar) {
      return null;
    }
    sidebar.current.classList.toggle(`${block('close-menu')}`);
    sidebar.current.classList.toggle(`${block('open-menu')}`);
    setIsVisibility(!isVisibility);
    setOpenArrowIsVisible(!openArrowIsVisible);
  };

  return (
    <div className={`${block()} ${block('close-menu')}`} ref={sidebar}>
      {actualUser.length !== 0 && (
        <>
          <div className={`${block('wrapper-sidebar')} ${block('wrapper-left')}`}>
            {actualUser.length !== 0 && actualUser[0].isAdmin
              ? sidebarOptionAdmin.map((option) => (
                  <NavLinkElement {...option} isVisibility={isVisibility} key={option.id} />
                ))
              : sidebarOption.map((option) => (
                  <NavLinkElement {...option} isVisibility={isVisibility} key={option.id} />
                ))}
          </div>
          <div className={`${block('wrapper-sidebar')} ${block('wrapper-rigth')}`}>
            <div
              className={`${block('open-close-menu')} ${block('box-icon')} ${
                !openArrowIsVisible && block('box-icon-visible')
              }`}
              onClick={handleOnClickToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleOnClickToggle();
                }
              }}
            >
              <span className={`${block('icon')} material-icons-outlined`}>arrow_forward_ios</span>
            </div>
            <div
              className={`${block('open-close-menu')} ${block('box-icon')} ${
                openArrowIsVisible && block('box-icon-visible')
              }`}
              onClick={handleOnClickToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleOnClickToggle();
                }
              }}
            >
              <span className={`${block('icon')} material-icons-outlined`}>arrow_back_ios</span>
            </div>
            <NavLink
              exact
              to={actualUser[0].isAdmin ? '/admin/settings' : '/panel/settings'}
              className={block('box-icon')}
            >
              <span className={`${block('icon')} material-icons-outlined`}>settings</span>
              <p
                className={`${
                  isVisibility
                    ? `${block('name-icon')} ${block('name-icon-open')}`
                    : `${block('name-icon')}`
                }`}
              >
                Setting
              </p>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarMenu;
