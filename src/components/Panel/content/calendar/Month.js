import React from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';
import Day from './Day';

// eslint-disable-next-line import/no-named-default
import { default as CalendarMenuStyles } from '../../../../styles/panel/content/Calendar.module.scss';

const block = bemCssModules(CalendarMenuStyles);

const Month = ({ month }) => (
  <div className={block('month-container')}>
    {month.map((row, index) => (
      <React.Fragment key={index}>
        {row.map((day, i) => (
          <Day day={day.dayjs} currentMonthCount={day.currentMonthCount} key={i} rowIdx={index} />
        ))}
      </React.Fragment>
    ))}
  </div>
);

export default Month;

Month.propTypes = {
  month: PropTypes.array
};
