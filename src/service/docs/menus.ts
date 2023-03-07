import { Menu } from "@/src/entities/Product";
import {
  addDoc,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { db, menuCollection } from "../firebase";

let lastVisible: QueryDocumentSnapshot<DocumentData>;

const perPageDefault = 5;

export const createMenu = async (data: Menu) => {
  const menuValidation = await menuAlreadyExists({ name: data.name });
  if (menuValidation) return false;
  try {
    await addDoc(menuCollection, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const getMenus = async (
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q =
    page > 1
      ? query(
          menuCollection,
          orderBy("name"),
          startAfter(lastVisible),
          limit(perPage)
        )
      : query(menuCollection, orderBy("name"), limit(perPage));

  const menus = await getDocs(q);
  lastVisible = menus.docs[menus.docs.length - 1];
  return menus.docs.map(
    (doc) =>
      ({
        ...(doc.data() as Menu),
        id: doc.id,
      } as Menu)
  );
};

export const getMenusByName = async (
  name: string,
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q =
    page > 1
      ? query(
          menuCollection,
          orderBy("value"),
          startAfter(lastVisible),
          limit(perPage)
        )
      : query(menuCollection, orderBy("value"), limit(perPage));
  const menus = (await getDocs(q)).docs;

  lastVisible = menus[menus.length - 1];

  const menusFiltered = menus.filter((s) => s.data().name.includes(name));

  return menusFiltered.map(
    (doc) =>
      ({
        ...(doc.data() as Menu),
        id: doc.id,
      } as Menu)
  );
};

export const getAllMenus = async () =>
  (await getDocs(query(menuCollection, orderBy("value")))).docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Menu)
  );

export const menuAlreadyExists = async ({
  id,
  name,
}: {
  id?: string;
  name: string;
}) => {
  const menus = await getMenus();

  return !!menus.find((menu) => menu.id === id || menu.name === name);
};

export const deleteMenu = async (id: string) =>
  await deleteDoc(doc(db, "menus", id));

export const updateMenu = async (id: string, data: any) => {
  const menuRef = doc(db, "menus", id);
  try {
    await updateDoc(menuRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

// Paginable's functions

export const amountMenu = async () =>
  (await getDocs(menuCollection)).docs.length;

export const getMenuTotalPage = (length: number) =>
  Math.ceil(length / perPageDefault);
