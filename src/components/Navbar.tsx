import { Link } from "react-router-dom";
import { getUser } from "../features/user/useGetCurrentUser";
import useGetAllTransactions from "../features/transactions/useGetAllTransactions";
import type { Transaction } from "./SavingsReport";
import { calculateTotal } from "../helpers/helperFunc";
import { Avatar, Button, DropdownItem } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import DropdownComponent from "./Dropdown";
import ModalComponent from "./Modal";
import { useState } from "react";
import { LogOutUser } from "../features/user/useLoginOutUser";

export type User = {
  profileUrl?: string;
  currencyPreference: string;
  email: string;
  name: string;
  // add other properties if needed
};

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, uid } = getUser();
  const { transactions } = useGetAllTransactions() as {
    transactions: Transaction[];
  };

  /*  log out function */
  const { signOut } = LogOutUser();

  const totalIncome = calculateTotal(transactions, "Income");
  const totalExpense = calculateTotal(transactions, "Expense");
  const totalSavings = totalIncome - totalExpense;

  const user = data?.at(0) as User | undefined;
  const profileUrl = user?.profileUrl;
  const currencyPreference = user?.currencyPreference;

  const handleOpenModal = () => setOpenModal(!openModal);
  const handleSignoutUser = () => {
    signOut();
    setOpenModal(false);
  };

  return (
    <header className="">
      <div className="mx-auto max-w-screen-xl border-b border-gray-100 px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between max-[360px]:h-16">
          {uid && (
            <div className="flex items-center gap-12">
              <DropdownComponent
                RenderTrigerChildren={
                  <div className="relative flex flex-col items-start">
                    <span className="overflow-hidden rounded-full border">
                      <span className="sr-only">Toggle dashboard menu </span>
                      {profileUrl && (
                        <img
                          src={profileUrl}
                          alt=""
                          className="size-10 object-cover max-[360px]:size-7"
                        />
                      )}
                      {!profileUrl && <Avatar />}{" "}
                    </span>
                  </div>
                }
                hideDropdown={true}
              >
                <Link to={"/account"}>
                  {" "}
                  <DropdownItem>Account</DropdownItem>
                </Link>
                <DropdownItem onClick={handleOpenModal}>
                  <span className="text-red-500">Log out</span>
                </DropdownItem>
              </DropdownComponent>
            </div>
          )}
          {!uid && (
            <Link to="/login">
              <Button>Login in</Button>
            </Link>
          )}
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
      <ModalComponent
        title=""
        openModal={openModal}
        setOpenModal={handleOpenModal}
      >
        <div className="flex flex-col flex-wrap items-center gap-10">
          <h4>Are you sure you want to log out ?</h4>
          <div className="flex items-center gap-2">
            <Button color={"red"} onClick={handleSignoutUser}>
              Yes ?
            </Button>
            <Button onClick={handleOpenModal}>Decline</Button>
          </div>
        </div>
      </ModalComponent>
    </header>
  );
};

export default Navbar;
