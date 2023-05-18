export interface ProductSchemaType {
    _id: string;
    title: string;
    description?: string;
    price: number;
    images?: string[];
    category?: string;
    properties?: object;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductType {
    _id?: string;
    title?: string;
    description?: string;
    price?: number;
    images?: string[];
    category?: string | "";
    properties?: PropertyType;
    createdAt?: string;
    updatedAt?: string;
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

export interface OrderData extends ClientData {
    products: string[];
}

export interface LineItems {
    quantity: number;
    price_data: {
        currency: "USD" | "EUR" | "GBP" | "PLN";
        product_data: { name: string };
        unit_amount: number;
    };
}
