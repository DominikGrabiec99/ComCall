/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';
import { v1 as uuid } from 'uuid';

import courseGlobal from '../../../context/courseGlobal';
import FirebaseContext from '../../../context/firebase';
import UserContext from '../../../context/user';

import User from './User';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const List = ({ handleOnClickTogglePanel }) => {
  const { course } = useContext(courseGlobal);
  const { actualUser } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);

  const handleClickCreateId = async () => {
    const id = uuid();
    await firebase.firestore().collection(`courses`).doc(course[0].docId).update({
      streamId: id
    });
    const win = window.open(`/room/${id}/${course[0].docId}`, '_blank');
    win.parameters = JSON.stringify({ courseId: course[0].docId });
    win.focus();
  };

  const goToCourseStream = () => {
    const win = window.open(`/room/${course[0].streamId}/${course[0].docId}`, '_blank');
    win.focus();
  };

  return (
    <section
      className={`${
        (actualUser && actualUser[0].isTeacher) || (course && course[0].streamId)
          ? block('list-section-teacher')
          : block('list-section-user')
      } ${block('list-section')}`}
    >
      {actualUser && actualUser[0].isTeacher && (
        <div className={block('teacher-option')}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={`${block('icon-container')} ${block('icon-container-call')}`}
            onClick={handleClickCreateId}
          >
            <span className="material-icons-outlined">phone</span>
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={`${block('icon-container')} ${block('icon-container-add-task')}`}
            onClick={handleOnClickTogglePanel}
          >
            <span className="material-icons-outlined">note_alt</span>
          </div>
        </div>
      )}

      {course && course[0].streamId && actualUser && !actualUser[0].isTeacher && (
        <div className={block('teacher-option')}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={`${block('icon-container')} ${block('icon-container-call')}`}
            onClick={goToCourseStream}
          >
            <span className="material-icons-outlined">phone</span>
          </div>
        </div>
      )}
      <div className={block('list-title')}>user in course</div>
      <div className={block('list-container')}>
        {course[0] && course[0].users.map((user) => <User key={user} id={user} />)}
      </div>
    </section>
  );
};

export default List;

List.propTypes = {
  handleOnClickTogglePanel: PropTypes.func
};
