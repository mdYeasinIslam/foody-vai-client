import { MessageInstance } from "antd/es/message/interface";
import {
  useCreateAddress,
  useDeleteAddress,
  useFindAddress,
  useUpdateAddress,
  useUpdateAddressSetDefault,
} from "../hooks";

export const useAddressState = (messageApi?: MessageInstance) => {
  const { data, isLoading: addressDataLoading, refetch } = useFindAddress();
  const addressData = data?.data;
  const { mutate: createCustomerAddressMutate } = useCreateAddress({
    config: {
      onSuccess: async (data) => {
        if (!data) return;
        messageApi?.loading("Address is adding.....", 1).then(async () => {
          await refetch();
          messageApi?.success("Address added successfully");
        });
      },
      onError: (error) => {
        console.log(error);
        messageApi?.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      },
    },
  });
  const { mutate: updateAddressMutate } = useUpdateAddress({
    config: {
      onSuccess: async (data) => {
        if (!data) return;
        messageApi?.loading("Address is updating.....").then(async () => {
          await refetch();
          messageApi?.success("Address updated successfully");
        });
      },
      onError: (error) => {
        console.log(error);
        messageApi?.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      },
    },
  });
  const { mutate: updateAddressSetDefaultMutate } = useUpdateAddressSetDefault({
    config: {
      onSuccess: async (data) => {
        if (!data) return;
        messageApi?.loading("Address is updating.....").then(async () => {
          await refetch();
          messageApi?.success("Address updated successfully");
        });
      },
      onError: (error) => {
        console.log(error);
        messageApi?.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      },
    },
  });
  const { mutate: deleteAddressMutate } = useDeleteAddress({
    config: {
      onSuccess: async (data) => {
        if (!data) return;
        messageApi?.loading("Address is deleting.....").then(async () => {
          await refetch();
          messageApi?.success("Address deleted successfully");
        });
      },
      onError: (error) => {
        console.log(error);
        messageApi?.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      },
    },
  });
  return {
    createCustomerAddressMutate,
    deleteAddressMutate,
    updateAddressMutate,
    updateAddressSetDefaultMutate,
    addressData,
    addressDataLoading,
  };
};
