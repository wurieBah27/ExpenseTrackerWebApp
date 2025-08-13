import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewTransaction } from "../../Apis/transactions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAddNewTransaction = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: useAddNewTrans, isPending } = useMutation({
    mutationFn: addNewTransaction,
    onSuccess: () => {
      toast.success("Transaction added successfully!");
      queryClient.invalidateQueries({ queryKey: ["allTransactions"] });
      navigate("/");
    },
    onError: () => {
      toast.error("An error occured 🚫!");
    },
  });
  return { useAddNewTrans, isPending };
};

export default useAddNewTransaction;
