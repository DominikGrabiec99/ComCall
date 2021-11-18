/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import chatGlobal from '../../../../context/chatGlobal';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';
import Loading from '../../../Loading';

const block = bemCssModules(ContentPanelMenuStyles);

const dayofWeekned = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];

const UsersChat = () => {
  const { firstMessages, setUserToMessage, isLoading, width } = useContext(chatGlobal);
  const history = useHistory();

  const firstMessagesElement =
    firstMessages.length !== 0 &&
    firstMessages
      .sort((a, b) => {
        if (a.time > b.time) {
          return -1;
        }
        if (a.time < b.time) {
          return 1;
        }
        return 0;
      })
      .filter(
        (mess, index, self) =>
          index === self.findIndex((t) => t.userId === mess.userId && t.fullName && mess.fullName)
      )
      .map((user) => {
        const dateTime = new Date(user.time);
        const currentDate = new Date();

        let messageTime = '';
        if (dateTime.getTime() + 86400001 < currentDate.getTime()) {
          messageTime = `${dayofWeekned[dateTime.getDay()]} at ${
            dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()
          }:${dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()}`;
        } else {
          messageTime = `${
            dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()
          }:${dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()}`;
        }

        return (
          <div
            key={user.docId}
            onClick={() => {
              setUserToMessage(user);
              if (width < 950) {
                history.push('/panel/messages');
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setUserToMessage(user);
                if (width < 950) {
                  history.push('/panel/messages');
                }
              }
            }}
            className={block('box-user-chat')}
          >
            <div>
              <img
                className={block('user-chat-image')}
                src="/images/avatars/avatar.png"
                alt={user.fullName}
              />
            </div>
            <div className={block('user-chat')}>
              <p className={block('mess-name')}>{user.fullName}</p>
              <div className={block('message-text-time')}>
                <p className={block('mess-time')}>{messageTime}</p>
                <p>
                  {user.text.slice(0, 20)}
                  {user.text.length > 19 && '...'}
                </p>
              </div>
            </div>
          </div>
        );
      });

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && firstMessages.length === 0) {
    return (
      <div className={block('scroller-box')}>
        <p className={block('no-consersation-text')}>
          You haven't started a conversation with anyone yet. Find a friend and enjoy talking to
          them :){' '}
        </p>
      </div>
    );
  }

  return <div className={block('scroller-box')}>{firstMessagesElement}</div>;
};

export default UsersChat;
