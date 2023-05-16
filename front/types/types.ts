export interface ProductType {
    title?: string;
    description?: string | undefined;
    price?: number;
    _id?: number;
    images?: string[];
    category?: string | "";
    properties?: PropertyType;
}

export type PropertyType = {
    name?: string;
    values?: string;
};

export interface ClientData {
    name: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}
