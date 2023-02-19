import { User } from "@/src/entities/User";
import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

import { db, userCollection } from "../firebase";

export const getUsers = async () =>
  (await getDocs(userCollection)).docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));

export const createUser = async (data: User) =>
  await addDoc(userCollection, data);

export const deleteUser = async (id: string) =>
  await deleteDoc(doc(db, "users", id));
