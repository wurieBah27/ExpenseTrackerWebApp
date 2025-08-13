import Categories from "../components/Categories";
import SavingsReport from "../components/SavingsReport";
import TransactionsSection, {
  type TransactionWithIcon,
} from "../components/TransactionsSection";
import useGetAllTransactions from "../features/transactions/useGetAllTransactions";

const HomePage = () => {
  const { transactions } = useGetAllTransactions() as {
    transactions: TransactionWithIcon[];
  };
  // Example: Group transactions by category name and sum amounts
  const grouped = transactions?.reduce(
    (acc, tx) => {
      const name = tx.category?.name;
      if (!name) return acc;
      if (!acc[name]) {
        acc[name] = {
          date: tx.date,
          type: tx.type,
          amount: 0,
          id: tx.id,
          category: {
            name: tx.category.name,
            icon: tx.category.icon,
            id: tx.category.id,
            amount: 0,
            monthlyBudget: tx.category?.monthlyBudget || 0,
            type: tx.category?.type || "",
          },
        };
      }
      acc[name].category.amount += Number(tx.amount) || 0;
      acc[name].amount += Number(tx.amount);
      acc[name];
      return acc;
    },
    {} as Record<string, TransactionWithIcon>,
  );

  // To get an array:
  const result = Object?.values(grouped ?? {});

  return (
    <div>
      <div>
        <div>
          <div className="mt-6">
            <SavingsReport />
          </div>
          <div>
            <Categories />
          </div>
          <div>
            <TransactionsSection transactions={result} showProgress={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
