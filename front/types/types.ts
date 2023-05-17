export interface ProductSchemaType {
    _id: string;
    title: string;
    description?: string;
    price: number;
    images?: string[];
    category?: string;
    properties?: object;
}

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
