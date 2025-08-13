import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../../Apis/transactions";
import toast from "react-hot-toast";

const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  const { mutate: useDeleteItemTransaction, isPending } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTransactions"] });
      toast.success("Document deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete!");
    },
  });
  return { useDeleteItemTransaction, isPending };
};
export default useDeleteTransaction;
