import { Menu } from "@/src/entities/Product";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, menuCollection } from "../firebase";

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
export const listMenu = async () =>
  (await getDocs(menuCollection)).docs.map(
    (doc) =>
      ({
        ...(doc.data() as Menu),
        id: doc.id,
      } as Menu)
  );

export const menuAlreadyExists = async ({
  id,
  name,
}: {
  id?: string;
  name: string;
}) => {
  const menus = await listMenu();

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
