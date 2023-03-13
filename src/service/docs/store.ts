import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const adminRef = doc(db, "store", `${process.env.NEXT_PUBLIC_STORE_ID}`);

export const getStatus: () => Promise<boolean> = async () => {
  return (await getDoc(adminRef)).data()?.status;
};

export const updateStatus = async (status: boolean) => {
  await updateDoc(adminRef, { status });
};
