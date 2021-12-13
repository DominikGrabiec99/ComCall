import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import courseGlobal from '../../../context/courseGlobal';

import Loading from '../../Loading';
import Message from '../../mess-component/Message';

// eslint-disable-next-line import/no-named-default
import { default as CourseStyles } from '../../../styles/course/Course.module.scss';

const block = bemCssModules(CourseStyles);

const AllMessages = () => {
  const { course, isLoading, scroll } = useContext(courseGlobal);

  if (isLoading && course[0].messages) {
    return <Loading />;
  }

  if (!isLoading && course[0].messages.length === 0) {
    return (
      <div>
        <p className={block('no-messages')}>There are not messages. Write a message</p>
      </div>
    );
  }

  return (
    <div className={block('messages-container')}>
      {course[0].messages.map(({ id, text, author, time }) => (
        <Message docId={id} text={text} author={author} time={time} key={id} courseMess />
      ))}
      <div ref={scroll} />
    </div>
  );
};

export default AllMessages;
