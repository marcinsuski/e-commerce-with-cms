export type CategoryType = {
    _id?: string;
    name: string;
    parent: CategoryType | null;
    properties: PropertyType[] | [];
};

export type AlertResult = {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean;
    value: boolean;
};

export type PropertyType = {
    name?: string;
    values?: string;
};

export interface ProductType {
    title?: string;
    description?: string | undefined;
    price?: number;
    _id?: number;
    images?: string[];
    category?: string | "";
    properties?: PropertyType;
}

export interface LineItems {
    quantity: number;
    price_data: {
        currency: "USD" | "EUR" | "GBP" | "PLN";
        product_data: {
            name: string;
        };
        unit_amount: number;
    };
}

export interface OrderData {
    line_items: LineItems[];
    _id: number | string;
    name: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    paid: boolean;
    createdAt: string;
}
