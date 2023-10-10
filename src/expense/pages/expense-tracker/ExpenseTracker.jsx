import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../../fireBaseConfig";
import { useNavigate } from "react-router-dom";

function ExpenseTracker(props) {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const { addTransaction } = useAddTransaction();
  const { transaction, transactionTotal } = useGetTransaction();
  const { balance, totalExpense, totalIncome } = transactionTotal;
  const { name, profile } = useGetUserInfo();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction(description, transactionAmount, transactionType);
  };

  const sinOut = async () => {
    signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="py-8">
      <div className="px-5 flex md:px-40 justify-between">
        <div className="flex flex-col">
          <div>
            <h1 className="text-xl md:text-3xl font-bold mb-4">
              <span className="text-gray-500">{name}</span>`s Expense Tracker
            </h1>
            <div className="mb-4 flex">
              <h3 className="text-lg md:text-xl font-medium">your balance : </h3>
              <h2 className="text-xl md:text-2xl ml-2 font-medium">
                {balance >= 0 ? `$ ${balance}` : `-$ ${balance * -1}`}
              </h2>
            </div>
            <div>
              <div className="mb-4 flex">
                <h4 className="text-lg md:text-xl font-medium">income :</h4>
                <p className="text-xl md:text-2xl ml-2 font-medium">${totalIncome}</p>
              </div>
              <div className="mb-4 flex">
                <h4 className="text-lg md:text-xl font-medium">expense: </h4>
                <p className="text-xl md:text-2xl ml-2 font-medium">${totalExpense}</p>
              </div>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="w-full border-2 flex flex-col md:w-1/2 p-2 rounded-md"
          >
            <input
              className="border  rounded-md p-1 mb-2"
              placeholder="description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="border  rounded-md p-1 mb-2"
              type="number"
              placeholder="amount"
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <div className="flex justify-between">
              <div className="flex">
                <input
                  className="mr-2"
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label>expense</label>
              </div>
              <div className="flex">
                <input
                  className="mr-2"
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label>income</label>
              </div>
            </div>
            <button
              className="w-auto bg-gray-500 text-white py-2 rounded-md mt-2 hover:bg-gray-800 font-bold"
              type="submit"
            >
              Add Transaction
            </button>
          </form>
        </div>
        <div className="flex align-baseline flex-col">
          <img
            className="rounded-full"
            alt="profile"
            src={
              profile
                ? profile
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtNBgCacCwHhxVPj1ubPRygdT7X_7w_UrLQ&usqp=CAU"
            }
          />
          <button
            className="font-bold bg-sky-600 text-white rounded-lg py-2 mt-4 "
            onClick={sinOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="py-2 mt-8 m-auto h-80 overflow-x-hidden border overflow-y-scroll">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        description
                      </th>
                      <th scope="col" className="px-6 py-4">
                        amount
                      </th>
                      <th scope="col" className="px-6 py-4">
                        type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.map((ele, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {ele.description}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            $ {ele.transactionAmount}
                          </td>
                          <td
                            className={`whitespace-nowrap px-6 py-4 font-medium ${
                              ele.transactionType === "expense"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {ele.transactionType}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
