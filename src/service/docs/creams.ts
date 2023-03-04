import { Cream } from "@/src/entities/Product";
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
import { db, creamCollection } from "../firebase";

let lastVisible: QueryDocumentSnapshot<DocumentData>;

const perPageDefault = 10;

export const createCream = async (data: Cream) => {
  const creamValidation = await creamAlreadyExists({ name: data.name });
  if (creamValidation) return false;
  try {
    await addDoc(creamCollection, data);
    return true;
  } catch (error) {
    return false;
  }
};
export const listCreams = async (
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q =
    page > 1
      ? query(
          creamCollection,
          orderBy("name"),
          startAfter(lastVisible),
          limit(perPage)
        )
      : query(creamCollection, orderBy("name"), limit(perPage));
  const creams = (await getDocs(q)).docs;

  lastVisible = creams[creams.length - 1];

  return creams.map(
    (doc) =>
      ({
        ...(doc.data() as Cream),
        id: doc.id,
      } as Cream)
  );
};

export const creamAlreadyExists = async ({
  id,
  name,
}: {
  id?: string;
  name: string;
}) => {
  const creams = await listCreams();

  return !!creams.find((cream) => cream.id === id || cream.name === name);
};

export const deleteCream = async (id: string) =>
  await deleteDoc(doc(db, "creams", id));

export const updateCream = async (id: string, data: any) => {
  const creamRef = doc(db, "creams", id);
  try {
    await updateDoc(creamRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

// Paginable's functions

export const amountCream = async () =>
  (await getDocs(creamCollection)).docs.length;

export const getCreamTotalPage = async () =>
  Math.ceil((await amountCream()) / perPageDefault);
