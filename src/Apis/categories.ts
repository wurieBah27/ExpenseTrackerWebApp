import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

type GetCategoriesParams = {
  id: string;
  category: string;
};
type NewCategoryParams = {
  name: string;
  icon: string;
  color?: string;
  monthlyBudget: number;
} & GetCategoriesParams;
export const newCategory = async ({
  id,
  name,
  icon,
  category,
  monthlyBudget,
}: NewCategoryParams) => {
  try {
    const docRef = collection(db, "users", id, "categories");

    await addDoc(docRef, {
      name,
      icon,
      category,
      monthlyBudget,
    });

    return {};
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async ({
  id,
  category,
}: GetCategoriesParams) => {
  try {
    let data: object[] = [];
    const docRef = collection(db, "users", id, "categories");

    const q = query(docRef, where("category", "==", category));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docData = {
        ...doc.data(),
        id: doc.id,
      };
      data.push(docData);
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
