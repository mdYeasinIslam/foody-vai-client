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
    enabled: !!id,
  });
};
// -------------hooks for address related services--------------------
type ICustomerAddressCreate = {
  config?: MutationConfig<typeof CheckoutServices.create>;
};
export const useCreateAddress = ({ config }: ICustomerAddressCreate = {}) => {
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
//update address
type ICustomerAddressUpdate = {
  config?: MutationConfig<typeof CheckoutServices.update>;
};
export const useUpdateAddress = ({ config }: ICustomerAddressUpdate = {}) => {
  return useMutation({
    ...config,
    mutationFn: CheckoutServices.update,
  });
};
//update address (set default address)
type ICustomerAddressUpdateDefault = {
  config?: MutationConfig<typeof CheckoutServices.updateSetDefault>;
};
export const useUpdateAddressSetDefault = ({ config }: ICustomerAddressUpdateDefault = {}) => {
  return useMutation({
    ...config,
    mutationFn: CheckoutServices.updateSetDefault,
  });
};
//delete single address
type ICustomerAddressDelete = {
  config?: MutationConfig<typeof CheckoutServices.deleteOne>;
};
export const useDeleteAddress = ({ config }: ICustomerAddressDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: CheckoutServices.deleteOne,
  });
};
//delete all address
type ICustomerAddressesDelete = {
  config?: MutationConfig<typeof CheckoutServices.deleteAll>;
};
export const useDeleteAddresses = ({
  config,
}: ICustomerAddressesDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: CheckoutServices.deleteAll,
  });
};
