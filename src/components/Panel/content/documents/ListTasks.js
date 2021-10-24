import React from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

import Task from './Task';
import Loading from '../../../Loading';

// eslint-disable-next-line import/no-named-default
import { default as DocumentStyles } from '../../../../styles/panel/content/Document.module.scss';

const block = bemCssModules(DocumentStyles);

const ListTasks = ({ arrayCourse, arrayTasks, setCurrentDocument, isLoading, width }) => {
  // console.log(arrayCourse, arrayTasks);

  if (isLoading) {
    return <Loading />;
  }

  if (arrayCourse === undefined || arrayCourse === null) {
    return null;
  }

  if (!isLoading && arrayCourse.length === 0) {
    return (
      <section className={block('listTaks-container')}>
        You have not been assigned to any course
      </section>
    );
  }

  if (!isLoading && arrayTasks.length === 0) {
    return (
      <section className={block('listTaks-container')}>
        <article className={block('artcile')}>
          <div className={block('header-box')}>
            <h2 className={block('header-artcile')}>New tasks</h2>
          </div>
          You don't have any tasks
        </article>
        <article className={block('artcile')}>
          <div className={block('header-box')}>
            <h2 className={block('header-artcile')}>Old tasks</h2>
          </div>
          You don't have any tasks
        </article>
      </section>
    );
  }

  return (
    <section className={block('listTaks-container')}>
      <article className={block('artcile')}>
        <div className={block('header-box')}>
          <h2 className={block('header-artcile')}>New tasks</h2>
        </div>
        {arrayTasks.map((task) => {
          if (Number(task.time) > Number(new Date().getTime())) {
            return (
              <Task
                {...task}
                key={task.id}
                task={task}
                setCurrentDocument={setCurrentDocument}
                width={width}
                old={false}
              />
            );
          }
          return null;
        })}
      </article>
      <article className={block('artcile')}>
        <div className={block('header-box')}>
          <h2 className={block('header-artcile')}>Old tasks</h2>
        </div>
        {arrayTasks.map((task) => {
          if (Number(task.time) < Number(new Date().getTime())) {
            return (
              <Task
                {...task}
                key={task.id}
                task={task}
                setCurrentDocument={setCurrentDocument}
                width={width}
                old
              />
            );
          }
          return null;
        })}
      </article>
    </section>
  );
};

export default ListTasks;

ListTasks.propTypes = {
  arrayCourse: PropTypes.array,
  arrayTasks: PropTypes.array,
  setCurrentDocument: PropTypes.func,
  isLoading: PropTypes.bool,
  width: PropTypes.number
};
