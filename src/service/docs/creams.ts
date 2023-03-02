import { Cream } from "@/src/entities/Product";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, creamCollection } from "../firebase";

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
export const listCreams = async () =>
  (await getDocs(creamCollection)).docs.map(
    (doc) =>
      ({
        ...(doc.data() as Cream),
        id: doc.id,
      } as Cream)
  );

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
