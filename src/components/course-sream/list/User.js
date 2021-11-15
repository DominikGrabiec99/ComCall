import React, { useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';

import { getUserByUserId } from '../../../services/firebase';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const User = ({ id }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      setUser(await getUserByUserId(id));
    }

    getUser();
  }, [id]);

  return (
    <>
      {user && user[0] && (
        <div className={block('box-user')}>
          <div className={block('box-img-user')}>
            <img src="/images/avatars/avatar.png" alt="profile" className={block('user-img')} />
          </div>
          <div className={block('box-name')}>
            <p className={block('name-user')}>{user[0].fullName}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default User;

User.propTypes = {
  id: PropTypes.string
};
