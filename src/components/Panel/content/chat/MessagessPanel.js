import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);
const dayofWeekned = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];

const MessagessPanel = ({ messages, userToMessage, user, scroll, setIsVisible }) => {
  useEffect(() => {
    if (Object.keys(userToMessage).length === 0 || messages === undefined) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [messages]);

  if (Object.keys(userToMessage).length === 0) {
    return (
      <div className={`${block('box-message')} ${block('box-message-transparent')}`}>
        <p className={block('text')}>You have not chosen any conversation. Please select a user</p>
      </div>
    );
  }

  if (messages === undefined) {
    return (
      <div className={`${block('box-message')} ${block('box-message-transparent')}`}>
        <p className={block('text')}>You have not chosen any conversation. Please select a user</p>
      </div>
    );
  }

  if (Object.keys(userToMessage).length !== 0 && messages.length === 0) {
    return (
      <div className={block('box-message')}>
        <div className={block('userToMessage-display')}>
          <img
            src="/images/avatars/avatar.png"
            alt={userToMessage.fullName}
            className={block('userToMessage-img')}
          />
          <p className={block('userToMessage-name')}>{userToMessage.fullName}</p>
        </div>
        <p className={block('text')}>You don't have any messages with this user</p>
      </div>
    );
  }

  return (
    <div className={block('box-message')}>
      <div className={block('userToMessage-display')}>
        <img
          src="/images/avatars/avatar.png"
          alt={userToMessage.fullName}
          className={block('userToMessage-img')}
        />
        <p className={block('userToMessage-name')}>{userToMessage.fullName}</p>
      </div>
      <div className={block('messages-container')}>
        {messages.map(({ docId, text, author, time }) => {
          const dateTime = new Date(time);
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
            <div key={docId} className={block('wrapper')}>
              <div
                className={`${
                  user.uid === author ? block('user-message') : block('userToMessage-message')
                }`}
              >
                <div
                  className={`${block('flex-rows-box')} ${
                    user.uid === author
                      ? block('flex-rows-box-userToMessage')
                      : block('flex-rows-box-user')
                  }`}
                >
                  <img
                    src="/images/avatars/avatar.png"
                    alt=""
                    className={`${block('img-message')} ${
                      user.uid === author
                        ? block('userToMessage-message-img')
                        : block('user-message-img')
                    }`}
                  />
                  <div
                    className={`${block('message-text')} ${
                      user.uid === author
                        ? block('user-message-text')
                        : block('userToMessage-message-text')
                    }`}
                  >
                    <p className={block('message-text-p')}>{text}</p>
                  </div>
                </div>
                <p
                  className={`${block('message-time')} ${
                    user.uid === author
                      ? block('userToMessage-message-time')
                      : block('user-message-time')
                  }`}
                >
                  {messageTime}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={scroll} />
      </div>
    </div>
  );
};

export default MessagessPanel;

MessagessPanel.propTypes = {
  messages: PropTypes.array,
  userToMessage: PropTypes.object,
  user: PropTypes.object,
  scroll: PropTypes.object,
  setIsVisible: PropTypes.func
};
