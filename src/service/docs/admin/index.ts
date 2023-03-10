import { Admin } from "@/src/entities/User";
import { getDocs, query, where } from "firebase/firestore";

import { adminCollection } from "../../firebase";

export const getAdmin = async (data: { name: string; password: string }) => {
  const q = query(
    adminCollection,
    where("name", "==", data.name),
    where("password", "==", data.password)
  );
  try {
    return (await getDocs(q)).docs[0].data() as Admin;
  } catch (error) {
    return false;
  }
};
