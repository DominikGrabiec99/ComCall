import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import dayjs from 'dayjs';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/Calendar.module.scss';
import calendarGlobal from '../../../../context/calendarGlobal';

const block = bemCssModules(ContentPanelMenuStyles);

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(calendarGlobal);

  return (
    <header className={block('header-calendar-container')}>
      <h1 className={block('header-calendar-text')}>Calendar</h1>
      <h2 className={block('header-month')}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
      <div className={block('header-box')}>
        <button
          type="button"
          className={block('header-button')}
          onClick={() => setMonthIndex(monthIndex - 1)}
        >
          <span className={`material-icons-outlined ${block('header-arrow')}`}>chevron_left</span>
        </button>
        <button
          type="button"
          onClick={() => setMonthIndex(dayjs().month())}
          className={block('header-today')}
        >
          Today
        </button>
        <button
          type="button"
          className={block('header-button')}
          onClick={() => setMonthIndex(monthIndex + 1)}
        >
          <span className={`material-icons-outlined ${block('header-arrow')}`}>chevron_right</span>
        </button>
      </div>
    </header>
  );
};

export default CalendarHeader;
