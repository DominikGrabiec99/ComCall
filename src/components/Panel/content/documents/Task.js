/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line import/no-named-default
import { default as DocumentStyles } from '../../../../styles/panel/content/Document.module.scss';

const block = bemCssModules(DocumentStyles);

const Task = ({ name, description, time, subject, task, setCurrentDocument, width, old }) => {
  const history = useHistory();

  const d = new Date(Number(time));
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const hour = d.getHours();
  const minuts = d.getMinutes();
  const timeTask = `${hour > 10 ? hour : `0${hour}`}:${
    minuts > 10 ? minuts : `0${minuts}`
  } ${year}-${month > 10 ? month : `0${month}`}-${day > 10 ? day : `0${day}`}`;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={block('task-box')}
      onClick={() => {
        setCurrentDocument(task);
        if (width < 950) {
          history.push('/panel/document');
        }
      }}
    >
      <h4 className={block('task-title')}>
        {name} - {subject}
      </h4>
      <p className={block('task-time')}>
        {old ? 'Time is up at' : 'Time to end'}: {timeTask}
      </p>
      <p className={block('task-description')}>{description.slice(0, 70)}...</p>
    </div>
  );
};

export default Task;

Task.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  subject: PropTypes.string,
  time: PropTypes.number,
  setCurrentDocument: PropTypes.func,
  task: PropTypes.object,
  width: PropTypes.number,
  old: PropTypes.bool
};
