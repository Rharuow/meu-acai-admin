import { Topping } from "@/src/entities/Product";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, toppingCollection } from "../firebase";

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
export const listTopping = async () =>
  (await getDocs(toppingCollection)).docs.map(
    (doc) =>
      ({
        ...(doc.data() as Topping),
        id: doc.id,
      } as Topping)
  );

export const toppingAlreadyExists = async ({
  id,
  name,
}: {
  id?: string;
  name: string;
}) => {
  const toppings = await listTopping();

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
