export const bangladeshData = [
    {
        districtName: "Dhaka",
        area: [
            {
                name: "Dhaka",
                subArea: ["Adabor", "Banasree", "Badda"]
            },
            {
                name: "Motijheel",
                subArea: ["Motijheel"]
            }
        ],
        code: "1001"
    },
    {
        districtName: "Chittagong",
        area: [
            {
                name: "Chittagong",
                subArea: ["Bayazid", "Patenga"]
            }
        ],
        code: "2001"
    },
    {
        districtName: "Sylhet",
        area: [
            {
                name: "Sylhet",
                subArea: ["Sylhet Sadar"]
            }
        ],
        code: "3001"
    },
    {
        districtName: "Rajshahi",
        area: [
            {
                name: "Rajshahi",
                subArea: ["Rajshahi Sadar"]
            }
        ],
        code: "4001"
    }
];

export type BangladeshLocation = {
    districtName: string;
    area: {
        name: string;
        subArea: string[];
    }[];
    code: string;
};
