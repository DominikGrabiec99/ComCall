/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import calendarGlobal from '../../../../context/calendarGlobal';
import { labeClasses } from '../../../../constans/text';

// eslint-disable-next-line import/no-named-default
import { default as CalendarMenuStyles } from '../../../../styles/panel/content/Calendar.module.scss';

const block = bemCssModules(CalendarMenuStyles);

const EventCalendarModule = () => {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent, setSelectedEvent } =
    useContext(calendarGlobal);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labeClasses.find((label) => selectedEvent.label === label) : ''
  );
  const [messError, setMessError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      isEditableInCalendar: true
    };

    if (title === '' || selectedLabel === '') {
      setMessError('You need to write title and use label');
      return;
    }

    if (selectedEvent && !selectedEvent.isEditableInCalendar) {
      setMessError('Cant edit this message');
      return;
    }

    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }

    setMessError('');
    setShowEventModal(false);
  };

  return (
    <div className={block('module-box')}>
      <form className={block('form-module')}>
        <header className={block('header-module')}>
          <span className="material-icons-outlined">drag_handle</span>
          {selectedEvent && selectedEvent.isEditableInCalendar && (
            <div>
              <span
                onClick={() => {
                  dispatchCalEvent({ type: 'delete', payload: selectedEvent });
                  setShowEventModal(false);
                  setSelectedEvent(false);
                }}
                className={`material-icons-outlined ${block('delete-event')}`}
              >
                {' '}
                delete
              </span>
            </div>
          )}

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <span
            className={`material-icons-outlined ${block('button-module')}`}
            onClick={() => {
              setShowEventModal(false);
              setSelectedEvent(false);
            }}
          >
            close
          </span>
        </header>
        <section className={block('section-module')}>
          <div className={block('container-input')}>
            {messError && (
              <>
                <div />
                <p className={block('form-error')}>{messError}</p>{' '}
              </>
            )}
            <div />
            <input
              type="text"
              name="title"
              required
              placeholder="Add title"
              value={title}
              className={block('module-input')}
              onChange={({ target }) => setTitle(target.value)}
            />
            <span className="material-icons-outlined">schedule</span>
            {daySelected.format('ddd. MMMM DD')}
            <span className="material-icons-outlined">segment</span>
            <input
              type="text"
              name="description"
              required
              placeholder="Add a description"
              value={description}
              className={`${block('module-input')} ${block('module-input-small')}`}
              onChange={({ target }) => setDescription(target.value)}
            />
            <span className="material-icons-outlined">bookmark_border</span>
            <div className={block('label-container')}>
              {labeClasses.map((label, index) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <span
                  key={index}
                  className={`${block(label)} ${block('label-box')}`}
                  onClick={() => setSelectedLabel(label)}
                >
                  {selectedLabel === label && (
                    <span className="material-icons-outlined">check</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>
        <footer className={block('footer-module')}>
          <button type="submit" className={block('footer-module-btn')} onClick={handleSubmit}>
            Save
          </button>
        </footer>
      </form>
      <div className={block('module-opacity')} />
    </div>
  );
};

export default EventCalendarModule;
