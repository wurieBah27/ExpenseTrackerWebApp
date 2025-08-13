import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newCategory } from "../../Apis/categories";
import toast from "react-hot-toast";

const useAddNewCategory = () => {
  const querClient = useQueryClient();

  const { mutate: addnewCategory, isPending } = useMutation({
    mutationFn: newCategory,
    onSuccess: () => {
      toast.success("Category added successfully!");
      querClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("An Error occured! Please try again");
    },
  });
  return { addnewCategory, isPending };
};

export default useAddNewCategory;
