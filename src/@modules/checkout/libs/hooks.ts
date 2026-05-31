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
  config?: MutationConfig<typeof CheckoutServices.create>;
};
export const useCreateAddress = ({
  config,
}: ICreateCustomerAddressProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: CheckoutServices.create,
  });
};
// find address
export const useFindAddress = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: () => CheckoutServices.findAddress(),
  });
};
//delete address
export const useDeleteAddress = () => {
  return useMutation({
    mutationFn: CheckoutServices.deleteOne,
  });
};
//delete all address 
export const useDeleteAddresses = () => {
  return useMutation({
    mutationFn: CheckoutServices.deleteAll,
  });

}

