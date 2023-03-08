import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const adminRef = doc(db, "admin", "IQpSlkYb9kEsiRYKNaPH");

export const getStatus = async () => {
  return (await getDoc(adminRef)).data()?.status;
};

export const updateStatus = async (status: boolean) => {
  await updateDoc(adminRef, { status });
};
