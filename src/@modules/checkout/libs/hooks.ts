import { useMutation, useQuery } from "@tanstack/react-query";
import { IDistrictsFilter } from "./interfaces";
import { CheckoutServices } from "./services";
import { MutationConfig } from "@/src/@libs/config/react-query";

interface IDistrictProps {
  options?: IDistrictsFilter[];
}
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
