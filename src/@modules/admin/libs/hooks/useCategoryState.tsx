// libs/hooks/useCategoryState.ts

import { useEffect, useState } from "react";
import { MessageInstance } from "antd/es/message/interface";
import {
  ICategory,
  ICategoryCreateAndUpdate,
  ICategoryResponse,
} from "@/src/@modules/categories/libs/interfaces";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/src/@modules/categories/libs/hooks";

export const useCategoryState = (messageApi?: MessageInstance) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  // ========================================================
  // 1. GET ALL CATEGORIES

  const {
    data,
    isPending: isGetCategoriesPending,
    isError,
    error,
    refetch,
  } = useCategories({});

  useEffect(() => {
    if (data?.success) {
      setCategories(data.data);
    }
  }, [data]);

  // ========================================================
  // 2. CREATE CATEGORY
  // ========================================================

  const {
    mutate: createMutate,
    mutateAsync: createMutateAsync,
    isPending: isCreating,
    variables: createVariables,
  } = useCreateCategory({
    config: {
      onSuccess: (res: ICategoryResponse) => {
        if (!res.success) {
          messageApi?.error(res.message);
          return;
        }
        messageApi?.loading("Category is creating....", 1).then(() => {
          setCategories((prev) => [res.data, ...prev]);

          messageApi?.success(res.message);

          refetch();
        });
      },

      onError: (err: any) => {
        messageApi?.error(err.message);
      },
    },
  });

  // ========================================================
  // 3. UPDATE CATEGORY
  // ========================================================

  const {
    mutate: updateMutate,
    mutateAsync: updateMutateAsync,
    isPending: isUpdating,
    variables: updateVariables,
  } = useUpdateCategory({
    config: {
      onSuccess: (res: ICategoryResponse) => {
        if (!res.success) {
          messageApi?.error(res.message);
          return;
        }
        messageApi?.loading("Category is updating....", 1).then(() => {
          setCategories((prev) =>
            prev.map((category) =>
              category._id === res.data._id ? res.data : category,
            ),
          );

          messageApi?.success(res.message);

          refetch();
        });
      },

      onError: (err: any) => {
        messageApi?.error(err.message);
      },
    },
  });

  // ========================================================
  // 4. DELETE CATEGORY
  // ========================================================

  const {
    mutate: deleteMutate,
    mutateAsync: deleteMutateAsync,
    isPending: isDeleting,
    variables: deleteVariables,
  } = useDeleteCategory({
    config: {
      onSuccess: (res: ICategoryResponse) => {
        if (!res.success) {
          messageApi?.error(res.message);
          return;
        }
        messageApi?.loading("Deleting category...", 1).then((message) => {
          setCategories((prev) =>
            prev.filter((category) => category._id !== res.data._id),
          );

          messageApi?.success(res.message);
        });
        refetch();
      },

      onError: (err: any) => {
        messageApi?.error(err.message);
      },
    },
  });

  // ========================================================
  // METHODS

  const createCategory = (payload: ICategoryCreateAndUpdate) => {
    createMutate(payload);
  };

  const updateCategory = (
    id: string,
    payload: Partial<ICategoryCreateAndUpdate>,
  ) => {
    updateMutate({
      id,
      payload,
    });
  };

  const deleteCategory = (id: string) => {
    deleteMutate(id);
  };

  return {
    categories,

    data,
    refetch,

    createCategory,
    createCategoryAsync: createMutateAsync,

    updateCategory,
    updateCategoryAsync: updateMutateAsync,

    deleteCategory,
    deleteCategoryAsync: deleteMutateAsync,

    isCreating,
    isUpdating,
    isDeleting,
    isGetCategoriesPending,

    createVariables,
    updateVariables,
    deleteVariables,

    isError,
    errorMessage: error instanceof Error ? error.message : "",
  };
};
