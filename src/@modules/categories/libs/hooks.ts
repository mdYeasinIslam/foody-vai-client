import { MutationConfig, QueryConfig } from "@/src/@libs/config/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICategoryCreateAndUpdate, ICategoryFilter } from "./interfaces";
import { CategoriesService } from "./services";

type IUseCategories = {
  options?: ICategoryFilter;
  config?: QueryConfig<typeof CategoriesService.find>;
};
export const useCategories = ({ config, options }: IUseCategories = {}) => {
  return useQuery({
    ...config,
    queryKey: ["Categories"],
    queryFn: () => CategoriesService.find(options),
  });
};

type IUseCategory = {
  id: string;
  config: QueryConfig<typeof CategoriesService.findById>;
};
export const useCategory = ({ id, config }: IUseCategory) => {
  return useQuery({
    ...config,
    queryKey: ["Category", id],
    queryFn: () => CategoriesService.findById(id),
  });
};

type ICreateCategoryProps = {
  config?: MutationConfig<typeof CategoriesService.create>;
};
export const useCreateCategory = ({ config }: ICreateCategoryProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: CategoriesService.create,
  });
};

type IUpdateCategoryProps = {
  config?: MutationConfig<
    (variables: {
      id: string;
      payload: Partial<ICategoryCreateAndUpdate>;
    }) => ReturnType<typeof CategoriesService.update>
  >;
};
export const useUpdateCategory = ({ config }: IUpdateCategoryProps = {}) => {
  type UpdateCategoryVariables = {
    id: string;
    payload: Partial<ICategoryCreateAndUpdate>;
  };

  return useMutation({
    ...config,
    mutationFn: ({ id, payload }: UpdateCategoryVariables) =>
      CategoriesService.update(id, payload),
  });
};

type IDeleteCategoryProps = {
  config?: MutationConfig<typeof CategoriesService.delete>;
};
export const useDeleteCategory = ({ config }: IDeleteCategoryProps = {}) => {
  return useMutation({
    ...config,
    mutationFn: CategoriesService.delete,
  });
};
