import React, { useState, useEffect, useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import Firebase from 'firebase/compat/app';

import FirebaseContext from '../../../context/firebase';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const PanelTask = ({ handleOnClickTogglePanel, courseId }) => {
  const [name, setName] = useState('');
  const [today, setToday] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const isValid = name === '' || description === '' || time === '';

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    setToday(`${yyyy}-${mm}-${dd}T00:00`);
  }, []);

  const handleOnChangeName = (e) => setName(e.target.value);
  const handleOnChangeDescription = (e) => setDescription(e.target.value);
  const handleOnChangeTime = (e) => setTime(e.target.value);

  const handleOnSubmitTask = async (e) => {
    e.preventDefault();

    try {
      const date = new Date(time);
      const id = uuid();

      const newItem = {
        id,
        name,
        time: date.getTime(),
        description
      };

      await firebase
        .firestore()
        .collection(`courses`)
        .doc(courseId)
        .update({
          tasks: Firebase.firestore.FieldValue.arrayUnion(newItem)
        });

      setName('');
      setToday('');
      setDescription('');
      handleOnClickTogglePanel();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className={block('container-panel')}>
      <h2 className={block('header-panel')}>Add Task</h2>
      <form action="POST" onSubmit={handleOnSubmitTask} className={block('form-task')}>
        <input
          type="text"
          id="taskName"
          placeholder="Task name"
          value={name}
          onChange={handleOnChangeName}
          className={`${block('input')} ${name && block('input-correct')}`}
        />
        <input
          type="datetime-local"
          id="taskTime"
          value={time}
          min={today}
          onChange={handleOnChangeTime}
          className={`${block('input')} ${time && block('input-correct')}`}
        />
        <textarea
          type="text"
          rows="13"
          id="taskDescription"
          placeholder="Description..."
          value={description}
          onChange={handleOnChangeDescription}
          className={`${block('input')} ${block('text-area')} ${
            description && block('input-correct')
          }`}
        />
        <button type="submit" disabled={isValid} className={block('btn-submit')}>
          Add
        </button>
      </form>
      <button type="button" className={block('btn-close')} onClick={handleOnClickTogglePanel}>
        <span className="material-icons-outlined">close</span>
      </button>
    </article>
  );
};

export default PanelTask;

PanelTask.propTypes = {
  handleOnClickTogglePanel: PropTypes.func,
  courseId: PropTypes.string
};
