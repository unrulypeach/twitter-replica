import { type Timestamp } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { changeFirestoreTime } from "../services/firebase/firestore";

export const pathWoBackslash = (): string => {
  const location = useLocation().pathname;
  return location.substring(1).charAt(0).toUpperCase() + location.slice(2);
};

export const showMonthAndYear = (date: Date): JSX.Element => {
  return (
    <>
      {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
    </>
  );
};

export const showMonthAndDay = (date: Date): JSX.Element => {
  return (
    <>
      {date.toLocaleString("default", { month: "short" })} {date.getDate()}
    </>
  );
};

export const convertToTimeSince = (date: Timestamp): JSX.Element => {
  const currTime = new Date();
  const inputDate = changeFirestoreTime(date.seconds, date.nanoseconds);
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
