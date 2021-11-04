import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import courseGlobal from '../../../context/courseGlobal';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const SendMessages = () => {
  const { message, setMessage, handleSubmitMessage } = useContext(courseGlobal);

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

export default SendMessages;
