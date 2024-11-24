import { RESPONSE_CODE, RESPONSE_MESSAGE } from "@/constants";
import { CartDetail } from "@/models/cart";
import { UserDetail } from "@/models/user";

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

export interface IResLogin {
    user: UserDetail;
    cart: CartDetail | null;
}
