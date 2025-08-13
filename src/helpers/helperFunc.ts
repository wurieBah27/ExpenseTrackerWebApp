import type { Transaction } from "../components/SavingsReport";

export const calculateTotal = (transactions: Transaction[], type: string) => {
  return transactions?.reduce((acc, transaction) => {
    if (transaction.type === type) {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);
};
