import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../Apis/user";

const useSignUpUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: createCustomer,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createNewUser,
    onSuccess: (data) => {
      toast.success("user created successfully 👍");
      queryClient.invalidateQueries({ queryKey: ["currentCustomer"] });
      queryClient.invalidateQueries({ queryKey: ["currentLogCustomer"] });
      navigate("/");

      console.log(data);
    },
    onError: () => {
      toast.error("Error, user not created 🚫");
    },
  });

  return { createCustomer, isPending, isError };
};

export default useSignUpUser;
