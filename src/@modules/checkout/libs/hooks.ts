import { useQuery } from "@tanstack/react-query"
import { IDistrictsFilter } from "./interfaces"
import { CheckoutServices } from "./services"

interface IDistrictProps{
options?:IDistrictsFilter[]
}
export const useCountries = () => {
    return useQuery({
        queryKey: ["countries"],
        queryFn: () => CheckoutServices.findDistrict()
    })
}
export const useAreas = (id:number) => {
    return useQuery({
        queryKey: ["areas"],
        queryFn: () => CheckoutServices.findAreas(id)
    })
}