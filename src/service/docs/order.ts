import { Order } from "@/src/entities/Order";
import {
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
  where,
} from "firebase/firestore";
import { db, orderCollection } from "../firebase";

let lastVisible: QueryDocumentSnapshot<DocumentData>;

const perPageDefault = 5;

export const getOrders = async (
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q =
    page > 1
      ? query(
          orderCollection,
          where("status", "not-in", ["canceled", "done"]),
          startAfter(lastVisible),
          limit(perPage)
        )
      : query(
          orderCollection,
          where("status", "not-in", ["canceled", "done"]),
          limit(perPage)
        );

  const orders = await getDocs(q);

  lastVisible = orders.docs[orders.docs.length - 1];
  return orders.docs.map(
    (doc) =>
      ({
        ...(doc.data() as Order),
        id: doc.id,
      } as Order)
  );
};

export const getOrdersByName = async (
  name: string,
  page: number = 1,
  perPage: number = perPageDefault
) => {
  const q =
    page > 1
      ? query(
          orderCollection,
          orderBy("value"),
          startAfter(lastVisible),
          limit(perPage)
        )
      : query(orderCollection, orderBy("value"), limit(perPage));
  const orders = (await getDocs(q)).docs;

  lastVisible = orders[orders.length - 1];

  const ordersFiltered = orders.filter((s) => s.data().name.includes(name));

  return ordersFiltered.map(
    (doc) =>
      ({
        ...(doc.data() as Order),
        id: doc.id,
      } as Order)
  );
};

export const getAllOrders = async () =>
  (await getDocs(query(orderCollection, orderBy("id")))).docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Order)
  );

export const deleteOrder = async (id: string) =>
  await deleteDoc(doc(db, "orders", id));

export const updateOrder = async (id: string, data: any) => {
  const orderRef = doc(db, "orders", id);
  try {
    await updateDoc(orderRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

// Paginable's functions

export const amountOrder = async () =>
  (await getDocs(orderCollection)).docs.length;

export const getOrderTotalPage = (length: number) =>
  Math.ceil(length / perPageDefault);
