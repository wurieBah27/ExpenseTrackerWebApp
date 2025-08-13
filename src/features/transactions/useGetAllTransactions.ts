import { useQuery } from "@tanstack/react-query";
import getAllTransactions from "../../Apis/transactions";
import { useGetCurrentUser } from "../user/useGetCurrentUser";
import { getMonthDate } from "../../helpers/getMonthDate";

const useGetAllTransactions = () => {
  const { uid } = useGetCurrentUser();

  const period = localStorage.getItem("monthlyPeriod") || "";

  let myObject;

  if (period) {
    myObject = JSON.parse(period);
    console.log(typeof myObject); // { monthlyPeriod: 'July-2025', startOfMonth: '2025-07-01T00:00:00.000Z' }
  }
  const now = new Date();

  const currentPeriod = getMonthDate(now);

  const monthStart = currentPeriod;
  const monthEnd = new Date(currentPeriod);

  monthEnd.setMonth(monthEnd.getMonth() + 1);
  monthEnd.setDate(0);
  monthEnd.setHours(23, 59, 59, 999);

  const searchDateStart = myObject || monthStart;

  const startOfMonth = new Date(searchDateStart);

  const endOfMonth = new Date(searchDateStart);

  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  const monthText = startOfMonth.toLocaleString("default", { month: "long" });

  const { data: transactions, isLoading } = useQuery({
    queryFn: () =>
      getAllTransactions({
        id: uid,
        startOfMonth: startOfMonth,
        endOfMonth: endOfMonth,
      }),
    queryKey: ["allTransactions", startOfMonth, endOfMonth],
    enabled: !!uid,
  });
  return { transactions, isLoading, monthText };
};

export default useGetAllTransactions;
