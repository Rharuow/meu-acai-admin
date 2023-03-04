import { Size } from "@/src/entities/Product";
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
import { db, sizeCollection } from "../firebase";

let lastVisible: QueryDocumentSnapshot<DocumentData>;

const perPageDefault = 10;

export const createSize = async (data: Size) => {
  const sizeValidation = await sizeAlreadyExists({ name: data.name });
  if (sizeValidation) return false;
  try {
    await addDoc(sizeCollection, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const listSize = async (
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q =
    page > 1
      ? query(
          sizeCollection,
          orderBy("name"),
          startAfter(lastVisible),
          limit(perPage)
        )
      : query(sizeCollection, orderBy("name"), limit(perPage));
  const sizes = (await getDocs(q)).docs;

  lastVisible = sizes[sizes.length - 1];

  return sizes.map(
    (doc) =>
      ({
        ...(doc.data() as Size),
        id: doc.id,
      } as Size)
  );
};

export const sizeAlreadyExists = async ({
  id,
  name,
}: {
  id?: string;
  name: string;
}) => {
  const sizes = await listSize();

  return !!sizes.find((size) => size.id === id || size.name === name);
};

export const deleteSize = async (id: string) =>
  await deleteDoc(doc(db, "sizes", id));

export const updateSize = async (id: string, data: any) => {
  const sizeRef = doc(db, "sizes", id);
  try {
    await updateDoc(sizeRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

// Paginable's functions

export const amountSize = async () =>
  (await getDocs(sizeCollection)).docs.length;

export const getSizeTotalPage = async () =>
  Math.ceil((await amountSize()) / perPageDefault);
