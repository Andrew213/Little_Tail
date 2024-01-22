export type specT = {
    id: string;
    name: string;
    type: string;
};

export type PetT = {
    age: number;
    height: number | null;
    heightUnit?: string;
    _id: string;
    name: string;
    spec: specT;
    weight: number | null;
    weightUnit?: string;
    specId: number;
};
