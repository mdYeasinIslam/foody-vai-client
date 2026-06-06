import BaseButton from "@/src/@base/components/BaseButton";
import BaseModal from "@/src/@base/components/BaseModal";
import BaseSkeleton from "@/src/@base/components/BaseSkeleton";
import cn from "@/src/@libs/utils/_cn";
import { message } from "antd";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ClassNameValue } from "tailwind-merge";
import { useAddressState } from "../libs/hook/useAddressState";
import { ICustomerAddress } from "../libs/interfaces";
import SingleAddressInEditModal from "./SingleAddressInEditModal";
interface IProps {
  className?: ClassNameValue;
  handleAddNew: () => void;
}
const EditAddressModal: React.FC<IProps> = ({ className, handleAddNew }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    addressData,
    addressDataLoading,
    deleteAddressMutate,
    updateAddressMutate,
    updateAddressSetDefaultMutate,
  } = useAddressState(messageApi);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeSetDefaultFn = (
    checked: boolean,
    address: ICustomerAddress,
  ) => {
    if (address.isDefault === true) return;
    const payload = {
      _id: address._id,
      isDefault: checked,
    };
    updateAddressSetDefaultMutate(payload);
  };
  const handleUpdateAddressFn = (address: ICustomerAddress) => {
    updateAddressMutate(address);
    
  };
  const handleDeleteFn = (id: string) => {
    deleteAddressMutate(id);
  };
  return (
    <div className={cn(className, "")}>
      {contextHolder}
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-(--primary-color-900) hover:bg-(--primary-color-700) p-2 rounded-full cursor-pointer"
      >
        <FaPencilAlt color="white" className="w-3 h-3 md:w-4 md:h-4 " />
      </div>
      <BaseModal
        title="Add New Address"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCancel}
        style={{ top: 15, bottom: 20 }}
        className="w-screen! xl:w-[50vw]! mb-10!"
      >
        <div className="space-y-4">
          {addressDataLoading ? (
            <>
              <BaseSkeleton rowNumber={4} />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addressData?.map((addr, idx) => (
                <SingleAddressInEditModal
                  key={idx}
                  address={addr}
                  handleDeleteFn={handleDeleteFn}
                  handleUpdateAddressFn={handleUpdateAddressFn}
                  onChangeSetDefaultFn={onChangeSetDefaultFn}
                />
              ))}
            </div>
          )}
          <BaseButton onClick={handleAddNew} content="+ Add Address" />
        </div>
      </BaseModal>
      
    </div>
  );
};

export default EditAddressModal;
