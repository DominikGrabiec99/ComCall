import React from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Users.module.scss';

const block = bemCssModules(CoursesStyles);

const User = ({ user, setChosenUser, setIsAddUserPanelVisible }) => {
  const { userId, fullName, emailAddress, dateCreated, isAdmin, isTeacher } = user;
  const d = new Date(dateCreated);

  const handleOnClickOpenPanel = () => {
    setChosenUser(user);
    setIsAddUserPanelVisible(true);
  };

  return (
    <tr className={block('user-table-tr')}>
      <td className={block('user-info-box')}>
        <span>{userId}</span>
      </td>
      <td className={block('user-info-box')}>
        <span>{fullName}</span>
      </td>
      <td className={block('user-info-box')}>
        <span>{emailAddress}</span>
      </td>
      <td className={block('user-info-box')}>
        <span>{String(isAdmin)}</span>
      </td>
      <td className={block('user-info-box')}>
        <span>{String(isTeacher)}</span>
      </td>
      <td className={block('user-info-box')}>
        <span>{`${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}-${
          d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }-${d.getFullYear()}`}</span>
      </td>
      <td>
        <button type="button" className={block('edit-user-btn')} onClick={handleOnClickOpenPanel}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default User;

User.propTypes = {
  user: PropTypes.object,
  setChosenUser: PropTypes.func,
  setIsAddUserPanelVisible: PropTypes.func
};
