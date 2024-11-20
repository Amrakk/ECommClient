import { API } from "@/apis/api";
import { useMutation } from "@tanstack/react-query";

import type { Credential } from "@/models/credential.js";

export default function useLogin() {
    const loginMutate = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: Credential) => API.post("/auth/login", data),
    });

    return loginMutate;
}
