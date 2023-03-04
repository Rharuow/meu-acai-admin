import { Topping, Toppings } from "@/src/entities/Product";
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
import { db, toppingCollection } from "../firebase";

let lastVisible: QueryDocumentSnapshot<DocumentData>;

const perPageDefault = 2;

export const createTopping = async (data: Topping) => {
  const toppingValidation = await toppingAlreadyExists({ name: data.name });
  if (toppingValidation) return false;
  try {
    await addDoc(toppingCollection, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const getToppings = async (
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q =
    page > 1
      ? query(
          toppingCollection,
          orderBy("name"),
          startAfter(lastVisible),
          limit(perPage)
        )
      : query(toppingCollection, orderBy("name"), limit(perPage));

  const toppings = await getDocs(q);
  lastVisible = toppings.docs[toppings.docs.length - 1];
  return toppings.docs.map(
    (doc) =>
      ({
        ...(doc.data() as Topping),
        id: doc.id,
      } as Topping)
  );
};

export const getAllTopping = async () =>
  (await getDocs(toppingCollection)).docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Topping)
  );

export const toppingAlreadyExists = async ({
  id,
  name,
}: {
  id?: string;
  name: string;
}) => {
  const toppings = await getToppings();

  return !!toppings.find(
    (topping) => topping.id === id || topping.name === name
  );
};

export const deleteTopping = async (id: string) =>
  await deleteDoc(doc(db, "toppings", id));

export const updateTopping = async (id: string, data: any) => {
  const toppingRef = doc(db, "toppings", id);
  try {
    await updateDoc(toppingRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

// Paginable's functions

export const amountTopping = async () =>
  (await getDocs(toppingCollection)).docs.length;

export const getToppingTotalPage = async () =>
  Math.ceil((await amountTopping()) / perPageDefault);
