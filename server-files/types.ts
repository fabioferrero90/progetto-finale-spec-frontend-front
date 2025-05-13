export type tables = {
    title: string;
    reviews: number;
    rating: 1 | 2 | 3 | 4 | 5 ;
    description: string;
    category: string;
    price: number;
    seats: number;
    material: string;
    extendable: "Si" | "No";
    length: number;
    width: number;
    image: string;
};

export type sofas = {
    title: string;
    reviews: number;
    rating: 1 | 2 | 3 | 4 | 5 ;
    description: string;
    category: string;
    price: number;
    seats: number;
    material: string;
    color: string;
    reclinabile: "Si" | "No";
    washableCover: "Si" | "No";
    image: string;
};

export type beds = {
    title: string;
    reviews: number;
    rating: 1 | 2 | 3 | 4 | 5 ;
    description: string;
    category: string;
    price: number;
    size: string;
    material: string;
    color: string;
    height: number;
    storageIncluded: "Si" | "No";
    image: string;
}