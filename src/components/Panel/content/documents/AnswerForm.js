import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as DocumentStyles } from '../../../../styles/panel/content/Document.module.scss';

const block = bemCssModules(DocumentStyles);

const AnswerForm = ({ actualAnswer, setIsVisible, setActualAnswer }) => {
  const [commentValue, setCommentValue] = useState(actualAnswer.comment);
  const [ratingValue, setRatingValue] = useState(actualAnswer.rating);

  return (
    <div className={block('answer-form-bg')}>
      <div className={block('answer-form-container')}>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            setActualAnswer({});
          }}
          className={block('btn-close')}
        >
          <span className="material-icons">close</span>
        </button>
        <div className={block('box-from')}>
          <div className={block('box-form-header')}>
            <h2>{actualAnswer.task}</h2>
            <h3>
              {actualAnswer.subject} - {actualAnswer.name}
            </h3>
            <div>
              <button type="button" className={block('btn-download')}>
                download answer
              </button>
            </div>
          </div>
          <form className={block('form-rate-task')}>
            <label htmlFor="rating" className={block('form-label')}>
              <p>Evaluate the task</p>
              <input
                type="number"
                name="rating"
                min="0"
                max="100"
                onChange={(e) => setRatingValue(e.target.value)}
                value={ratingValue}
                className={`${block('form-input')} ${block('form-input-number')}`}
              />
            </label>
            <label htmlFor="comment" className={block('form-label')}>
              <p>Add Commend</p>
              <textarea
                name="comment"
                id=""
                rows="10"
                onChange={(e) => setCommentValue(e.target.value)}
                value={commentValue}
                className={block('form-input')}
              />
            </label>
            <button type="submit" className={block('form-submit-btn')}>
              Rate Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerForm;

AnswerForm.propTypes = {
  actualAnswer: PropTypes.object,
  setIsVisible: PropTypes.func,
  setActualAnswer: PropTypes.func
};
