import { QueryConfig } from "@/src/@libs/config/react-query";
import { useQuery } from "@tanstack/react-query";
import { IProductFilter } from "./interfaces";
import { ProductsService } from "./services";

type IUseProducts = {
  options?: IProductFilter;
  config?: QueryConfig<typeof ProductsService.find>;
};
export const useProducts = ({ options, }: IUseProducts) => {
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
}