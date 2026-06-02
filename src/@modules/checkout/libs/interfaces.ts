export interface IDistrictsFilter {
  division_id?: string;
  name?: string;
  bn_name?: string;
}
export interface IUpZillasFilter {
  id?: string;
  name?: string;
  bn_name?: string;
}
export interface IDistrictsAndZillas {
  id: string;
  division_id?: string;
  name: string;
  bn_name: string;
  lat?: string;
  lon?: string;
  url: string;
}
export interface IDistrictsAndZillasResponse {
  data: IDistrictsAndZillas[];
  success: boolean;
  message: string;
  count: number;
}
export interface ICustomerAddressUpdateDefault {
    _id:string
    isDefault: boolean;
  };
//customer address type
export interface ICustomerAddressFilter {
  districtId?: string;
  areaId?: string;
  contactName?: string;
  phone?: string;
  addressName?: string;
}
export interface ICustomerAddress {
  _id: string;
  districtId: string;
  districtName?: string;
  areaId: string;
  areaName?: string;
  contactName: string;
  phone: string;
  addressName: string;
  address: string;
  isDefault: boolean;
}
export interface ICustomerAddressCreate {
 
  districtId: string;
  districtName?: string;
  areaId: string;
  areaName?: string;
  contactName: string;
  phone: string;
  addressName: string;
  address: string;
}

export interface ICustomerAddressResponse {
  data: ICustomerAddress;
  success: boolean;
  message: string;
}

export interface ICustomerAddressesResponse {
  data: ICustomerAddress[];
  success: boolean;
  message: string;
  count: number;
}
