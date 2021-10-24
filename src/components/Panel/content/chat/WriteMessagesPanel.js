import React from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const WriteMessagesPanel = ({ message, setMessage, handleSubmitMessage }) => (
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

export default WriteMessagesPanel;

WriteMessagesPanel.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  handleSubmitMessage: PropTypes.func
};
