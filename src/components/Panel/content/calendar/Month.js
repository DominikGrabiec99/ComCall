import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Day from './Day';

import calendarGlobal from '../../../../context/calendarGlobal';

// eslint-disable-next-line import/no-named-default
import { default as CalendarMenuStyles } from '../../../../styles/panel/content/Calendar.module.scss';

const block = bemCssModules(CalendarMenuStyles);

const Month = ({ month }) => {
  const { monthIndex } = useContext(calendarGlobal);
  const year = dayjs().year();
  return (
    <div
      className={`${block('month-container')} ${
        month[5][0].currentMonthCount <= dayjs(new Date(year, monthIndex, 1)).daysInMonth()
          ? block('month-container-6')
          : block('month-container-5')
      }`}
    >
      {month.map((row, index) => (
        <React.Fragment key={index}>
          {row[0].currentMonthCount <= dayjs(new Date(year, monthIndex, 1)).daysInMonth() &&
            row.map((day, i) => (
              <Day
                day={day.dayjs}
                currentMonthCount={day.currentMonthCount}
                key={i}
                rowIdx={index}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;

Month.propTypes = {
  month: PropTypes.array
};
