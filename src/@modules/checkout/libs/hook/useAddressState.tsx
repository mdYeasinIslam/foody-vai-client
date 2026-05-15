import { message } from "antd";
import { useCreateCustomerAddress } from "../hooks";


export const useAddressState = () => {
  const [messageApi, contextHolder] = message.useMessage();
    const { mutate: createCustomerAddress } = useCreateCustomerAddress({
        config: {
            onSuccess: (data) => {
                if (data.success) {
                 messageApi.success('Address added successfully')
                }
                messageApi.error(data.message);
            },
            onError: (error) => {
                messageApi.error(error.message);
                console.log(error);
            }
        }
    });

    // Add other address-related hooks/queries here
    // const { data: addresses } = useGetCustomerAddresses();
    // const { mutate: updateAddress } = useUpdateCustomerAddress();
    // const { mutate: deleteAddress } = useDeleteCustomerAddress();

    return {
      createCustomerAddress,
      contextHolder,
      // Add other operations here
    };
};
