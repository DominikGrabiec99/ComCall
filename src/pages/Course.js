import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { getCoursesByCourseId, getUserByUserId } from '../services/firebase';
import UserContext from '../context/user';
import Header from '../components/Header';
import SidebarMenu from '../components/Panel/SidebarMenu';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../styles/course/Course.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const Course = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [userActual, setUserActual] = useState(null);
  let userIsInCourseList = false;

  useEffect(() => {
    async function getCourseById() {
      setCourse(await getCoursesByCourseId(id));
    }

    getCourseById();
  }, [id]);

  useEffect(() => {
    async function getUserById() {
      setUserActual(await getUserByUserId(user.uid));
    }

    getUserById();
  }, [user]);

  if (userActual) {
    userIsInCourseList = userActual[0].courses.includes(id);
  }

  return (
    <>
      <Header />
      <div className={block()}>
        <SidebarMenu />
        <div className={block('courseContent')}>
          {course.length === 0 && !userIsInCourseList ? (
            <p>You do not have access to this course</p>
          ) : (
            /// tu będzie component z kursem dodanie ekranu
            <p>jest kurs</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Course;
