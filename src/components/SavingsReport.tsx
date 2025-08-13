import { useSearchParams } from "react-router-dom";
import useGetAllTransactions from "../features/transactions/useGetAllTransactions";
import { calculateTotal } from "../helpers/helperFunc";
import ProgressBar from "./ProgressBar";

export type Transaction = {
  type: string;
  amount: number;
  // add other properties as needed
};

const SavingsReport = () => {
  const [searchParams] = useSearchParams();

  const { transactions } = useGetAllTransactions() as {
    transactions: Transaction[];
  };

  const currentFilterValue = searchParams.get("monthlyPeriod") || "";
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const totalIncome = calculateTotal(transactions, "Income");
  const totalExpense = calculateTotal(transactions, "Expense");

  const totalSavings = totalIncome - totalExpense;
  const widthPercent = totalIncome
    ? Math.round((totalSavings / totalIncome) * 100)
    : 0;
  const expensesPercent = totalIncome
    ? Math.round((totalExpense / totalIncome) * 100)
    : 0;

  return (
    <div>
      <div className="rounded-2xl bg-white p-2 py-5 shadow-xl sm:p-5">
        <h4 className="text-xl font-bold text-gray-500">
          {currentFilterValue || currentMonth} Savings
        </h4>
        <h4 className="flex items-center justify-between py-2 text-2xl font-extrabold sm:text-4xl">
          <span className="text-sm">Income:</span> AED{" "}
          {totalIncome?.toLocaleString() || 0}.00
        </h4>
        <h4 className="flex items-center justify-between py-2 text-2xl font-extrabold text-red-500 sm:text-4xl">
          <span className="text-sm">Expense:</span> AED{" "}
          {totalExpense?.toLocaleString() || 0}.00
        </h4>
        <div className="mt-5 flex flex-col gap-4 rounded-sm">
          <ProgressBar
            widthPercent={widthPercent}
            text="Income"
            height={10}
            amount={totalSavings}
            category="Income"
          />
          <ProgressBar
            widthPercent={expensesPercent}
            text="Expense"
            height={10}
            category="Expense"
            amount={totalExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default SavingsReport;
