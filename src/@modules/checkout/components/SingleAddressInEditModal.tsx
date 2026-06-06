import cn from "@/src/@libs/utils/_cn";
import { Form, Popconfirm, Switch } from "antd";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ClassNameValue } from "tailwind-merge";
import { ICustomerAddress } from "../libs/interfaces";
import BaseForm from "@/src/@base/components/BaseForm";
import AddressFields from "./AddressFields";
import BaseModal from "@/src/@base/components/BaseModal";
import { useDistrictAndArea } from "../libs/hook/useDistrictAndArea";
interface IProps {
  className?: ClassNameValue;
  address: ICustomerAddress;
  handleDeleteFn: (id: string) => void;
  handleUpdateAddressFn: (address: ICustomerAddress) => void;
  onChangeSetDefaultFn: (checked: boolean, address: ICustomerAddress) => void;
}
const SingleAddressInEditModal: React.FC<IProps> = ({
  className,
  address,
  handleDeleteFn,
  handleUpdateAddressFn,
  onChangeSetDefaultFn,
}) => {
  const [form] = Form.useForm();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [districtId, setDistrictId] = useState<number | null>(
    address?.districtId ? Number(address.districtId) : null,
  );
  const { districtsData, areasData } = useDistrictAndArea(districtId);
  // console.log(areasData);
  return (
    <>
      <div
        className={cn(
          className,
          "rounded-lg p-4 border  ",
          address.isDefault
            ? "border-2 border-(--primary-color-700) bg-(--primary-color-500)"
            : "border-gray-300 bg-(--secondary-color-500) hover:border-(--primary-color-700)",
        )}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-900 capitalize">
            {address.addressName}
          </h3>
          <div className="flex items-center gap-2">
            <Switch
              defaultChecked={address.isDefault}
              value={address.isDefault}
              onChange={(e) => onChangeSetDefaultFn(e, address)}
              size={"middle"}
              className={cn("bg-(--secondary-color-800)!", {
                "bg-(--primary-color-900)!": address.isDefault,
              })}
            />
            <p>{address.isDefault ? "Default" : "Set as Default"}</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800 capitalize mb-1">
          {address.contactName}
        </p>
        <p className="text-sm text-gray-600">{address.phone}</p>
        <p className="text-sm text-gray-600">{address.address}</p>
        <p className="text-sm text-gray-600">{address.areaName}</p>
        <p>{address.districtName} </p>
        <div className="flex items-center justify-end gap-2">
          <Popconfirm
            title="Delete the address"
            description="Are you sure to delete this address?"
            onConfirm={() => handleDeleteFn(address?._id)}
            okText="Yes"
            cancelText="No"
          >
            <div className="bg-red-600 hover:bg-red-700 p-1 rounded-full cursor-pointer">
              <MdDelete
                color="white"
                className="w-4 h-4 md:w-4 md:h-4 cursor-pointer"
              />
            </div>
          </Popconfirm>

          <div
            onClick={() => {
              setIsUpdateModalOpen(true);
            }}
            className="bg-(--primary-color-900) hover:bg-(--primary-color-800) p-1 rounded-full cursor-pointer"
          >
            <FaPencilAlt
              color="white"
              className="w-4 h-4 md:w-4 md:h-4 cursor-pointer "
            />
          </div>
        </div>
      </div>
      <BaseModal
        title="Update Address Information"
        open={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        onOk={() => setIsUpdateModalOpen(false)}
        style={{ top: 15, bottom: 20 }}
        className="w-screen! xl:w-[50vw]! mb-10!"
      >
        <BaseForm
          form={form}
          initialValues={address}
          submitText="Update Address"
          // loading={isUpdating}
          onFinish={(values) => {
            handleUpdateAddressFn({
              ...values,
              _id: address._id,
            });
          }}
        >
          <AddressFields
            form={form}
            districtId={address?.districtId ? Number(address.districtId) : null}
            setDistrictId={setDistrictId}
            districtsData={districtsData}
            areasData={areasData}
          />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SingleAddressInEditModal;
