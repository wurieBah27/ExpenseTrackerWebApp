import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../Apis/categories";
import { useSearchParams } from "react-router-dom";
import { useGetCurrentUser } from "../user/useGetCurrentUser";

const useGetAllCategories = () => {
  const [searchParams] = useSearchParams();
  const { uid } = useGetCurrentUser();

  const categoryValue = searchParams.get("category") || "Expense";

  const { data: categories, isLoading } = useQuery({
    queryFn: () => getAllCategories({ category: categoryValue, id: uid }),
    queryKey: ["categories", categoryValue, uid],
    enabled: !!uid,
  });
  return { categories, isLoading };
};

export default useGetAllCategories;
