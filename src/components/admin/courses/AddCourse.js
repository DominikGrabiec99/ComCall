/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import { labeClasses } from '../../../constans/text';

import FirebaseContext from '../../../context/firebase';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Courses.module.scss';

const block = bemCssModules(CoursesStyles);

const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

const levels = ['Matura podstawowa', 'Matura rozszerzona', 'Ósmoklasisty', 'ISO', 'Audit'];

const photos = [
  '/images/courses/audit.jpg',
  '/images/courses/english.jpg',
  '/images/courses/iso.jpg',
  '/images/courses/math.jpg',
  '/images/courses/polish.jpg'
];

const AddCourse = ({
  setisVisible,
  actualCourse,
  level = '',
  day = '',
  label = '',
  maxUsers = 1,
  name = '',
  subject = '',
  time = 1,
  image = ''
}) => {
  const [dayState, setDayState] = useState(day);
  const [labelState, setLabelState] = useState(label);
  const [levelState, setLevelState] = useState(level === null ? 'ISO' : level);
  const [maxUsersState, setMaxUsersState] = useState(maxUsers);
  const [nameState, setNameState] = useState(name);
  const [subjectState, setSubjectState] = useState(subject);
  const [timeState, setTimeState] = useState(time);
  const [photoURLState, setPhotoURLState] = useState(image);
  const [message, setMessage] = useState('');

  const { firebase } = useContext(FirebaseContext);

  const handleOnDeletedCourse = (e) => {
    e.preventDefault();

    console.log(actualCourse.courseId);

    if (Object.keys(actualCourse).length === 0) {
      return null;
    }

    async function deleteUsers() {
      await firebase
        .firestore()
        .collection('courses')
        // eslint-disable-next-line yoda
        .where('courseId', '==', actualCourse.courseId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .then(() => {
          setMessage('');
          setisVisible(false);
        });
    }

    deleteUsers();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      dayState.length === 0 ||
      labelState.length === 0 ||
      levelState.length === 0 ||
      maxUsersState.length === 0 ||
      nameState.length === 0 ||
      subjectState.length === 0 ||
      photoURLState.length === 0 ||
      timeState.length === 0
    ) {
      setMessage('Fill in all fields');
      return null;
    }

    async function editUser() {
      try {
        await firebase
          .firestore()
          .collection(`courses`)
          .doc(actualCourse.docId)
          .update({
            day: dayState,
            image: photoURLState,
            isEditableInCalendar: false,
            label: labelState,
            level: levelState,
            maxUsers: Number(maxUsersState),
            name: nameState,
            subject: subjectState,
            time: Number(timeState)
          })
          .then(() => {
            setMessage('');
            setisVisible(false);
          });
      } catch (e) {
        console.log(e);
      }
    }

    async function addUsers() {
      try {
        const id = uuid();
        const date = new Date();

        await firebase
          .firestore()
          .collection('courses')
          .add({
            courseId: id,
            dateCreated: date.getTime(),
            day: dayState,
            image: photoURLState,
            isEditableInCalendar: false,
            label: labelState,
            level: levelState,
            maxUsers: Number(maxUsersState),
            messages: [],
            name: nameState,
            streamId: '',
            subject: subjectState,
            tasks: [],
            time: Number(timeState),
            users: []
          })
          .then(() => {
            setMessage('');
            setisVisible(false);
          });
      } catch (e) {
        console.log(e);
      }
    }

    if (Object.keys(actualCourse).length === 0) {
      addUsers();
    }

    if (Object.keys(actualCourse).length !== 0) {
      editUser();
    }
  };

  return (
    <article className={block('course-edit')}>
      <div className={block('course-edit-box')}>
        <button type="button" onClick={() => setisVisible(false)} className={block('btn-close')}>
          <span className="material-icons">close</span>
        </button>
        {/* <h2 className={block('header-form')}>Course</h2> */}
        <div className={block('box-flex')}>
          <form className={block('form')} onSubmit={handleOnSubmit}>
            <h2 className={block('header-form')}>Course</h2>
            <p className={block('form-error')}>{message}</p>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Name</p>
              <input
                type="text"
                value={nameState}
                onChange={(e) => setNameState(e.target.value)}
                className={block('input-form-item')}
              />
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Subject</p>
              <input
                type="text"
                value={subjectState}
                onChange={(e) => setSubjectState(e.target.value)}
                className={block('input-form-item')}
              />
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Level</p>
              <div>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                  id="level"
                  name="level"
                  className={block('select-form')}
                  value={levelState.toLowerCase()}
                  onChange={(e) => {
                    setLevelState(e.target.value);
                  }}
                >
                  <option className={block('select-item')} value="" />
                  {levels.map((levelMap, index) => (
                    <option
                      key={index}
                      className={block('select-item')}
                      value={levelMap.toLowerCase()}
                    >
                      {levelMap}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Label</p>
              <div className={block('labels-conainer')}>
                {labeClasses.map((labelMap, index) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <span
                    key={index}
                    className={`${block(labelMap)} ${block('label-box')}`}
                    onClick={() => setLabelState(labelMap)}
                  >
                    {labelState === labelMap && (
                      <span className="material-icons-outlined">check</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Photo</p>
              <div className={block('images-conainer')}>
                {photos.map((photoMap, index) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <div
                    key={index}
                    className={block('photo-box')}
                    onClick={() => setPhotoURLState(photoMap)}
                  >
                    <img src={photoMap} alt={photoMap} className={block('photo-form')} />
                    {photoURLState === photoMap && (
                      <span className={`material-icons-outlined ${block('photo-form-icon')}`}>
                        check
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Day</p>
              <div>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                  id="level"
                  name="level"
                  className={block('select-form')}
                  value={dayState.toLowerCase()}
                  onChange={(e) => {
                    setDayState(e.target.value);
                  }}
                >
                  <option className={block('select-item')} value="" />
                  {days.map((dayMap, index) => (
                    <option
                      value={dayMap.toLowerCase()}
                      key={index}
                      className={block('select-item')}
                    >
                      {dayMap}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Time</p>
              <input
                type="number"
                min="1"
                max="24"
                value={timeState}
                onChange={(e) => setTimeState(e.target.value)}
                className={block('input-form-item')}
              />
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Max users in course</p>
              <input
                type="number"
                min="1"
                value={maxUsersState}
                onChange={(e) => setMaxUsersState(e.target.value)}
                className={block('input-form-item')}
              />
            </div>

            <div className={block('box-buttons')}>
              <button type="submit" className={`${block('btn-form')} ${block('btn-form-add')}`}>
                {Object.keys(actualCourse).length === 0 ? 'Add' : 'Edit'} Course
              </button>
              {Object.keys(actualCourse).length !== 0 && (
                <button
                  type="button"
                  className={`${block('btn-form')} ${block('btn-form-delete')}`}
                  onClick={handleOnDeletedCourse}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
          <div className={block('box-img')}>
            <img src="/images/form/form-photo.jpg" alt="books" className={block('img-form')} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default AddCourse;

AddCourse.propTypes = {
  setisVisible: PropTypes.func,
  actualCourse: PropTypes.object,
  level: PropTypes.string,
  day: PropTypes.string,
  label: PropTypes.string,
  maxUsers: PropTypes.number,
  name: PropTypes.string,
  subject: PropTypes.string,
  time: PropTypes.number,
  image: PropTypes.string
};
