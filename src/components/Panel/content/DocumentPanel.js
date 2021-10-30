/* eslint-disable no-nested-ternary */
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { getCoursesByUserId } from '../../../services/firebase';
import UserContext from '../../../context/user';

import ListTasks from './documents/ListTasks';
import AddDocument from './documents/AddDocument';

// eslint-disable-next-line import/no-named-default
import { default as DocumentStyles } from '../../../styles/panel/content/Document.module.scss';

const block = bemCssModules(DocumentStyles);

const DocumentPanel = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [arrayCourse, setArrayCourse] = useState(null);
  const [arrayTasks, setArrayTasks] = useState([]);
  const [currentDocument, setCurrentDocument] = useState({});
  const [isSend, setIsSend] = useState(false);
  const [width, setWidth] = useState(0);

  const { id } = useParams();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSend(true);
  };

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    async function getCoursesArray() {
      setArrayCourse(await getCoursesByUserId(user.uid, setIsLoading));
    }

    getCoursesArray();
  }, [user]);

  useEffect(() => {
    if (arrayCourse) {
      arrayCourse.map((course) => {
        course.tasks.map((task) => {
          task.subject = course.name;
          if (!arrayTasks.filter((arrTask) => String(arrTask.id) === String(task.id)).length > 0) {
            setArrayTasks((arr) => [...arr, task]);
          }
          return null;
        });
        return null;
      });
    }
    if (arrayTasks.length !== 0) setCurrentDocument(arrayTasks[0]);
  }, [arrayCourse]);

  useEffect(() => {
    if (arrayTasks.length !== 0)
      setCurrentDocument(
        arrayTasks.sort((a, b) => {
          if (a.time > b.time) {
            return -1;
          }
          if (a.time < b.time) {
            return 1;
          }
          return 0;
        })[0]
      );
  }, [arrayTasks]);

  useEffect(() => {
    setIsSend(false);
  }, [currentDocument]);

  return (
    <div className={block()}>
      {width > 950 ? (
        <>
          <AddDocument
            currentDocument={currentDocument}
            width={width}
            handleOnSubmit={handleOnSubmit}
            isSend={isSend}
          />
          <ListTasks
            arrayTasks={arrayTasks}
            arrayCourse={arrayCourse}
            setCurrentDocument={setCurrentDocument}
            isLoading={isLoading}
            width={width}
          />
        </>
      ) : id === 'listTasks' ? (
        <ListTasks
          arrayTasks={arrayTasks}
          arrayCourse={arrayCourse}
          setCurrentDocument={setCurrentDocument}
          isLoading={isLoading}
          width={width}
        />
      ) : (
        <AddDocument
          currentDocument={currentDocument}
          width={width}
          handleOnSubmit={handleOnSubmit}
          isSend={isSend}
        />
      )}
    </div>
  );
};

export default DocumentPanel;
