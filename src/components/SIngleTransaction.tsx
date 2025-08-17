import ProgressBar from "./ProgressBar";
import { HiCheck } from "react-icons/hi";
import { useState, type ElementType } from "react";
import { format } from "date-fns";
import { Button } from "flowbite-react";
import ModalComponent from "./Modal";
import useDeleteTransaction from "../features/transactions/useDeleteTransaction";
import { useGetCurrentUser } from "../features/user/useGetCurrentUser";

type SingleTransactionProps = {
  Icon: ElementType;
  title: string;
  date: Date | null;
  dailyBudget?: string;
  monthlyBudget: number;
  amount: number;
  type: string;
  id: string;
  showProgress: boolean;
};

const SIngleTransaction = ({
  Icon,
  title,
  monthlyBudget,
  type,
  id,
  dailyBudget,
  showProgress,
  date,
  amount,
}: SingleTransactionProps) => {
  const [openModal, setOpenModal] = useState(false);

  const remaingPercent = Math.round((amount / monthlyBudget || 0) * 100);
  const transactionDate = format(new Date(date ?? new Date()), "PP");
  const { useDeleteItemTransaction, isPending } = useDeleteTransaction();
  const { uid } = useGetCurrentUser();

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleDeleteTransaction = async () => {
    await useDeleteItemTransaction({ id: id, userId: uid });

    setOpenModal(!openModal);
  };
  return (
    <div
      className={`relative my-5 min-w-72 rounded-md ${type === "Income" ? "bg-green-100" : "bg-red-100"} p-5 shadow-md max-[382px]:p-3`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="mb-6 flex items-center gap-3">
            <div
              className={`rounded-full ${type === "Expense" ? "text-red-200" : "text-green-300"} p-5 max-[382px]:p-3`}
            >
              <Icon
                className={`size-7 ${type === "Expense" ? "text-red-500" : "text-green-500"} max-[382px]:size-5`}
              />
            </div>
            <div>
              <h4 className="text-2xl font-bold max-[382px]:text-xl">
                {title}
              </h4>

              <span className="text-sm text-gray-500">
                {type === "Expense" &&
                  showProgress &&
                  `Daily: AED ${dailyBudget}`}
                {type === "Income" && showProgress && transactionDate}
                {!showProgress && transactionDate}
              </span>
            </div>
          </div>
          <div className="h-full">
            <span className="text-3xl font-bold max-[382px]:text-xl">
              {amount}
            </span>
            {!showProgress && (
              <div className="absolute right-3 bottom-2">
                <Button
                  pill
                  color={"red"}
                  size="xs"
                  onClick={handleOpenModal}
                  disabled={isPending}
                >
                  Delete
                </Button>

                <ModalComponent
                  title="Select an Icon"
                  openModal={openModal}
                  setOpenModal={handleOpenModal}
                >
                  <div className="flex flex-col flex-wrap items-center gap-10">
                    <h4>Are you sure ?</h4>
                    <div className="flex items-center gap-2">
                      <Button color={"red"} onClick={handleDeleteTransaction}>
                        Yes Delete ?
                      </Button>
                      <Button onClick={handleOpenModal}>Decline</Button>
                    </div>
                  </div>
                </ModalComponent>
              </div>
            )}
          </div>
        </div>

        {showProgress && (
          <ProgressBar
            text={title}
            widthPercent={
              type === "Expense"
                ? remaingPercent < 100
                  ? remaingPercent
                  : 100
                : 100
            }
            amount={
              type === "Expense"
                ? amount > monthlyBudget
                  ? monthlyBudget - amount
                  : monthlyBudget
                : amount
            }
            height={5}
            category={type}
          />
        )}
        {showProgress && (
          <>
            {" "}
            {type === "Expense" && (
              <div>
                <div className="my-5 flex items-center gap-2">
                  <span
                    className={`flex size-5 items-center justify-center rounded-full ${+remaingPercent >= 70 ? "bg-red-600" : "bg-green-500"} text-white`}
                  >
                    <HiCheck />
                  </span>
                  <p className="text-xs text-gray-700">
                    {+remaingPercent >= 70 && +remaingPercent < 100
                      ? " You are almost exceeding your budget"
                      : +remaingPercent >= 100
                        ? `You have exceeded your budget by ${monthlyBudget - amount} AED`
                        : " You are on track with your budget"}
                  </p>
                </div>
              </div>
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default SIngleTransaction;
