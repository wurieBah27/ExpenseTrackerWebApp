import { Link } from "react-router-dom";
import { getUser } from "../features/user/useGetCurrentUser";
import useGetAllTransactions from "../features/transactions/useGetAllTransactions";
import type { Transaction } from "./SavingsReport";
import { calculateTotal } from "../helpers/helperFunc";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

export type User = {
  profileUrl?: string;
  currencyPreference: string;
  email: string;
  name: string;
  // add other properties if needed
};

const Navbar = () => {
  const { data } = getUser();
  const { transactions } = useGetAllTransactions() as {
    transactions: Transaction[];
  };

  const totalIncome = calculateTotal(transactions, "Income");
  const totalExpense = calculateTotal(transactions, "Expense");
  const totalSavings = totalIncome - totalExpense;

  const user = data?.at(0) as User | undefined;
  const profileUrl = user?.profileUrl;
  const currencyPreference = user?.currencyPreference;

  return (
    <header className="">
      <div className="mx-auto max-w-screen-xl border-b border-gray-100 px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between max-[360px]:h-16">
          <Link to="/login">
            <div className="flex items-center gap-12">
              <div className="relative flex flex-col items-start">
                <span className="overflow-hidden rounded-full border">
                  <span className="sr-only">Toggle dashboard menu </span>

                  <img
                    src={
                      profileUrl ||
                      "https://plus.unsplash.com/premium_photo-1676782583940-633240617c78?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt=""
                    className="size-10 object-cover max-[360px]:size-7"
                  />

                  {/* <Avatar /> */}
                </span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-12">
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="font-bold max-[360px]:text-xs">Today :</span>
                <span className="text-xl font-bold max-[360px]:text-xs">
                  {currencyPreference}{" "}
                  {isNaN(totalSavings) ? 0 : totalSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <div>
                <span className="font-bold max-[360px]:text-sm">
                  <Link to={"/new-transaction"}>
                    <Button color={"alternative"}>
                      <HiPlus className="size-7" />
                    </Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
