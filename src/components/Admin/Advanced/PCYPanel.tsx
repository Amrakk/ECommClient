import { toast } from "react-toastify";
import { JobStatus } from "@/apis/services";
import { useEffect, useState } from "react";
import usePCYActions from "@/hooks/Admin/Services/usePCYAction";
import CustomTextField from "@/components/Shared/CustomTextField";

type FormValues = {
    supportThreshold: number;
    confidenceThreshold: number;
};

const getStatusBadge = (status: "idle" | "running" | "completed" | "failed") => {
    switch (status) {
        case "idle":
            return "bg-gray-200 text-gray-800 border-gray-500";
        case "running":
            return "bg-blue-200 text-blue-800 border-blue-500";
        case "completed":
            return "bg-green-200 text-green-800 border-green-500";
        case "failed":
            return "bg-red-200 text-red-800 border-red-500";
        default:
            return "bg-gray-100 text-gray-600 border-gray-400";
    }
};

const defaultStatus: JobStatus = {
    status: "idle",
    start_time: null,
    elapsed_time: 0,
    result: "",
    files: {},
};

export default function PCYPanel() {
    // TODO: add query to fetch the status with instantResponse query on first load
    const { analyzeAction, pcyStatusQuery } = usePCYActions();

    const [pcyStatus, setPCYStatus] = useState<JobStatus>(defaultStatus);
    const [currentTime, setCurrentTime] = useState<string>("0s");

    const [formValues, setFormValues] = useState<FormValues>({
        supportThreshold: 0.1,
        confidenceThreshold: 0.3,
    });

    async function fetchJobStatus() {
        const status = await pcyStatusQuery.refetch();

        if (status.data) {
            setPCYStatus(status.data);
            if (status.data.status === "completed") {
                toast.success("Analysis completed successfully!", { toastId: "pcy-analyze" });
            } else if (status.data.status === "running") {
                await fetchJobStatus();
            }
        }
    }

    useEffect(() => {
        setPCYStatus(pcyStatusQuery.data ?? defaultStatus);
        if (pcyStatusQuery.data?.status === "completed") setCurrentTime(`${pcyStatusQuery.data?.elapsed_time ?? 0}s`);
    }, [pcyStatusQuery.data]);

    useEffect(() => {
        if (pcyStatus.status === "running" && pcyStatus.start_time) {
            const interval = setInterval(() => {
                const now = new Date();
                let elapsedTime = (now.getTime() - new Date(`${pcyStatus.start_time}`).getTime()) / 1000;
                elapsedTime = Math.max(elapsedTime, 0);
                setCurrentTime(`${Math.floor(elapsedTime)}s`);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [pcyStatus.status, pcyStatus.start_time]);

    async function handleSubmit() {
        if (pcyStatus.status === "running") {
            toast.error("Analysis is already in progress!", { toastId: "pcy-analyze" });
            return;
        }

        const showError = (message: string) => {
            toast.error(message, { toastId: "pcy-analyze" });
        };

        if (isNaN(formValues.supportThreshold) || formValues.supportThreshold <= 0 || formValues.supportThreshold > 1) {
            showError("Support Threshold must be between 0 and 1.");
            return;
        }
        if (
            isNaN(formValues.confidenceThreshold) ||
            formValues.confidenceThreshold <= 0 ||
            formValues.confidenceThreshold > 1
        ) {
            showError("Confidence Threshold must be between 0 and 1.");
            return;
        }

        const status = await analyzeAction.mutateAsync({
            confidenceThreshold: formValues.confidenceThreshold,
            supportThreshold: formValues.supportThreshold,
        });

        setPCYStatus(status ?? defaultStatus);
        fetchJobStatus();
        toast.success(" Analysis started.", { toastId: "pcy-analyze" });
    }

    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-bold mb-4">PCY</h1>
            <div className="grid grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="flex flex-col gap-4 col-span-1">
                    <div className="w-full">
                        <CustomTextField
                            id="supportThreshold"
                            type="number"
                            min={0}
                            max={1}
                            step={0.01}
                            value={formValues.supportThreshold}
                            label="Support Threshold"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    supportThreshold: parseFloat(e.target.value),
                                })
                            }
                        />
                    </div>
                    <div className="w-full">
                        <CustomTextField
                            id="confidenceThreshold"
                            type="number"
                            min={0}
                            max={1}
                            step={0.01}
                            value={formValues.confidenceThreshold}
                            label="Confidence Threshold"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    confidenceThreshold: parseFloat(e.target.value),
                                })
                            }
                        />
                    </div>
                    <button
                        className="w-full bg-black disabled:bg-gray-500 text-white font-bold text-center p-3 rounded-md active:scale-90 transition-all duration-75"
                        onClick={handleSubmit}
                    >
                        Analyze
                    </button>

                    {/* Status Section */}
                    <div className="col-span-2">
                        <div className="flex gap-4">
                            {pcyStatusQuery.isError ? (
                                // Error
                                <div className="p-3 text-lg text-red-700 size-full bg-red-100 border border-red-300 rounded-md">
                                    <span className="font-bold">Error:</span> {pcyStatusQuery.error.message}
                                </div>
                            ) : (
                                // JobStatus
                                <div className="w-full p-4 rounded-md shadow-md flex items-center justify-between select-none">
                                    {/* Status Badge */}
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`px-4 py-2 text-sm font-medium border rounded-full ${getStatusBadge(
                                                pcyStatus.status
                                            )}`}
                                        >
                                            {pcyStatus.status.charAt(0).toUpperCase() + pcyStatus.status.slice(1)}
                                        </span>
                                        {pcyStatus.start_time && (
                                            <span className="text-sm text-gray-600">
                                                <span className="font-semibold">Started at:</span>{" "}
                                                {new Date(pcyStatus.start_time).toLocaleTimeString()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Elapsed Time */}
                                    <div className="text-sm font-medium text-gray-600">
                                        <span className="font-semibold">Elapsed Time:</span>{" "}
                                        <span className="font-bold text-gray-800">{currentTime || "Analyzing..."}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="col-span-2">
                    <div className="w-full p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold">Result</h2>
                        <div className="mt-4">
                            <pre>{pcyStatus.result || "No results yet."}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
