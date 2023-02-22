import { User } from "@/src/entities/User";
import {
  addDoc,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

export const getAdmin = async (data: { name: string; password: string }) => {
  const q = query(
    collectionGroup(db, "users"),
    where("name", "==", data.name),
    where("password", "==", data.password)
  );

  const queryAdmin = (await getDocs(q)).docs[0]?.data();

  let isAllowed = false;
  if (queryAdmin)
    for (const role of queryAdmin.roles) {
      if ((await getDoc(doc(db, "roles", role.id))).data()?.name === "admin")
        isAllowed = true;
    }

  return isAllowed;
};
