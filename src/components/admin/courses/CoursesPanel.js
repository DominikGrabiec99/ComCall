/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { getAllCourse } from '../../../services/firebase';

import Loading from '../../Loading';
import Search from './Search';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Courses.module.scss';
import AddCourse from './AddCourse';

const block = bemCssModules(CoursesStyles);

const CoursesPanel = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [arrayLevel, setArrayLevel] = useState([]);
  const [actualCourse, setActualCourse] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [isVisibleRadio, setIsVisibleRadio] = useState(false);
  const [radioInputValue, setRadioInputValue] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    async function getCourses() {
      await getAllCourse(setAllCourses, setIsLoading);
    }

    getCourses();

    return () => {
      setAllCourses([]);
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    if (allCourses.length === 0) return null;
    const arrayCourseLevel = ['all'];
    allCourses.map((course) => {
      if (arrayCourseLevel.includes(course.level) || course.level === null) return null;
      arrayCourseLevel.push(course.level);
      return null;
    });
    setArrayLevel(arrayCourseLevel);
  }, [allCourses]);

  if (isLoading) {
    return (
      <div className={block()}>
        <Loading />
      </div>
    );
  }

  const handleOnEditCourse = () => {
    setisVisible(true);
    setActualCourse({});
  };

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        arrayLevel={arrayLevel}
        radioInputValue={radioInputValue}
        setRadioInputValue={setRadioInputValue}
        isVisibleRadio={isVisibleRadio}
        setIsVisibleRadio={setIsVisibleRadio}
      />
      <div className={block('container-courses')}>
        {/* // eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className={`${block('card')} ${block('add-course')}`} onClick={handleOnEditCourse}>
          <span className={`material-icons ${block('add-icon')}`}>add</span>
        </div>
        {allCourses.length !== 0 &&
          allCourses
            .filter((course) => {
              if (searchValue === '') {
                return course;
              }

              if (course.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return course;
              }

              return null;
            })
            .filter((course) => {
              if (radioInputValue === 'all') {
                return course;
              }

              if (radioInputValue === course.level) {
                return course;
              }

              return null;
            })
            .map((course) => {
              const { docId, image, name, level, day, subject, courseId } = course;
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <article
                  key={docId}
                  className={block('card')}
                  onClick={() => {
                    handleOnEditCourse();
                    setActualCourse(course);
                  }}
                >
                  <div className={block('img-box')}>
                    <img src={image} alt={name} className={block('card-image')} />
                  </div>
                  <div className={block('info-box')}>
                    <p className={block('name-card')}>
                      Name: <span className={block('name-card-white')}>{name}</span>
                    </p>
                    <p className={block('name-card')}>
                      Id: <span className={block('name-card-white')}>{courseId}</span>
                    </p>
                    <p className={block('name-card')}>
                      Subject: <span className={block('name-card-white')}>{subject}</span>
                    </p>
                    <p className={block('name-card')}>
                      Level: <span className={block('name-card-white')}>{level}</span>
                    </p>
                    <p className={block('name-card')}>
                      Day: <span className={block('name-card-white')}>{day}</span>
                    </p>
                  </div>
                </article>
              );
            })}
      </div>
      {isVisible && (
        <AddCourse setisVisible={setisVisible} actualCourse={actualCourse} {...actualCourse} />
      )}
    </>
  );
};

export default CoursesPanel;
