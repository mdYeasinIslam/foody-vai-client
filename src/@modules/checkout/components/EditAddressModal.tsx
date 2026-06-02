import BaseModal from "@/src/@base/components/BaseModal";
import cn from "@/src/@libs/utils/_cn";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ClassNameValue } from "tailwind-merge";
import { useAddressState } from "../libs/hook/useAddressState";
import { message, Popconfirm, Switch } from "antd";
import BaseSkeleton from "@/src/@base/components/BaseSkeleton";
import BaseButton from "@/src/@base/components/BaseButton";
import { MdDelete } from "react-icons/md";
interface IProps {
  className?: ClassNameValue;
  handleAddNew: () => void;
}
const EditAddressModal: React.FC<IProps> = ({ className, handleAddNew }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addressData, addressDataLoading, deleteAddress } =
    useAddressState(messageApi);
  console.log(addressData);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const handleDeleteFn = (id: string) => {
    deleteAddress(id);
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
                <div
                  key={idx}
                  className={cn(
                    "rounded-lg p-4 border cursor-pointer",
                    addr.isDefault
                      ? "border-2 border-(--primary-color-700) bg-(--primary-color-500)"
                      : "border-gray-300 bg-(--secondary-color-500) hover:border-(--primary-color-700)",
                  )}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {addr.addressName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Switch
                        defaultChecked={addr.isDefault}
                        onChange={onChange}
                        size={"middle"}
                        className={cn("", {
                          "bg-(--primary-color-900)!": addr.isDefault,
                        })}
                      />
                      <p>{addr.isDefault ? "Default" : "Set as Default"}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 capitalize mb-1">
                    {addr.contactName}
                  </p>
                  <p className="text-sm text-gray-600">{addr.phone}</p>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                  <p className="text-sm text-gray-600">{addr.areaName}</p>
                  <p>{addr.districtName} </p>
                  <div className="flex items-center justify-end gap-2">
                    <Popconfirm
                      title="Delete the address"
                      description="Are you sure to delete this address?"
                      onConfirm={() => handleDeleteFn(addr?._id)}
                      // onCancel={()=>messageApi.error('')}
                      okText="Yes"
                      cancelText="No"
                    >
                      <div
                        // onClick={() => handleDeleteFn(addr?._id)}
                        className="bg-red-600 hover:bg-red-700 p-1 rounded-full cursor-pointer"
                      >
                        <MdDelete
                          color="white"
                          className="w-4 h-4 md:w-4 md:h-4 cursor-pointer"
                        />
                      </div>
                    </Popconfirm>
                    <div
                      // onClick={() => setIsModalOpen(true)}
                      className="bg-(--primary-color-900) hover:bg-(--primary-color-800) p-1 rounded-full cursor-pointer"
                    >
                      <FaPencilAlt
                        color="white"
                        className="w-4 h-4 md:w-4 md:h-4 cursor-pointer "
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <div onClick={handleOpenModal}>add</div> */}
          <BaseButton onClick={handleAddNew} content="+ Add Address" />
        </div>
      </BaseModal>
    </div>
  );
};

export default EditAddressModal;
