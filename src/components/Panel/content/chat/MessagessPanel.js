import React, { useEffect, useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import Loading from '../../../Loading';
import Message from '../../../mess-component/Message';

import chatGlobal from '../../../../context/chatGlobal';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const MessagessPanel = () => {
  const { messages, userToMessage, scroll, setIsVisible, isLoading } = useContext(chatGlobal);

  useEffect(() => {
    if (Object.keys(userToMessage).length === 0 || messages === undefined) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [messages]);

  if (Object.keys(userToMessage).length === 0 && !isLoading) {
    return (
      <div className={`${block('box-message-transparent')}`}>
        <p className={block('text')}>You have not chosen any conversation. Please select a user</p>
      </div>
    );
  }

  if (messages === undefined) {
    return (
      <div className={`${block('box-message-transparent')}`}>
        <p className={block('text')}>You have not chosen any conversation. Please select a user</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (Object.keys(userToMessage).length !== 0 && messages.length === 0 && !isLoading) {
    return (
      <div>
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
    <div>
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
