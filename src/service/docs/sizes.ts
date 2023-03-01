import { Size } from "@/src/entities/Product";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, sizeCollection } from "../firebase";

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
export const listSize = async () =>
  (await getDocs(sizeCollection)).docs.map(
    (doc) =>
      ({
        ...(doc.data() as Size),
        id: doc.id,
      } as Size)
  );

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

export const updateUser = async (id: string, data: any) => {
  const sizeRef = doc(db, "sizes", id);
  try {
    await updateDoc(sizeRef, data);
    return true;
  } catch (error) {
    return false;
  }
};
