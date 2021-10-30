import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

import Loading from '../../../Loading';
import Message from '../../../mess-component/Message';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const MessagessPanel = ({ messages, userToMessage, scroll, setIsVisible, isLoading }) => {
  useEffect(() => {
    if (Object.keys(userToMessage).length === 0 || messages === undefined) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [messages]);

  if (Object.keys(userToMessage).length === 0 && !isLoading) {
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

  if (isLoading) {
    return <Loading />;
  }

  if (Object.keys(userToMessage).length !== 0 && messages.length === 0 && !isLoading) {
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
        {messages.map(({ docId, text, author, time }) => (
          <Message docId={docId} text={text} author={author} time={time} key={docId} />
        ))}
        <div ref={scroll} />
      </div>
    </div>
  );
};

export default MessagessPanel;

MessagessPanel.propTypes = {
  messages: PropTypes.array,
  userToMessage: PropTypes.object,
  scroll: PropTypes.object,
  isLoading: PropTypes.bool,
  setIsVisible: PropTypes.func
};
