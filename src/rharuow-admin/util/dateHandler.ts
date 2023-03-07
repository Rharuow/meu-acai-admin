import { Timestamp } from "firebase/firestore";

export const timeStampToDateFormTag = (timestamp: Timestamp) => {
  console.log("timestamp = ", timestamp);
  //  `${timestamp.toDate().getFullYear()}-${
  //   timestamp.toDate().getUTCMonth() < 10
  //     ? "0" + timestamp.toDate().getUTCMonth()
  //     : timestamp.toDate().getUTCMonth()
  // }-${timestamp.toDate().getDate()}`;
};
