import React, { useEffect, useState, useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import UserContext from '../../../context/user';
import { getMonthFunc } from '../../../services/calendar';
import calendarGlobal from '../../../context/calendarGlobal';

import CalendarHeader from './calendar/CalendarHeader';
import Month from './calendar/Month';
import EventCalendarModule from './calendar/EventCalendarModule';

// eslint-disable-next-line import/no-named-default
import { default as CalendarMenuStyles } from '../../../styles/panel/content/Calendar.module.scss';

const block = bemCssModules(CalendarMenuStyles);

const CalendarPanel = () => {
  const { monthIndex, showEventModal } = useContext(calendarGlobal);

  const [currentMonth, setCurrentMonth] = useState(getMonthFunc());

  useEffect(() => {
    setCurrentMonth(getMonthFunc(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventCalendarModule />}
      <div className={block()}>
        <CalendarHeader />
        <div className={block('content')}>
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default CalendarPanel;
