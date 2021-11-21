import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import UserContext from '../../../context/user';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const User = () => {
  const { actualUser } = useContext(UserContext);

  return (
    <>
      {actualUser && actualUser[0] && (
        <div className={block('box-user')}>
          <div className={block('box-img-user')}>
            <img src="/images/avatars/avatar.png" alt="profile" className={block('user-img')} />
          </div>
          <div className={block('box-name')}>
            <p className={block('name-user')}>{actualUser[0].fullName}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
