import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";

interface Analyze {
    supportThreshold?: number;
    confidenceThreshold?: number;
}

export interface JobStatus {
    status: "idle" | "running" | "completed" | "failed";
    start_time: Date | string | null;
    /** In seconds */
    elapsed_time: number;
    result: string;
    files: {
        frequent_pairs?: "/download/frequent_pairs.csv";
        association_rules?: "/download/association_rules.csv";
    };
}

export async function analyze(data: Analyze): Promise<JobStatus> {
    return API.post<IResponse<JobStatus>>("/services/pcy", data).then((res) => res.data.data!);
}

export async function getJobStatus(filter?: { instantResponse?: boolean }): Promise<JobStatus> {
    return API.get<IResponse<JobStatus>>("/services/pcy/status", { params: filter }).then((res) => res.data.data!);
}
