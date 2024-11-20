export const PaginationLimitOptions = [
    { name: "1", value: "1" },
    { name: "10", value: "10" },
    { name: "20", value: "20" },
    { name: "50", value: "50" },
    { name: "100", value: "100" },
];

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
