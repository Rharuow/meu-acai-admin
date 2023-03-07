import { User } from "@/src/entities/User";
import {
  addDoc,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import { db, userCollection } from "../firebase";

let lastVisible: any = false;

const perPageDefault = 10;

export const listUsers = async (
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q = lastVisible
    ? query(
        userCollection,
        orderBy("name"),
        startAfter(lastVisible),
        limit(perPage)
      )
    : query(userCollection, orderBy("name"), limit(perPage));
  const users = await getDocs(q);

  lastVisible = page > 1 ? users.docs[users.docs.length - 1] : false;

  return users.docs.map(
    (doc) =>
      ({
        ...(doc.data() as User),
        id: doc.id,
      } as User)
  );
};

export const getUser = async (name: string) => {
  const user = await getDoc(doc(db, "users", name));
  if (user.exists()) return user.data();
  return "Usuário não encontrado!";
};

export const createUser = async (data: User) =>
  await addDoc(userCollection, data);

export const deleteUser = async (id: string) =>
  await deleteDoc(doc(db, "users", id));

export const isAdmin = async (name: string) => {};

export const getAdmin = async (data: { name: string; password: string }) => {
  const q = query(
    collectionGroup(db, "users"),
    where("name", "==", data.name),
    where("password", "==", data.password)
  );

  const queryAdmin = (await getDocs(q)).docs[0]?.data();

  let isAllowed = false;
  if (queryAdmin)
    for (const role of queryAdmin.roles)
      if ((await getDoc(doc(db, "roles", role.id))).data()?.name === "admin")
        return { name: queryAdmin.name, role: "admin" };

  return isAllowed;
};

export const updateUser = async (id: string, data: any) => {
  const userRef = doc(db, "users", id);
  try {
    await updateDoc(userRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserTotalPage = (length: number) =>
  Math.ceil(length / perPageDefault);
