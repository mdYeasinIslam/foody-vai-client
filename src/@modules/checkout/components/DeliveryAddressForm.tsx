import BaseForm from "@/src/@base/components/BaseForm";
import BaseModal from "@/src/@base/components/BaseModal";
import BaseSkeleton from "@/src/@base/components/BaseSkeleton";
import { Form, message } from "antd";
import { useState } from "react";
import { useAddressState } from "../libs/hook/useAddressState";
import { useDistrictAndArea } from "../libs/hook/useDistrictAndArea";
import AddressFields from "./AddressFields";
import EditAddressModal from "./EditAddressModal";
import ShowAddress from "./ShowAddress";

const DeliveryAddressForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [districtId, setDistrictId] = useState<number | null>(null);
  const { districtsData, areasData } = useDistrictAndArea(districtId);
  const { addressData, addressDataLoading, createCustomerAddressMutate } =
    useAddressState(messageApi);

  const defaultAddress = addressData?.filter(
    (address) => address.isDefault === true,
  );
  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleSubmit = (values: any) => {
    try {
      const district = districtsData?.find((d) => d.id === values.districtId);

      const area = areasData?.find((a) => a.id === values.areaId);
      const payload = {
        ...values,
        districtName: district?.name,
        areaName: area?.name,
      };
      createCustomerAddressMutate(payload);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
      messageApi.error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };
  return (
    <>
      {contextHolder}
      <div className="border border-(--primary-color-500) rounded-lg ">
        <div className="flex justify-between items-center bg-(--primary-color-600) px-2 py-1  md:px-4 md:py-2">
          <h3 className="text-base font-semibold ">Delivery address</h3>
          <button
            onClick={handleAddNew}
            className="btn-primary text-sm font-semibold cursor-pointer border hover:border-(--primary-color-900) border-(--primary-color-700) rounded-sm px-2! py-0.5!"
          >
            + Add new
          </button>
        </div>
        {addressDataLoading && <BaseSkeleton isAvatar={true} />}
        {addressData && addressData?.length <= 0 && (
          <>
            <p className="text-gray-500  px-4 py-2">No address found.</p>
          </>
        )}
        <div className="flex items-center justify-between px-2 py-1  md:px-4 md:py-2">
          <div>
            {defaultAddress &&
              defaultAddress?.length > 0 &&
              defaultAddress?.map((address, idx) => (
                <ShowAddress key={idx} address={address} className="" />
              ))}
          </div>
          <>
            <EditAddressModal handleAddNew={handleAddNew} />
          </>
        </div>
      </div>
      <BaseModal
        title="Add New Address"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <BaseForm
          form={form}
          submitText="+ Add Address"
          onFinish={(values) => {
            handleSubmit(values);
          }}
        >
          <AddressFields
            form={form}
            districtId={districtId}
            setDistrictId={setDistrictId}
            districtsData={districtsData}
            areasData={areasData}
          />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default DeliveryAddressForm;
