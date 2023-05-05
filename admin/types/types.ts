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
    values?: string[] | string;
};

export interface ProductType {
    title?: string;
    description?: string | undefined;
    price?: number;
    _id?: number;
    images?: string[];
    category?: string | "";
}
