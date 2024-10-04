import { API } from "../apis/api";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
    const loginMutate = useMutation({
        mutationKey: ["login"],

        /**
         *
         * @param {Credential} data
         * @returns {Promise}
         */
        mutationFn: (data) => API.post("/login", data),
    });

    return loginMutate;
}
