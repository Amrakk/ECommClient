import { useCallback } from "react";
import { DISCOUNT_TYPE } from "@/constants";
import { useSearchParams } from "react-router-dom";

export default function useUserFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get("code") ?? undefined;
    const used = searchParams.get("used") === null ? undefined : searchParams.get("used") === "true";
    const discountType = (searchParams.get("discountType") ?? undefined) as DISCOUNT_TYPE | undefined;

    const changeFilter = useCallback(
        (props: { code?: string; used?: boolean; discountType?: DISCOUNT_TYPE }) => {
            setSearchParams((params) => {
                if (props.code) params.set("code", props.code);
                else params.delete("code");

                if (typeof props.used === "boolean") params.set("used", `${props.used}`);
                else params.delete("used");

                if (props.discountType) params.set("discountType", `${props.discountType}`);
                else params.delete("discountType");

                return params;
            });
        },
        [setSearchParams]
    );

    return {
        code,
        used,
        discountType,
        changeFilter,
    };
}
