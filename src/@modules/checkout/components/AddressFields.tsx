import { Form, FormInstance, Input, Select } from "antd";
import { IDistrictsAndZillas } from "../libs/interfaces";

type Props = {
  form: FormInstance;
  districtId: number | null;
  setDistrictId: (id: number) => void;
  districtsData: IDistrictsAndZillas[] | undefined;
  areasData: IDistrictsAndZillas[] | undefined;
};

const AddressFields = ({
  form,
  districtId,
  setDistrictId,
  districtsData,
  areasData,
}: Props) => {
  return (
    <>
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
            onChange={(value) => {
              setDistrictId(value);
              form.setFieldValue("areaId", undefined);
            }}
            // loading={isLoading && isPending}
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
                    label: area?.name,
                    value: area?.id,
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
    </>
  );
};

export default AddressFields;
