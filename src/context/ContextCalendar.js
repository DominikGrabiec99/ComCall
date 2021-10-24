import React, { useState, useReducer, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import calendarGlobal from './calendarGlobal';
import UserContext from './user';
import { getCoursesByUserId } from '../services/firebase';
import { getAllDaysCourse } from '../services/calendar';

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case 'delete':
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

const initEvents = () => {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

const ContextCalendar = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [courses, setCourses] = useState([]);

  const { user } = useContext(UserContext);

  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    async function getCoursesUser() {
      const courses = await getCoursesByUserId(user.uid);
      courses.map((course) => {
        const days = getAllDaysCourse(course.day, monthIndex);

        const year = Number(dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY'));
        let monthHelp = monthIndex;

        if (monthIndex >= 11) {
          monthHelp = monthIndex % 12;
        }

        days.map((days) => {
          const courseObj = {
            id: course.courseId,
            title: course.name,
            description: `${course.name} - ${course.time}:00`,
            label: course.label,
            day: new Date(`${year}-${monthHelp + 1}-${days}`),
            isEditableInCalendar: false
          };

          if (savedEvents.length !== 0) {
            if (
              savedEvents.some((event) => String(new Date(event.day)) === String(courseObj.day))
            ) {
              return;
            }
          }
          dispatchCalEvent({ type: 'push', payload: courseObj });

          return null;
        });

        return null;
      });
    }

    getCoursesUser();
  }, [monthIndex]);

  return (
    <calendarGlobal.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent
      }}
    >
      {children}
    </calendarGlobal.Provider>
  );
};

export default ContextCalendar;

ContextCalendar.propTypes = {
  children: PropTypes.object
};
