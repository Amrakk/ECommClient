import { API } from "@/apis/api";
import { IResponse } from "@/interfaces/response";
import { UserDetail, UserFilter } from "@/models/user";

interface GetUsersResponse {
    users: Omit<UserDetail, "password">[];
    totalDocuments: number;
}

export async function getUsers(query?: UserFilter): Promise<GetUsersResponse> {
    return API.get<IResponse<GetUsersResponse>>("/users", { params: query }).then(
        (res) => res.data.data ?? { users: [], totalDocuments: 0 }
    );
}
