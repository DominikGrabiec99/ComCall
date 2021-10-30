/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line import/no-named-default
import { default as DocumentStyles } from '../../../../styles/panel/content/Document.module.scss';

const block = bemCssModules(DocumentStyles);

const AddDocument = ({ currentDocument, width, handleOnSubmit, isSend }) => {
  const history = useHistory();

  if (Object.keys(currentDocument).length === 0) {
    return (
      <section className={block('addDocument')}>
        <div className={block('no-task')}>
          <p>You have not chosen any task</p>
          {width < 950 && (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <p onClick={() => history.push('/panel/listTasks')} className={block('back-to-list')}>
              Comabck to task list
            </p>
          )}
        </div>
      </section>
    );
  }

  const { name, subject, time, description } = currentDocument;

  const d = new Date(Number(time));
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const hour = d.getHours();
  const minuts = d.getMinutes();
  const timeTask = `${hour > 9 ? hour : `0${hour}`}:${minuts > 9 ? minuts : `0${minuts}`} ${year}-${
    month > 9 ? month : `0${month}`
  }-${day > 9 ? day : `0${day}`}`;

  const isOldTask = Number(time) < Number(new Date().getTime());

  return (
    <section className={block('addDocument')}>
      <header className={block('addDocument__header')}>
        <h1>Add Task</h1>
      </header>
      <h3 className={block('addDocument__title')}>{subject}</h3>
      <h3 className={block('addDocument__title')}>{name}</h3>
      <p className={block('addDocument__description')}>{description}</p>
      <p className={block('addDocument__time')}>
        {isOldTask ? 'Time is up at' : 'Time to end'}: {timeTask}
      </p>
      <form className={block('addDocument__form')} onSubmit={handleOnSubmit}>
        <div className={block('add-file-box')}>
          <p className={block('text-add-file')}>Add file:</p>
          {!isOldTask ? (
            <label htmlFor="myfile" className={block('input-add-file')}>
              <input type="file" id="myfile" name="myfile" />
              <div className={block('custom-upload')}>
                <span className="material-icons">upload_file</span>
                Upload file
              </div>
            </label>
          ) : (
            <p className={block('text-too-late')}>You're out of time</p>
          )}
        </div>
        {!isOldTask ? (
          <>
            <button type="submit" className={block('button-add-file')}>
              Send
              <span className={`${block('button-icon')} material-icons`}>send</span>
            </button>
            {isSend && (
              <p className={block('text-send')}>
                This function is only for demonstration due to a database limitation
              </p>
            )}
          </>
        ) : null}
      </form>
    </section>
  );
};

export default AddDocument;

AddDocument.propTypes = {
  currentDocument: PropTypes.object,
  width: PropTypes.number,
  handleOnSubmit: PropTypes.func,
  isSend: PropTypes.bool
};
