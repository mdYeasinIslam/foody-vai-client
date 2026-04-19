import { QueryConfig } from "@/src/@libs/config/react-query";
import { useQuery } from "@tanstack/react-query";
import { CartService } from "./services";
import { ICartItemFilter } from "./interfaces";

type IUseCarts = {
  options?: ICartItemFilter;
  config?: QueryConfig<typeof CartService.find>;
};
export const useCarts = ({ config }: IUseCarts) => {
  return useQuery({
    ...config,
    queryKey: ["cart"],
    queryFn: () => CartService.find(),
  });
};

type IUseCart = {
  id: string;
  config: QueryConfig<typeof CartService.findById>;
};
export const useCart = ({ id, config }: IUseCart) => {
  return useQuery({
    ...config,
    queryKey: ["cart", id],
    queryFn: () => CartService.findById(id),
  });
};
