export const DEFAULT_AVATAR_URL = import.meta.env.VITE_DEFAULT_AVATAR_URL;
export const DEFAULT_PRODUCT_IMAGE_URL = import.meta.env.VITE_DEFAULT_PRODUCT_IMAGE_URL;

export const PaginationLimitOptions = [
    { name: "1", value: "1" },
    { name: "10", value: "10" },
    { name: "20", value: "20" },
    { name: "50", value: "50" },
    { name: "100", value: "100" },
];

export const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"];

/******************/
/******************/
/**     ENUM     **/
/******************/
/******************/
export enum RESPONSE_CODE {
    SUCCESS = 0,
    UNAUTHORIZED = 1,
    FORBIDDEN = 3,
    NOT_FOUND = 4,
    BAD_REQUEST = 5,
    VALIDATION_ERROR = 8,
    TOO_MANY_REQUESTS = 9,

    SERVICE_UNAVAILABLE = 99,
    INTERNAL_SERVER_ERROR = 100,
}

export enum RESPONSE_MESSAGE {
    SUCCESS = "Operation completed successfully",
    UNAUTHORIZED = "Access denied! Please provide valid authentication",
    FORBIDDEN = "You don't have permission to access this resource",
    NOT_FOUND = "Resource not found! Please check your data",
    BAD_REQUEST = "The request could not be understood or was missing required parameters",
    VALIDATION_ERROR = "Input validation failed! Please check your data",
    TOO_MANY_REQUESTS = "Too many requests! Please try again later",

    SERVICE_UNAVAILABLE = "Service is temporarily unavailable! Please try again later",
    INTERNAL_SERVER_ERROR = "An unexpected error occurred! Please try again later.",
}

export enum USER_ROLE {
    CUSTOMER = "customer",
    ADMIN = "admin",
}

export enum USER_STATUS {
    NORMAL = "normal",
    BLOCKED = "blocked",
}

export enum SOCIAL_MEDIA_PROVIDER {
    GOOGLE = "google",
}

export enum PRODUCT_CATEGORY {
    HOME = "home",
    BOOKS = "books",
    SPORTS = "sports",
    ELECTRONICS = "electronics",
    OTHERS = "others",
}

export const PRODUCT_CATEGORY_LIST = [
    PRODUCT_CATEGORY.HOME,
    PRODUCT_CATEGORY.BOOKS,
    PRODUCT_CATEGORY.SPORTS,
    PRODUCT_CATEGORY.ELECTRONICS,
    PRODUCT_CATEGORY.OTHERS,
] as const;

// ORDER
export enum ORDER_STATUS {
    PENDING = "pending",
    PACKAGING = "packaging",
    SHIPPING = "shipping",
    DELIVERED = "delivered",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export const ORDER_STATUS_LIST = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.PACKAGING,
    ORDER_STATUS.SHIPPING,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.CANCELLED,
] as const;

// PROMOTE
export enum DISCOUNT_TYPE {
    FIXED = "fixed",
    PERCENT = "percent",
}

// PAYMENT
export enum PAYMENT_TYPE {
    COD = "COD",
    MOMO = "Momo",
    PAYOS = "Payos",
}

export enum PAYMENT_STATUS {
    PAID = "paid",
    EXPIRED = "expired",
    PENDING = "pending",
}

// STYLES
export const ORDER_STATUS_STYLES: Record<ORDER_STATUS, { bg: string; text: string; border: string; label: string }> = {
    [ORDER_STATUS.PENDING]: {
        bg: "bg-gray-100",
        text: "text-gray-600",
        border: "border-gray-300",
        label: "Pending",
    },
    [ORDER_STATUS.PACKAGING]: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-300",
        label: "Packaging",
    },
    [ORDER_STATUS.SHIPPING]: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-400",
        label: "Shipping",
    },
    [ORDER_STATUS.DELIVERED]: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-300",
        label: "Delivered",
    },
    [ORDER_STATUS.COMPLETED]: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-300",
        label: "Completed",
    },
    [ORDER_STATUS.CANCELLED]: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-300",
        label: "Cancelled",
    },
};

// Size according to MUI variant prop
export const FONT_SIZE = {
    body2: "0.875rem",
    body1: "1rem",
    h6: "1.25rem",
    h5: "1.5rem",
    h4: "2rem",
    small: "0.8rem",
    superSmall: "0.7rem",
};
