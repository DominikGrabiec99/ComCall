import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

import Loading from '../../Loading';
import User from './User';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Users.module.scss';

const block = bemCssModules(CoursesStyles);

const UsersList = ({
  allUsers,
  isLoading,
  searchValue,
  setChosenUser,
  setIsAddUserPanelVisible
}) => {
  const [sortUser, setSortUser] = useState('');
  const [isSortIdReverse, setIsSortIdReverse] = useState(false);
  const [isSortNameReverse, setIsSortNameReverse] = useState(false);
  const [isSortEmailReverse, setIsSortEmailReverse] = useState(false);
  const [isSortAdminReverse, setIsSortAdminReverse] = useState(false);
  const [isSortTeacherReverse, setIsSortTeacherReverse] = useState(false);
  const [isSortDateReverse, setIsSortDateReverse] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (allUsers.length === 0) {
    return (
      <div>
        <p>There are no users</p>
      </div>
    );
  }

  return (
    <div className={block('box-table')}>
      <table className={block('table')}>
        <thead>
          <tr className={block('user-table-tr-head')}>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortUser('Id');
                setIsSortIdReverse(!isSortIdReverse);
              }}
            >
              Id
            </th>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortUser('name');
                setIsSortNameReverse(!isSortNameReverse);
              }}
            >
              Name
            </th>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortUser('email');
                setIsSortEmailReverse(!isSortEmailReverse);
              }}
            >
              Email
            </th>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortUser('admin');
                setIsSortAdminReverse(!isSortAdminReverse);
              }}
            >
              Is admin
            </th>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortUser('teacher');
                setIsSortTeacherReverse(!isSortTeacherReverse);
              }}
            >
              Is teacher
            </th>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortUser('date');
                setIsSortDateReverse(!isSortDateReverse);
              }}
            >
              Date created
            </th>
            <th className={block('table-head-th')} />
          </tr>
        </thead>
        <tbody>
          {allUsers
            .filter((user) => {
              if (searchValue === '') return user;

              if (user.fullName.toLowerCase().includes(searchValue.toLowerCase())) return user;

              return null;
            })
            .sort((a, b) => {
              if (sortUser.toLowerCase() === 'id') {
                const x = a.userId.toLowerCase();
                const y = b.userId.toLowerCase();

                if (isSortIdReverse) {
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? 1 : x > y ? -1 : 0;
                }
                // eslint-disable-next-line no-nested-ternary
                return x < y ? -1 : x > y ? 1 : 0;
              }

              if (sortUser.toLowerCase() === 'name') {
                const x = a.fullName.toLowerCase();
                const y = b.fullName.toLowerCase();

                if (isSortNameReverse) {
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? 1 : x > y ? -1 : 0;
                }
                // eslint-disable-next-line no-nested-ternary
                return x < y ? -1 : x > y ? 1 : 0;
              }

              if (sortUser.toLowerCase() === 'email') {
                const x = a.emailAddress.toLowerCase();
                const y = b.emailAddress.toLowerCase();
                if (isSortEmailReverse) {
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? 1 : x > y ? -1 : 0;
                }
                // eslint-disable-next-line no-nested-ternary
                return x < y ? -1 : x > y ? 1 : 0;
              }

              if (sortUser.toLowerCase() === 'admin') {
                const x = String(a.isAdmin).toLowerCase();
                const y = String(b.isAdmin).toLowerCase();
                if (isSortAdminReverse) {
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? 1 : x > y ? -1 : 0;
                }
                // eslint-disable-next-line no-nested-ternary
                return x < y ? -1 : x > y ? 1 : 0;
              }

              if (sortUser.toLowerCase() === 'teacher') {
                const x = String(a.isTeacher).toLowerCase();
                const y = String(b.isTeacher).toLowerCase();
                if (isSortTeacherReverse) {
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? 1 : x > y ? -1 : 0;
                }
                // eslint-disable-next-line no-nested-ternary
                return x < y ? -1 : x > y ? 1 : 0;
              }

              if (sortUser.toLowerCase() === 'date') {
                if (isSortDateReverse) {
                  return a.dateCreated < b.dateCreated ? 1 : -1;
                }
                return a.dateCreated > b.dateCreated ? 1 : -1;
              }

              return 1;
            })
            .map((user, index) => (
              <User
                key={index}
                user={user}
                setChosenUser={setChosenUser}
                setIsAddUserPanelVisible={setIsAddUserPanelVisible}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

UsersList.propTypes = {
  allUsers: PropTypes.array,
  isLoading: PropTypes.bool,
  searchValue: PropTypes.string,
  setChosenUser: PropTypes.func,
  setIsAddUserPanelVisible: PropTypes.func
};
