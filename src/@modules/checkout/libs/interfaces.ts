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
