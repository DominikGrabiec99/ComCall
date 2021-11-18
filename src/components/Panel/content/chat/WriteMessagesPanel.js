import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import chatGlobal from '../../../../context/chatGlobal';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const WriteMessagesPanel = () => {
  const { message, setMessage, handleSubmitMessage } = useContext(chatGlobal);

  return (
    <div>
      <form action="POST" onSubmit={handleSubmitMessage} className={block('form')}>
        <textarea
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className={block('form-textarea')}
          placeholder="Send message..."
          rows="1"
        />
        <button type="submit" className={block('form-btn')}>
          <span className="material-icons">send</span>
        </button>
      </form>
    </div>
  );
};

export default WriteMessagesPanel;
