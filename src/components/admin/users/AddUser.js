import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';
import { v1 as uuid } from 'uuid';
import Firebase from 'firebase/compat/app';
import { getCoursesByName, getCoursesByCourseId } from '../../../services/firebase';

import Course from './Course';

import FirebaseContext from '../../../context/firebase';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Users.module.scss';

const block = bemCssModules(CoursesStyles);

const AddUser = ({
  setIsAddUserPanelVisible,
  chosenUser,
  setChosenUser,
  courses = [],
  emailAddress = '',
  fullName = '',
  isAdmin = false,
  isTeacher = false
}) => {
  const [coursesState, setCoursesState] = useState(courses);
  const [emailAddressState, setEmailAddressState] = useState(emailAddress);
  const [fullNameState, setFullNameState] = useState(fullName);
  const [passwordState, setPasswordState] = useState('');
  const [isAdminState, setIsAdminState] = useState(isAdmin);
  const [isTeacherState, setIsTeacherState] = useState(isTeacher);
  const [courseValue, setCourseValue] = useState('');
  const [findedCourses, setFindedCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [removeCourse, setRemoveCourse] = useState([]);
  const [newCourse, setNewCourse] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (courseValue.length < 2) return;
    async function getFindedCourses() {
      setFindedCourses(await getCoursesByName(courseValue));
    }

    getFindedCourses();

    return () => {
      setFindedCourses([]);
    };
  }, [courseValue]);

  const handleOnDeletedUser = (e) => {
    e.preventDefault();

    if (Object.keys(chosenUser).length === 0) {
      return null;
    }

    async function deleteUsers() {
      await firebase
        .firestore()
        .collection('users')
        // eslint-disable-next-line yoda
        .where('userId', '==', chosenUser.userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .then(() => {
          setMessage('');
          setIsAddUserPanelVisible(false);
        });
    }

    deleteUsers();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      fullNameState.length === 0 ||
      emailAddressState.length === 0 ||
      (Object.keys(chosenUser).length === 0 && passwordState.length === 0)
    ) {
      setMessage('Fill in all fields');
      return null;
    }

    const hasNumbers = (t) => {
      const regex = /\d/g;
      return regex.test(t);
    };

    const hasChart = (t) => {
      const format = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/;
      if (format.test(t)) {
        return true;
      }
      return false;
    };

    if (
      Object.keys(chosenUser).length === 0 &&
      (passwordState.length < 8 || !hasNumbers(passwordState) || !hasChart(passwordState))
    ) {
      setMessage('The password should contain 8 characters, a number and a special character');
      return null;
    }

    async function editUser() {
      try {
        await firebase
          .firestore()
          .collection(`users`)
          .doc(chosenUser.docId)
          .update({
            fullName: fullNameState,
            emailAddress: emailAddressState,
            courses: coursesState,
            isAdmin: Boolean(isAdminState),
            isTeacher: Boolean(isTeacherState)
          })
          .then(() => {
            removeCourse.map(async (courseId) => {
              await getCoursesByCourseId(courseId).then(async (resolve) => {
                const { docId } = resolve[0];

                await firebase
                  .firestore()
                  .collection('courses')
                  .doc(docId)
                  .update({
                    users: Firebase.firestore.FieldValue.arrayRemove(chosenUser.userId)
                  });
              });
            });
          })
          .then(async () => {
            newCourse.map(async (courseId) => {
              await getCoursesByCourseId(courseId).then(async (resolve) => {
                const { docId } = resolve[0];

                await firebase
                  .firestore()
                  .collection('courses')
                  .doc(docId)
                  .update({
                    users: Firebase.firestore.FieldValue.arrayUnion(chosenUser.userId)
                  });
              });
            });
          })
          .then(() => {
            setMessage('');
            setIsAddUserPanelVisible(false);
            setRemoveCourse([]);
          });
      } catch (e) {
        console.log(e);
      }
    }

    async function addUsers() {
      try {
        const id = uuid();
        const date = new Date();

        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddressState, passwordState);

        await createdUserResult.user
          .updateProfile({
            displayName: fullNameState
          })
          .then(async () => {
            await firebase
              .firestore()
              .collection('users')
              .add({
                userId: id,
                fullName: fullNameState,
                emailAddress: emailAddressState,
                dateCreated: date.getTime(),
                courses: coursesState,
                isAdmin: Boolean(isAdminState),
                isTeacher: Boolean(isTeacherState)
              });
          })
          .then(async () => {
            coursesState.map(async (courseId) => {
              await getCoursesByCourseId(courseId).then(async (resolve) => {
                const { docId } = resolve[0];

                await firebase
                  .firestore()
                  .collection('courses')
                  .doc(docId)
                  .update({
                    users: Firebase.firestore.FieldValue.arrayUnion(id)
                  });
              });
            });
          })
          .then(() => {
            setMessage('');
            setIsAddUserPanelVisible(false);
          });
      } catch (e) {
        console.log(e);
      }
    }

    if (Object.keys(chosenUser).length === 0) {
      addUsers();
    }

    if (Object.keys(chosenUser).length !== 0) {
      editUser();
    }
  };

  useEffect(() => {
    coursesState.map((courseState) => {
      if (!courses.includes(courseState) && !newCourse.includes(courseState))
        setNewCourse([...newCourse, courseState]);
      return null;
    });
  }, [coursesState]);

  return (
    <article className={block('user-edit')}>
      <div className={block('user-edit-box')}>
        <button
          type="button"
          onClick={() => {
            setIsAddUserPanelVisible(false);
            setChosenUser({});
          }}
          className={block('btn-close')}
        >
          <span className="material-icons">close</span>
        </button>
        <div className={block('box-flex')}>
          <form className={block('form')} onSubmit={handleOnSubmit}>
            <h2 className={block('header-form')}>
              {Object.keys(chosenUser).length === 0 ? 'Add user' : 'Edit user'}
            </h2>
            <p className={block('form-error')}>{message}</p>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>User Full Name</p>
              <input
                type="text"
                value={fullNameState}
                onChange={(e) => setFullNameState(e.target.value)}
                className={block('input-form-item')}
              />
            </div>
            {Object.keys(chosenUser).length === 0 && (
              <div className={block('box-input')}>
                <p className={block('name-form-item')}>User Password</p>
                <input
                  type="password"
                  value={passwordState}
                  onChange={(e) => setPasswordState(e.target.value)}
                  className={block('input-form-item')}
                />
              </div>
            )}
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>User Email Adress</p>
              <input
                type="email"
                value={emailAddressState}
                onChange={(e) => setEmailAddressState(e.target.value)}
                className={block('input-form-item')}
                disabled={Object.keys(chosenUser).length !== 0}
              />
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Admin Status</p>
              <div>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                  id="admin"
                  name="admin"
                  className={block('select-form')}
                  value={String(isAdminState).toLowerCase()}
                  onChange={(e) => {
                    setIsAdminState(e.target.value);
                  }}
                >
                  <option className={block('select-item')} value="true">
                    True
                  </option>
                  <option className={block('select-item')} value="false">
                    False
                  </option>
                </select>
              </div>
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>Teacher Status</p>
              <div>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                  id="teacher"
                  name="teacher"
                  className={block('select-form')}
                  value={String(isTeacherState).toLowerCase()}
                  onChange={(e) => {
                    setIsTeacherState(e.target.value);
                  }}
                >
                  <option className={block('select-item')} value="true">
                    True
                  </option>
                  <option className={block('select-item')} value="false">
                    False
                  </option>
                </select>
              </div>
            </div>
            <div className={block('box-input')}>
              <p className={block('name-form-item')}>User Courses</p>
              <div>
                {coursesState.length !== 0 &&
                  coursesState.map((courseId) => (
                    <Course
                      courseId={courseId}
                      key={courseId}
                      coursesState={coursesState}
                      setCoursesState={setCoursesState}
                      method="remove"
                      setRemoveCourse={setRemoveCourse}
                      removeCourse={removeCourse}
                    />
                  ))}
                <input
                  type="text"
                  value={courseValue}
                  onChange={(e) => setCourseValue(e.target.value)}
                  placeholder="Find course"
                  className={block('input-search')}
                />
                {findedCourses.length !== 0 &&
                  findedCourses.map((course) => (
                    <Course
                      courseId={course.courseId}
                      key={course.courseId}
                      coursesState={coursesState}
                      setCoursesState={setCoursesState}
                      method="add"
                      setRemoveCourse={setRemoveCourse}
                      removeCourse={removeCourse}
                    />
                  ))}
              </div>
            </div>
            <div className={block('box-buttons')}>
              <button type="submit" className={`${block('btn-form')} ${block('btn-form-add')}`}>
                {Object.keys(chosenUser).length === 0 ? 'Add' : 'Edit'} User
              </button>
              {Object.keys(chosenUser).length !== 0 && (
                <button
                  type="button"
                  className={`${block('btn-form')} ${block('btn-form-delete')}`}
                  onClick={handleOnDeletedUser}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default AddUser;

AddUser.propTypes = {
  setIsAddUserPanelVisible: PropTypes.func,
  chosenUser: PropTypes.object,
  setChosenUser: PropTypes.func,
  courses: PropTypes.array,
  emailAddress: PropTypes.string,
  fullName: PropTypes.string,
  isAdmin: PropTypes.bool,
  isTeacher: PropTypes.bool
};
