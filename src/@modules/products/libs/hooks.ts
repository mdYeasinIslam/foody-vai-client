import { MutationConfig, QueryConfig } from "@/src/@libs/config/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IProductCreateAndUpdate, IProductFilter } from "./interfaces";
import { ProductsService } from "./services";

type IUseProducts = {
  options?: IProductFilter;
  config?: QueryConfig<typeof ProductsService.find>;
};
export const useProducts = ({ config }: IUseProducts = {}) => {
  return useQuery({
    ...config,
    queryKey: ["products"],
    queryFn: () => ProductsService.find(),
  });
};

type IUseProduct = {
  id: string;
  config: QueryConfig<typeof ProductsService.findById>;
};
export const useProduct = ({ id, config }: IUseProduct) => {
  return useQuery({
    ...config,
    queryKey: ["product", id],
    queryFn: () => ProductsService.findById(id),
  });
};

type ICreateProductProps = {
  config?: MutationConfig<typeof ProductsService.create>;
};
export const useCreateProduct = ({ config }: ICreateProductProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductsService.create,
  });
};

type IUpdateProductProps = {
  config?: MutationConfig<
    (variables: {
      id: string;
      payload: Partial<IProductCreateAndUpdate>;
    }) => ReturnType<typeof ProductsService.update>
  >;
};
export const useUpdateProduct = ({ config }: IUpdateProductProps = {}) => {
  type UpdateProductVariables = {
    id: string;
    payload: Partial<IProductCreateAndUpdate>;
  };

  return useMutation({
    ...config,
    mutationFn: ({ id, payload }: UpdateProductVariables) =>
      ProductsService.update(id, payload),
  });
};

type IDeleteProductProps = {
  config?: MutationConfig<typeof ProductsService.delete>;
};
export const useDeleteProduct = ({ config }: IDeleteProductProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductsService.delete,
  });
};
