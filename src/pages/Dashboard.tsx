import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from "date-fns";
import BarChartComponent from "../components/BarChart";
import PieChart from "../components/PieChart";
import TransactionsSection, {
  type TransactionWithIcon,
} from "../components/TransactionsSection";
import useGetAllTransactions from "../features/transactions/useGetAllTransactions";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams] = useSearchParams();

  const { transactions } = useGetAllTransactions() as {
    transactions: TransactionWithIcon[];
  };
  const dateFromSearchParams = searchParams.get("startOfMonth") || "";
  const currentDate = new Date();

  const selectedDate = new Date(dateFromSearchParams);
  // Date of the current month and yesr
  const startOfTheMonth = dateFromSearchParams
    ? startOfMonth(selectedDate)
    : startOfMonth(currentDate);

  const endOfTheMonth = dateFromSearchParams
    ? endOfMonth(selectedDate)
    : endOfMonth(currentDate);

  // Generate an array of all dates in the month
  const allDatesInMonth = eachDayOfInterval({
    start: startOfTheMonth,
    end: endOfTheMonth,
  });
  const barChartData = allDatesInMonth.map((date) => {
    return {
      name: format(date, "MMM dd"),
      Expense: transactions
        ?.filter((order) => isSameDay(date, new Date(order?.date ?? "")))
        .filter((item) => item.type === "Expense")
        .reduce((x, amount) => x + amount.amount, 0),
    };
  });

  const pieChartData = transactions?.reduce(
    (acc, transaction) => {
      const categoryName = transaction.type;
      const existingCategory = acc.find((item) => item.name === categoryName);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        acc.push({ name: categoryName, value: transaction.amount, balance: 0 });
      }
      return acc;
    },
    [] as { name: string; value: number; balance: number }[],
  );

  const pieChartDataIncomeBalance = pieChartData?.map((item) => {
    const Income =
      pieChartData?.find((item) => item.name === "Income")?.value || 0;
    const Expense =
      pieChartData?.find((item) => item.name === "Expense")?.value || 0;

    return {
      ...item,
      value: item.name === "Income" ? Income - Expense : item.value,
    };
  });
  return (
    <div>
      <div className="h-72 py-4">
        <h5 className="mb-3 font-bold text-gray-500">Expense By Month</h5>
        <BarChartComponent data={barChartData} />
      </div>
      <div className="flex flex-col items-center sm:flex-row">
        <div className="my-20 h-78 w-full rounded-md bg-white p-6 shadow-md">
          <PieChart data={pieChartDataIncomeBalance} />
        </div>
      </div>
      <div>
        <TransactionsSection showProgress={true} transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
