import { MutationConfig } from "@/src/@libs/config/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckoutServices } from "./services";


export const useDistricts = () => {
  return useQuery({
    queryKey: ["districts"],
    queryFn: () => CheckoutServices.findDistrict(),
  });
};
export const useAreas = (id: number) => {
  return useQuery({
    queryKey: ["areas", id],
    queryFn: () => CheckoutServices.findAreas(id),
  });
};
// -------------hooks for address related services--------------------
type ICreateCustomerAddressProps = {
  config?: MutationConfig<typeof CheckoutServices.createCustomerAddress>;
};
export const useCreateCustomerAddress = ({
  config,
}: ICreateCustomerAddressProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: CheckoutServices.createCustomerAddress,
  });
};
