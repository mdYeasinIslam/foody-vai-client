import { MessageInstance } from "antd/es/message/interface";
import { useCreateAddress, useFindAddress } from "../hooks";

export const useAddressState = (messageApi?: MessageInstance) => {
  const { mutate: createCustomerAddress } = useCreateAddress({
    config: {
      onSuccess: (data) => {
        if (!data) return;
        messageApi?.loading("Address is adding.....", 1).then(() => {
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

  const { data, isLoading: addressDataLoading } = useFindAddress()
  const addressData = data?.data;


  return {
    createCustomerAddress,
    addressData,
    addressDataLoading
  };
};
