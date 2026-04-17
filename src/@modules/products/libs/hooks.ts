import { QueryConfig } from "@/src/@libs/config/react-query";
import { IProductFilter } from "./interfaces";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "./services";

type IUseProducts = {
  options?: IProductFilter;
  config?: QueryConfig<typeof ProductsService.find>;
};
export const useProducts = ({ options, config }: IUseProducts) => {
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
}