import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../fireBaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionRef = collection(db, "transaction");
  const { userId } = useGetUserInfo();

  const addTransaction = async (
    description,
    transactionAmount,
    transactionType
  ) => {
    await addDoc(transactionRef, {
      userId,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };

  return { addTransaction };
};

export default useAddTransaction;
