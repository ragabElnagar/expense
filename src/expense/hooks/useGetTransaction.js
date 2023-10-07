import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../fireBaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0,
    totalExpense: 0,
    totalIncome: 0,
  });
  const transactionRef = collection(db, "transaction");
  const { userId } = useGetUserInfo();

  const getTransaction = async () => {
    let unsub;
    try {
      const queryTransaction = query(
        transactionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );
      unsub = onSnapshot(queryTransaction, (snapshot) => {
        let doc = [];
        let totalIncome = 0;
        let totalExpense = 0;
        snapshot.forEach((ele) => {
          const data = ele.data();
          const id = ele.id;
          doc.push({ ...data, id });
          if (data.transactionType == "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTransaction(doc);
        let balance = totalIncome - totalExpense;
        setTransactionTotal({
          balance,
          totalExpense,
          totalIncome,
        });
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsub;
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return { transaction,transactionTotal };
};
