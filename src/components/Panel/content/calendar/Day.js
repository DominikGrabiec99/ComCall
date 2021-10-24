/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState, useEffect } from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import calendarGlobal from '../../../../context/calendarGlobal';

// eslint-disable-next-line import/no-named-default
import { default as CalendarMenuStyles } from '../../../../styles/panel/content/Calendar.module.scss';

const block = bemCssModules(CalendarMenuStyles);

const Day = ({ day, currentMonthCount, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const { monthIndex, setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
    useContext(calendarGlobal);

  useEffect(() => {
    const event = savedEvents.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(event);
  }, [savedEvents, day]);

  const year = dayjs().year();
  return (
    <div
      className={block('day-container')}
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}
    >
      <header className={block('header-day')}>
        {rowIdx === 0 && (
          <p
            className={`${block('day-text-ddd')} ${
              day.format('ddd').toUpperCase() === 'SAT' || day.format('ddd').toUpperCase() === 'SUN'
                ? block('day-text-ddd-week')
                : ''
            }`}
          >
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p
          className={`${block('day-text-DD')} ${
            currentMonthCount < 1 ||
            currentMonthCount > dayjs(new Date(year, monthIndex, 1)).daysInMonth()
              ? block('day-text-another-month')
              : ''
          } ${day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? block('actual-day') : ''}`}
        >
          {day.format('DD')}
        </p>
      </header>
      <div
        className={`${block('box-add-mess')} ${
          currentMonthCount < 1 ||
          currentMonthCount > dayjs(new Date(year, monthIndex, 1)).daysInMonth()
            ? block('box-add-mess-none')
            : ''
        }`}
      >
        <div className={block('event-box')}>
          {dayEvents.map((event, index) => (
            <div
              key={index}
              className={`${block(event.label)} ${block('event-box-text')}`}
              onClick={() => setSelectedEvent(event)}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Day;

Day.propTypes = {
  day: PropTypes.object,
  currentMonthCount: PropTypes.number,
  rowIdx: PropTypes.number
};
