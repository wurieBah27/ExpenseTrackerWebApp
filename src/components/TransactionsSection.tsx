import SIngleTransaction from "./SIngleTransaction";
import type { Transaction } from "./SavingsReport";
import { iconMap } from "./IconsPage";

export type TransactionWithIcon = Transaction & {
  id: string;
  date: Date | null;
  category: {
    id: string;
    name: string;
    icon: string;
    monthlyBudget: number;
    type: string;
    amount: number;
  };
};

type TransactionsSectionProps = {
  transactions?: TransactionWithIcon[];
  showProgress: boolean;
};

const TransactionsSection = ({
  transactions,
  showProgress,
}: TransactionsSectionProps) => {
  return (
    <div className="my-10">
      <div>
        <div>
          <div>
            <p className="text-2xl font-bold text-gray-500">
              Monthly Transactions
            </p>
          </div>
          <div className="mt-7">
            {transactions?.map((item) => {
              const IconComponent = iconMap[item.category.icon];
              const dailyBudget = (item.category.monthlyBudget / 30).toFixed(0);

              if (!IconComponent) {
                throw new Error("An error occured"); // Skip rendering if IconComponent is not found
              }
              return (
                <SIngleTransaction
                  showProgress={showProgress}
                  monthlyBudget={item.category.monthlyBudget}
                  Icon={IconComponent}
                  title={item.category.name}
                  dailyBudget={dailyBudget}
                  amount={item.amount}
                  id={item.id}
                  date={item.date}
                  key={item.id}
                  type={item.type}
                  // totalAmountSpent={item.category.monthlyBudget - item.amount}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsSection;
