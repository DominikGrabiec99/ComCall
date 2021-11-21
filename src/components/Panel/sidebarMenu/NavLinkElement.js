import React from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line import/no-named-default
import { default as SidebarMenuStyles } from '../../../styles/panel/SidebarMenu.module.scss';

const block = bemCssModules(SidebarMenuStyles);

const NavLinkElement = ({ to, text, icon, isVisibility }) => (
  <NavLink
    exact
    to={`/${to}`}
    activeClassName={block('menu-icon-active')}
    className={block('box-icon')}
  >
    <span className={`${block('icon')} material-icons-outlined`}>{icon}</span>
    <p
      className={`${
        isVisibility ? `${block('name-icon')} ${block('name-icon-open')}` : `${block('name-icon')}`
      }`}
    >
      {text}
    </p>
  </NavLink>
);

export default NavLinkElement;

NavLinkElement.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  isVisibility: PropTypes.bool
};
