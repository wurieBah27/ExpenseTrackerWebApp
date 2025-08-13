import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

type GetTransactionsParams = {
  id: string;
  userId?: string;
};

type TrannsactionsDate = {
  startOfMonth: Date;
  endOfMonth: Date;
};

type AddNewTransactionParams = {
  data?: object;
} & GetTransactionsParams;

const getAllTransactions = async ({
  id,
  startOfMonth,
  endOfMonth,
}: AddNewTransactionParams & TrannsactionsDate) => {
  try {
    let data: object[] = [];
    const docRef = collection(db, "users", id, "transactions");
    // const q = query(docRef, where("type", "==", "expense"));
    console.log(startOfMonth, endOfMonth);
    const q = query(
      docRef,
      where("date", ">=", startOfMonth),
      where("date", "<=", endOfMonth),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docData = doc.data();
      if (docData?.createdAt instanceof Timestamp) {
        docData.createdAt = docData.createdAt.toDate();
      }
      if (docData?.date instanceof Timestamp) {
        docData.date = docData.date.toDate();
      }

      data.push({ id: doc.id, ...docData });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewTransaction = async ({
  id,
  data,
}: AddNewTransactionParams) => {
  try {
    const docRef = collection(db, "users", id, "transactions");

    await addDoc(docRef, data);

    return {};
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = async ({
  userId,
  id,
}: GetTransactionsParams) => {
  try {
    const docRef = doc(db, `users/${userId}/transactions`, id);
    // You need to specify the document to delete

    await deleteDoc(docRef);

    return {};
  } catch (error) {
    console.log(error);
    throw new Error("Document cannot be deleted, please try again!");
  }
};

export default getAllTransactions;
