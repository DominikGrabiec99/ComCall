import React, { useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import UsersList from './UsersList';
import Search from './Search';

import { getAllUsers } from '../../../services/firebase';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Users.module.scss';

const block = bemCssModules(CoursesStyles);

const UsersPanel = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [chosenUser, setChosenUser] = useState({});
  const [isAddUserPanelVisible, setIsAddUserPanelVisible] = useState(false);

  useEffect(() => {
    async function getUsers() {
      await getAllUsers(setAllUsers, setIsLoading);
    }

    getUsers();

    return () => {
      setAllUsers([]);
      setIsLoading(true);
    };
  }, []);

  return (
    <div className={block()}>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setIsAddUserPanelVisible={setIsAddUserPanelVisible}
      />
      <UsersList
        allUsers={allUsers}
        isLoading={isLoading}
        searchValue={searchValue}
        setChosenUser={setChosenUser}
        setIsAddUserPanelVisible={setIsAddUserPanelVisible}
      />
    </div>
  );
};

export default UsersPanel;
