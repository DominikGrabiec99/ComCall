import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';
import UserContext from '../../context/user';

import { getUserByUserId } from '../../services/firebase';

// eslint-disable-next-line import/no-named-default
import { default as MessagesStyles } from '../../styles/mess-component/Messages.module.scss';

const block = bemCssModules(MessagesStyles);

const dayofWeekned = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];

const Message = ({ docId, text, author, time, courseMess }) => {
  const [userMessage, setUserMessage] = useState();
  const { user } = useContext(UserContext);
  const dateTime = new Date(time);
  const currentDate = new Date();
  let messageTime = '';

  if (dateTime.getTime() + 86400001 < currentDate.getTime()) {
    messageTime = `${dayofWeekned[dateTime.getDay()]} at ${
      dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()
    }:${dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()}`;
  } else {
    messageTime = `${dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()}:${
      dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()
    }`;
  }

  useEffect(() => {
    if (!courseMess) return;
    async function getUserById() {
      setUserMessage(await getUserByUserId(author));
    }

    getUserById();

    return () => {
      setUserMessage({});
    };
  }, []);

  return (
    <div key={docId} className={block()}>
      <div
        className={`${
          user.uid === author ? block('user-message') : block('userToMessage-message')
        }`}
      >
        {courseMess && (
          <p className={`${block('message-name')} ${block('user-message-name')}`}>
            {user.uid !== author && userMessage && userMessage[0].fullName}
          </p>
        )}
        <div
          className={`${block('flex-rows-box')} ${
            user.uid === author ? block('flex-rows-box-userToMessage') : block('flex-rows-box-user')
          }`}
        >
          <img
            src="/images/avatars/avatar.png"
            alt="avatar"
            className={`${block('img-message')} ${
              user.uid === author ? block('userToMessage-message-img') : block('user-message-img')
            }`}
          />
          <div
            className={`${block('message-text')} ${
              user.uid === author ? block('user-message-text') : block('userToMessage-message-text')
            }`}
          >
            <p className={block('message-text-p')}>{text}</p>
          </div>
        </div>
        <p
          className={`${block('message-time')} ${
            user.uid === author ? block('userToMessage-message-time') : block('user-message-time')
          }`}
        >
          {messageTime}
        </p>
      </div>
    </div>
  );
};

export default Message;

Message.propTypes = {
  docId: PropTypes.string,
  text: PropTypes.string,
  author: PropTypes.string,
  time: PropTypes.number,
  courseMess: PropTypes.bool
};
