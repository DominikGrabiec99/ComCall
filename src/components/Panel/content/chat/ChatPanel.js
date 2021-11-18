/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import chatGlobal from '../../../../context/chatGlobal';

import WriteMessagesPanel from './WriteMessagesPanel';
import MessagessPanel from './MessagessPanel';
import SearchPanel from './SearchPanel';
import UsersChat from './UsersChat';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const ChatPanel = () => {
  const { width, id, isLoading, isVisible } = useContext(chatGlobal);

  return (
    <div className={block()}>
      {width > 950 ? (
        <>
          <div className={block('usersChat')}>
            <SearchPanel />
            <UsersChat />
          </div>
          <div className={block('content-box')}>
            <MessagessPanel />
            {!isLoading && <WriteMessagesPanel />}
          </div>
        </>
      ) : id === 'chat' ? (
        <>
          <div className={block('usersChat')}>
            <SearchPanel />
            <UsersChat />
          </div>
        </>
      ) : (
        <div className={block('content-box')}>
          <MessagessPanel />
          {isVisible && !isLoading && <WriteMessagesPanel />}
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
