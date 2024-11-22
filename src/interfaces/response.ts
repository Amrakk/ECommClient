import { RESPONSE_CODE, RESPONSE_MESSAGE } from "@/constants";

export interface IResponse<T = undefined> {
    /** Response code */
    code: RESPONSE_CODE;
    /** Response message */
    message: RESPONSE_MESSAGE;
    /** Response data */
    data?: T;
    /** Error details */
    error?: Record<string, unknown> | Array<unknown>;
}
