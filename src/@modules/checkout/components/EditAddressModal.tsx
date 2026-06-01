import BaseModal from "@/src/@base/components/BaseModal";
import cn from "@/src/@libs/utils/_cn";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const addressData = [
  {
    districtId: "1",
    districtName: "Dhaka",
    areaId: "1",
    areaName: "Mirpur",
    contactName: "John Doe",
    phone: "01764078605",
    addressName: "Home",
    address: "Block B, Road 13, Mirpur-13, Dhaka",
    isDefault: true,
  },
  {
    districtId: "2",
    districtName: "Chattogram",
    areaId: "2",
    areaName: "Akbar Shah",
    contactName: "Zenia Barton",
    phone: "01823456788",
    addressName: "Office",
    address: "Akbar Shah, Chattogram",
  },
  {
    districtId: "2",
    districtName: "Chattogram",
    areaId: "2",
    areaName: "Akbar Shah",
    contactName: "Tad Lopez",
    phone: "01333333333",
    addressName: "Other 1",
    address: "Akbar Shah, Chattogram",
  },
  {
    districtId: "1",
    districtName: "Dhaka",
    areaId: "3",
    areaName: "Adabor",
    contactName: "Whilemina Evans",
    phone: "01333333333",
    addressName: "Other 2",
    address: "Adabor, Dhaka",
  },
];
const EditAddressModal: React.FC<IProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={cn(className, "")}>
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
              
              className=""
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addressData.map((addr, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-lg p-4 border ",
                  addr.isDefault
                    ? "border-2 border-(--primary-color-700) bg-(--primary-color-500)"
                    : "border-gray-300 bg-(--secondary-color-500) hover:border-(--primary-color-700)",
                )}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">
                    {addr.addressName}
                  </h3>
                  <div className="w-10 h-6 rounded-full bg-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  {addr.contactName}
                </p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-600">
                  {addr.districtName} - {addr.areaName}
                </p>
                <p className="text-sm text-gray-600">{addr.address}</p>
              </div>
            ))}
          </div>

          <button className="btn-primary w-full border-2 border-dashed border-(--primary-color-700) rounded-lg p-4 text-(--primary-color-700) font-semibold hover:bg-(--primary-color-600)">
            + Add Address
          </button>
        </div>
      </BaseModal>
    </div>
  );
};

export default EditAddressModal;
