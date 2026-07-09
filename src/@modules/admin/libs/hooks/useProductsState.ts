// libs/hooks/useProductsState.ts

import { useEffect, useState } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { IProduct, IProductCreateAndUpdate, IProductResponse } from "@/src/@modules/products/libs/interfaces";
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from "@/src/@modules/products/libs/hooks";

export const useProductsState = (messageApi?: MessageInstance) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  // ========================================================
  // 1. GET ALL PRODUCTS
  // ========================================================

  const {
    data,
    isPending: isGetProductsPending,
    isError,
    error,
    refetch,
  } = useProducts({});

  useEffect(() => {
    if (data?.success) {
      setProducts(data.data);
    }
  }, [data]);

  // ========================================================
  // 2. CREATE PRODUCT
  // ========================================================

  const {
    mutate: createMutate,
    mutateAsync: createMutateAsync,
    isPending: isCreating,
    variables: createVariables,
  } = useCreateProduct({
    config: {
      onSuccess: (res: IProductResponse) => {
        if (!res.success) {
          messageApi?.error(res.message);
          return;
        }

        setProducts((prev) => [res.data, ...prev]);

        messageApi?.success(res.message);

        refetch();
      },

      onError: (err: any) => {
        messageApi?.error(err.message);
      },
    },
  });

  // ========================================================
  // 3. UPDATE PRODUCT
  // ========================================================

  const {
    mutate: updateMutate,
    mutateAsync: updateMutateAsync,
    isPending: isUpdating,
    variables: updateVariables,
  } = useUpdateProduct({
    config: {
      onSuccess: (res: IProductResponse) => {
        if (!res.success) {
          messageApi?.error(res.message);
          return;
        }

        setProducts((prev) =>
          prev.map((product) =>
            product._id === res.data._id ? res.data : product,
          ),
        );

        messageApi?.success(res.message);

        refetch();
      },

      onError: (err: any) => {
        messageApi?.error(err.message);
      },
    },
  });

  // ========================================================
  // 4. DELETE PRODUCT
  // ========================================================

  const {
    mutate: deleteMutate,
    mutateAsync: deleteMutateAsync,
    isPending: isDeleting,
    variables: deleteVariables,
  } = useDeleteProduct({
    config: {
      onSuccess: (res: IProductResponse) => {
        if (!res.success) {
          messageApi?.error(res.message);
          return;
        }

        setProducts((prev) =>
          prev.filter((product) => product._id !== res.data._id),
        );

        messageApi?.success(res.message);

        refetch();
      },

      onError: (err: any) => {
        messageApi?.error(err.message);
      },
    },
  });

  // ========================================================
  // METHODS
  // ========================================================

  const createProduct = (payload: IProductCreateAndUpdate) => {
    createMutate(payload);
  };

  const updateProduct = (id: string, payload: Partial<IProductCreateAndUpdate>) => {
    updateMutate({
      id,
      payload,
    });
  };

  const deleteProduct = (id: string) => {
    deleteMutate(id);
  };

  return {
    products,

    data,
    refetch,

    createProduct,
    createProductAsync: createMutateAsync,

    updateProduct,
    updateProductAsync: updateMutateAsync,

    deleteProduct,
    deleteProductAsync: deleteMutateAsync,

    isCreating,
    isUpdating,
    isDeleting,
    isGetProductsPending,

    createVariables,
    updateVariables,
    deleteVariables,

    isError,
    errorMessage: error instanceof Error ? error.message : "",
  };
};
