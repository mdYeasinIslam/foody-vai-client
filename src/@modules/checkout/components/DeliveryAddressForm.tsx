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
  const { districtsData, areasData, } =
    useDistrictAndArea(districtId);
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
            className=" text-sm font-semibold cursor-pointer border hover:border-(--primary-color-900) border-(--primary-color-700) rounded-sm px-2"
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
        {/* <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="District"
              name="districtId"
              rules={[{ required: true, message: "Please select district" }]}
            >
              <Select
                placeholder="Type or select district"
                options={districtsData?.map((district) => ({
                  label: district?.name,
                  value: district.id,
                }))}
                onChange={(e) => setDistrictId(e)}
                loading={isLoading && isPending}
              />
            </Form.Item>

            <Form.Item
              label="Area"
              name="areaId"
              rules={[{ required: true, message: "Please select area" }]}
            >
              <Select
                placeholder="Select area first"
                options={
                  districtId
                    ? areasData?.map((area) => ({
                        label: area.name,
                        value: area.id,
                      }))
                    : []
                }
                disabled={!districtId}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Contact Name"
              name="contactName"
              rules={[{ required: true, message: "Please enter contact name" }]}
            >
              <Input placeholder="Enter contact person name" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>
          </div>

          <Form.Item
            label="Address Name"
            name="addressName"
            rules={[{ required: true, message: "Please select address name" }]}
          >
            <Select
              placeholder="Select address type"
              options={[
                { label: "Home", value: "home" },
                { label: "Office", value: "office" },
                { label: "Other", value: "other" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input.TextArea
              placeholder="i.e. House 12, Road 3, Block E, Uttara"
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <BaseButton content="+ Add Address" />
          </Form.Item>
        </Form> */}
      </BaseModal>
    </>
  );
};

export default DeliveryAddressForm;
