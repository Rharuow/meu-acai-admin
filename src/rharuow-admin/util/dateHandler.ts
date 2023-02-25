import { Timestamp } from "firebase/firestore";

export const timeStampToDateFormTag = (timeStap: Timestamp) =>
  `${timeStap.toDate().getFullYear()}-${
    timeStap.toDate().getUTCMonth() < 10
      ? "0" + timeStap.toDate().getUTCMonth()
      : timeStap.toDate().getUTCMonth()
  }-${timeStap.toDate().getDate()}`;
