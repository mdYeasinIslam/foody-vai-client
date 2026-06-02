import { MessageInstance } from "antd/es/message/interface";
import { useCreateAddress, useDeleteAddress, useFindAddress } from "../hooks";

export const useAddressState = (messageApi?: MessageInstance) => {
  const { data, isLoading: addressDataLoading, refetch } = useFindAddress();
  const addressData = data?.data;
  const { mutate: createCustomerAddress } = useCreateAddress({
    config: {
      onSuccess: async (data) => {
        if (!data) return;
        messageApi?.loading("Address is adding.....", 1).then(async () => {
          await refetch();
          messageApi?.success("Address added successfully");
        });
      },
      onError: (error) => {
        messageApi?.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      },
    },
  });
  const { mutate: deleteAddress } = useDeleteAddress({
    config: {
      onSuccess: async (data) => {
        if (!data) return;
        messageApi?.loading("Address is deleting.....").then(async () => {
          await refetch();
          messageApi?.success("Address deleted successfully");
        });
      },
    },
  });
  return {
    createCustomerAddress,
    deleteAddress,
    addressData,
    addressDataLoading,
  };
};
