/* eslint-disable react-hooks/rules-of-hooks */
import { type Timestamp } from 'firebase/firestore';
import { Location, useLocation } from 'react-router-dom';
import { changeFirestoreTime } from '../services/firebase/firestore';

export const pathWoBackslash = (): string => {
  const location = useLocation().pathname;
  return location.substring(1).charAt(0).toUpperCase() + location.slice(2);
};

export const lastParam = (location: Location): string => {
  const n = location.pathname.lastIndexOf('/');
  return location.pathname.substring(n + 1);
};

export const showMonthAndYear = (date: Date): JSX.Element => {
  return (
    <>
      {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
    </>
  );
};

export const showMonthAndDay = (date: Date): JSX.Element => {
  return (
    <>
      {date.toLocaleString('default', { month: 'short' })} {date.getDate()}
    </>
  );
};

export const showMonthDayAndYear = (date: string): JSX.Element => {
  const inputDate = new Date(date);
  return (
    <>
      {inputDate.toLocaleString('default', { month: 'short' })} {inputDate.getDate()}, {inputDate.getFullYear()}
    </>
  );
};

export const showTime = (date: string): JSX.Element => {
  const inputDate = new Date(date);
  const hours = inputDate.getHours();
  const getHours = (hr: number) => {
    if (hr <= 12) {
      return hr;
    }
    if (hr % 12 < 12) {
      return hr % 12;
    }
    return 12;
  };

  return (
    <>
      {getHours(hours)}:{inputDate.getMinutes()} {hours > 12 ? 'pm' : 'am'}
    </>
  );
};

export const convertToTimeSince = (date: string): JSX.Element => {
  const currTime = new Date();
  const inputDate = new Date(date);
  // in milliseconds
  const timeSince = currTime.valueOf() - inputDate.valueOf();
  const yearDiff = currTime.getFullYear() - inputDate.getFullYear();
  const seconds = Number((timeSince / 1000).toFixed());
  const minutes = Number((timeSince / 60000).toFixed());
  const hours = Number((timeSince / 3600000).toFixed());
  // const days = (timeSince/ (1000 * 60 * 60 * 24)).toFixed();
  if (seconds < 60) return <>{seconds}s</>;
  else if (minutes < 60) return <>{minutes}m</>;
  else if (hours < 24) return <>{hours}h</>;
  else if (yearDiff > 0)
    return (
      <>
        {showMonthAndDay(inputDate)}, {inputDate.getFullYear()}
      </>
    );
  else return showMonthAndDay(inputDate);
};
