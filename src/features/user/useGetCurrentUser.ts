import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedInUse, getCurrentLoggedInUser } from "../../Apis/user";

export const useGetCurrentUser = () => {
  const { data: currentCustomerData = {}, isLoading } = useQuery<any>({
    queryFn: getCurrentLoggedInUser,
    queryKey: ["currentLogCustomer"],
  });
  const { emailVerified, uid } = currentCustomerData;

  return { uid, emailVerified, isLoading };
};

export const getUser = () => {
  const { uid, emailVerified } = useGetCurrentUser();

  const { data = [], isLoading } = useQuery({
    queryFn: () => getCurrentLoggedInUse({ id: uid }),
    queryKey: ["currentCustomer"],
    enabled: !!uid,
  });

  return { data, emailVerified, isLoading, uid };
};
