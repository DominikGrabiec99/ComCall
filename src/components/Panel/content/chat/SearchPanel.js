/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const SearchPanel = ({
  searchUser,
  setSearchUser,
  handleSubmitFindUser,
  findedUser,
  setUserToMessage,
  width
}) => {
  const history = useHistory();

  return (
    <div>
      <form action="POST" onSubmit={handleSubmitFindUser}>
        <input
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Find user"
          className={block('form-input-search')}
        />
      </form>
      {!findedUser.length ? null : (
        <div className={block('wrapper-user')}>
          {findedUser.map((user) => (
            <div key={user.userId} className={block('box-user')}>
              <div
                className={block('container-user')}
                onClick={() => {
                  setUserToMessage(user);
                  setSearchUser('');
                  if (width < 950) {
                    history.push('/panel/messages');
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setUserToMessage(user);
                    setSearchUser('');
                    if (width < 950) {
                      history.push('/panel/messages');
                    }
                  }
                }}
              >
                <img
                  src="/images/avatars/avatar.png"
                  alt={user.fullName}
                  className={block('avatar-user')}
                />
                <p className={block('name-user')}>{user.fullName} </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;

SearchPanel.propTypes = {
  searchUser: PropTypes.string,
  setSearchUser: PropTypes.func,
  handleSubmitFindUser: PropTypes.func,
  findedUser: PropTypes.array,
  setUserToMessage: PropTypes.func,
  width: PropTypes.number
};
