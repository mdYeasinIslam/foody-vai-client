import { useAreas, useDistricts } from "../hooks";

export const useDistrictAndArea = (districtId?: number) => {
    const { data, isLoading, isPending } = useDistricts();
    const { data: areaData } = useAreas(districtId || 1);

    const districtsData = data?.data;
    const areasData = areaData?.data;

    return {
        districtsData,
        areasData,
        isLoading,
        isPending,
    };
};