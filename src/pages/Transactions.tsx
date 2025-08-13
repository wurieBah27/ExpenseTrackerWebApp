import TransactionsSection, {
  type TransactionWithIcon,
} from "../components/TransactionsSection";
import useGetAllTransactions from "../features/transactions/useGetAllTransactions";

const Transactions = () => {
  const { transactions } = useGetAllTransactions() as {
    transactions: TransactionWithIcon[];
  };

  return (
    <div>
      <div>
        <TransactionsSection transactions={transactions} showProgress={false} />
      </div>
    </div>
  );
};

export default Transactions;
