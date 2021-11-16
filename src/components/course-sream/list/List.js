/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import { v1 as uuid } from 'uuid';

import { getUserByUserId } from '../../../services/firebase';

import courseGlobal from '../../../context/courseGlobal';
import FirebaseContext from '../../../context/firebase';
import UserContext from '../../../context/user';

import User from './User';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const List = () => {
  const [userActual, setUserActual] = useState(null);

  const { course } = useContext(courseGlobal);
  const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    async function getUserActual() {
      setUserActual(await getUserByUserId(user.uid));
    }
    getUserActual();
  }, [user]);

  const handleClickCreateId = async () => {
    const id = uuid();
    const win = window.open(`/room/${id}`, '_blank');
    win.focus();
    await firebase.firestore().collection(`courses`).doc(course[0].docId).update({
      streamId: id
    });
  };

  return (
    <section
      className={`${
        userActual && userActual[0].isTeacher
          ? block('list-section-teacher')
          : block('list-section-user')
      } ${block('list-section')}`}
    >
      {userActual && userActual[0].isTeacher && (
        <div className={block('teacher-option')}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={`${block('icon-container')} ${block('icon-container-call')}`}
            onClick={handleClickCreateId}
          >
            <span className="material-icons-outlined">phone</span>
          </div>
          <div className={`${block('icon-container')} ${block('icon-container-add-task')}`}>
            <span className="material-icons-outlined">note_alt</span>
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
