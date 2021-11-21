/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { getAllCourse } from '../../../services/firebase';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Courses.module.scss';
import Loading from '../../Loading';

const block = bemCssModules(CoursesStyles);

const CoursesPanel = () => {
  const [allCourses, setAllCourses] = useState([]);
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

  if (isLoading) {
    return (
      <div className={block()}>
        <Loading />
      </div>
    );
  }

  const handleOnEditCourse = () => {
    setisVisible(true);
  };

  return (
    <>
      <div className={block('container-courses')}>
        {/* // eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className={`${block('card')} ${block('add-course')}`} onClick={handleOnEditCourse}>
          <span className={`material-icons ${block('add-icon')}`}>add</span>
        </div>
        {allCourses.length !== 0 &&
          allCourses.map((course) => {
            const { docId, image, name, level, day, subject, courseId } = course;
            return (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <article key={docId} className={block('card')} onClick={handleOnEditCourse}>
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
        <article className={block('course-edit')}>
          <div className={block('course-edit-box')}>
            <button
              type="button"
              onClick={() => setisVisible(false)}
              className={block('btn-close')}
            >
              <span className="material-icons">close</span>
            </button>
          </div>
        </article>
      )}
    </>
  );
};

export default CoursesPanel;
