import { QueryConfig } from "@/src/@libs/config/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IProductCreateAndUpdate, IProductFilter } from "./interfaces";
import { ProductsService } from "./services";

type IUseProducts = {
  options?: IProductFilter;
  config?: QueryConfig<typeof ProductsService.find>;
};
export const useProducts = ({ options }: IUseProducts) => {
  return useQuery({
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
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProductsService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IProductCreateAndUpdate>;
    }) => ProductsService.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProductsService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};