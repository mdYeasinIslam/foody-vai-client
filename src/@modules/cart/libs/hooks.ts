import { MutationConfig, QueryConfig } from "@/src/@libs/config/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICartItemFilter } from "./interfaces";
import { CartService } from "./services";

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
  config?: MutationConfig<typeof CartService.update>;
};
export const useUpdateCartProduct = ({ config }: IUpdateCartProductProps) => {
  return useMutation({
    ...config,
    mutationFn: CartService.update,
  });
};

//delete cart item
type IDeleteCartProductProps = {
  config?: MutationConfig<typeof CartService.delete>;
};
export const useDeleteCartProduct = ({config}:IDeleteCartProductProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: CartService.delete,
  });
};
type IDeleteAllCartProductsProps = {
  config?: MutationConfig<typeof CartService.deleteAll>;
};
export const useDeleteAllCartProducts = ({ config }: IDeleteAllCartProductsProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: CartService.deleteAll,
  });
};