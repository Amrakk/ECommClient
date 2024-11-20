export const parseNumber = (value: string | null | undefined) => {
    return isNaN(parseInt(value ?? "")) ? undefined : parseInt(value ?? "0");
};
