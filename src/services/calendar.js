import dayjs from 'dayjs';

const weekday = require('dayjs/plugin/weekday');

const dayofWeekned = [
  'poniedziałek',
  'wtorek',
  'środa',
  'czwartek',
  'piątek',
  'sobota',
  'niedziela'
];

export const getMonthFunc = (month = dayjs().month()) => {
  dayjs.extend(weekday);
  dayjs().weekday(-7);
  const year = dayjs().year();
  const firsDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firsDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() =>
    new Array(7).fill(null).map(() => {
      // eslint-disable-next-line no-plusplus
      currentMonthCount++;
      return {
        dayjs: dayjs(new Date(year, month, currentMonthCount)),
        currentMonthCount
      };
    })
  );
  return daysMatrix;
};

export const getAllDaysCourse = (day, month) => {
  const dayId = dayofWeekned.indexOf(day);
  let monthHelp = month;

  if (month >= 11) {
    monthHelp = month % 12;
  }

  const year = Number(dayjs(new Date(dayjs().year(), month)).format('YYYY'));
  const days = new Date(year, monthHelp + 1, 0).getDate();

  let numberI = null;

  if (dayId === 0) {
    numberI = 9;
  } else if (dayId === 1) {
    numberI = 10;
  } else if (dayId === 2) {
    numberI = 4;
  } else if (dayId === 3) {
    numberI = 12;
  } else if (dayId === 4) {
    numberI = 6;
  } else if (dayId === 5) {
    numberI = 7;
  } else if (dayId === 6) {
    numberI = 8;
  }

  const arrayOfDays = [numberI - new Date(`${monthHelp + 1}/01/${year}`).getDay()];

  for (let i = arrayOfDays[0] + 7; i <= days; i += 7) {
    arrayOfDays.push(i);
  }

  if (arrayOfDays[0] <= 0) {
    arrayOfDays.shift();
  }

  return arrayOfDays;
};
