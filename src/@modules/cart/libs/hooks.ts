import { MutationConfig, QueryConfig } from "@/src/@libs/config/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CartService } from "./services";
import { ICartItemFilter } from "./interfaces";

type IUseCarts = {
  options?: ICartItemFilter;
  config?: QueryConfig<typeof CartService.find>;
};
export const useCartProducts = ({ config }: IUseCarts) => {
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
export const useCartProduct = ({ id, config }: IUseCart) => {
  return useQuery({
    ...config,
    queryKey: ["cart", id],
    queryFn: () => CartService.findById(id),
  });
};

// add product to the cart
type ICreateCartProductProps = {
  config?: MutationConfig<typeof CartService.create>;
};
export const useCreateCartProduct = ({
  config,
}: ICreateCartProductProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: CartService.create,
  });
};

//update car item quantity
type IUpdateCartProductProps = {
  id: string;
  config?: MutationConfig<typeof CartService.update>;
};
export const useUpdateCartProduct = ({
  id,
  config,
}: IUpdateCartProductProps) => {
  return useMutation({
    ...config,
    mutationFn: (payload: any) => CartService.update(id, payload),
  });
};
//delete cart item
export const useDeleteCartProduct = (id: string) => {
  return useMutation({
    mutationFn: () => CartService.delete(id),
  });
};
