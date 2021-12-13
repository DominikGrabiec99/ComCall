import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

import Loading from '../../../Loading';
import AnswerForm from './AnswerForm';

// eslint-disable-next-line import/no-named-default
import { default as DocumentStyles } from '../../../../styles/panel/content/Document.module.scss';

const block = bemCssModules(DocumentStyles);

const AnswersForTeacher = ({ arrayCourse }) => {
  const [answers, setAnswers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [actualAnswer, setActualAnswer] = useState({});
  const [sortTasks, setSortTasks] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSortTaskReverse, setIsSortTaskReverse] = useState(false);
  const [isSortUserReverse, setIsSortUserReverse] = useState(false);
  const [isSortSubjectReverse, setIsSortSubjectReverse] = useState(false);
  // console.log(arrayCourse);

  useEffect(() => {
    if (arrayCourse === null) return;
    if (arrayCourse.length === 0) return;
    let answers = [];

    arrayCourse.map((course) => {
      answers = [...course.answers, ...answers];
      return null;
    });

    setAnswers(answers);

    return () => {
      setAnswers([]);
    };
  }, [arrayCourse]);

  if (arrayCourse === null) {
    <Loading />;
  }

  if (answers.length === 0) {
    return (
      <div>
        <p>Users didnt't give any homework</p>
      </div>
    );
  }

  return (
    <div>
      <div className={block('search-box')}>
        <div className={block('input-container')}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Find user"
            className={block('input-search')}
          />
          <span className={`material-icons-outlined ${block('icon-search')}`}>search</span>
        </div>
      </div>
      <table className={block('table')}>
        <thead>
          <tr className={block('user-table-tr-head')}>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortTasks('task');
                setIsSortTaskReverse(!isSortTaskReverse);
              }}
            >
              Task
            </th>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortTasks('subject');
                setIsSortSubjectReverse(!isSortSubjectReverse);
              }}
            >
              Subject
            </th>
            <th
              className={block('table-head-th')}
              onClick={() => {
                setSortTasks('user');
                setIsSortUserReverse(!isSortUserReverse);
              }}
            >
              User
            </th>
            <th className={block('table-head-th')}>Download</th>
            <th className={block('table-head-th')}>Rate it</th>
            <th className={block('table-head-th')}>Is assessed</th>
          </tr>
        </thead>
        <tbody>
          {answers.length !== 0 &&
            answers
              .filter((answer) => {
                if (searchValue === '') return answer;

                if (answer.task.toLowerCase().includes(searchValue.toLowerCase())) return answer;

                return null;
              })
              .sort((a, b) => {
                if (sortTasks.toLowerCase() === 'task') {
                  console.log(a, b);
                  const x = a.task.toLowerCase();
                  const y = b.task.toLowerCase();

                  if (isSortTaskReverse) {
                    // eslint-disable-next-line no-nested-ternary
                    return x < y ? 1 : x > y ? -1 : 0;
                  }
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? -1 : x > y ? 1 : 0;
                }

                if (sortTasks.toLowerCase() === 'subject') {
                  const x = a.subject.toLowerCase();
                  const y = b.subject.toLowerCase();

                  if (isSortUserReverse) {
                    // eslint-disable-next-line no-nested-ternary
                    return x < y ? 1 : x > y ? -1 : 0;
                  }
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? -1 : x > y ? 1 : 0;
                }

                if (sortTasks.toLowerCase() === 'user') {
                  const x = a.name.toLowerCase();
                  const y = b.name.toLowerCase();

                  if (isSortUserReverse) {
                    // eslint-disable-next-line no-nested-ternary
                    return x < y ? 1 : x > y ? -1 : 0;
                  }
                  // eslint-disable-next-line no-nested-ternary
                  return x < y ? -1 : x > y ? 1 : 0;
                }
                return 1;
              })
              .map((answer) => {
                const { name, task, id, subject, rating } = answer;

                return (
                  <tr className={block('user-table-tr')} key={id}>
                    <td className={block('user-info-box')}>
                      <span>{task}</span>
                    </td>
                    <td className={block('user-info-box')}>
                      <span>{subject}</span>
                    </td>
                    <td className={block('user-info-box')}>
                      <span>{name}</span>
                    </td>
                    <td className={block('user-info-box')}>
                      <button type="button" className={block('btn-table')}>
                        Download
                      </button>
                    </td>
                    <td className={block('user-info-box')}>
                      <button
                        type="button"
                        className={block('btn-table')}
                        onClick={() => {
                          setActualAnswer(answer);
                          setIsVisible(true);
                        }}
                      >
                        Rate it
                      </button>
                    </td>
                    <td className={block('user-info-box')}>
                      {rating ? <span className="material-icons-outlined">done</span> : ''}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {isVisible && (
        <AnswerForm
          actualAnswer={actualAnswer}
          setIsVisible={setIsVisible}
          setActualAnswer={setActualAnswer}
        />
      )}
    </div>
  );
};

export default AnswersForTeacher;

AnswersForTeacher.propTypes = {
  arrayCourse: PropTypes.array
};
