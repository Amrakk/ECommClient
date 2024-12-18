import Pagination from "./Pagination";
import noData from "@/assets/noData.png";
import { useNavigate } from "react-router-dom";

export default function Table<T extends { _id: string; data: any[] }>({
    columns,
    sizes,
    rows,
    total,
    height = "h-[645px]",
    isLoading,
    isPaginated = true,
    navigatePath,
}: {
    columns: any[];
    rows: T[];
    total: number;
    sizes?: string[];
    height?: string;
    isLoading?: boolean;
    isPaginated?: boolean;
    navigatePath?: string;
}) {
    const navigate = useNavigate();

    function handleRowClick(_id: string) {
        navigate(`${navigatePath}/${_id}`);
    }

    return (
        <>
            <div className="overflow-x-auto rounded-xl">
                <div className={height}>
                    <table className="w-full shadow-md rounded-xl table-fixed">
                        <thead className="bg-black text-white sticky top-0">
                            <tr>
                                {columns.map((column, i) => (
                                    <th
                                        className="px-4 py-2 select-none"
                                        key={i}
                                        style={{ width: sizes?.[i] ?? "auto" }}
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {rows.length === 0 && !isLoading ? (
                                <tr className="">
                                    <td className="px-4 py-3 text-center" colSpan={columns.length}>
                                        <img src={noData} alt="No data" className="w-1/4 mx-auto" />
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row, i) => (
                                    <tr
                                        key={row._id}
                                        className="border-gray-200 cursor-pointer bg-white hover:bg-gray-200 transition-all duration-100 fade-in"
                                        onClick={navigatePath ? () => handleRowClick(row._id) : undefined}
                                    >
                                        {row.data.map((value, y) => (
                                            <td
                                                className="px-4 py-3 bg-inherit data-[is-last-row=false]:border-b data-[is-last-row=true]:data-[is-first-cell=true]:rounded-bl-xl data-[is-last-row=true]:data-[is-last-cell=true]:rounded-br-xl"
                                                data-is-first-cell={(y ?? -1) === 0}
                                                data-is-last-row={(i ?? -1) === rows.length - 1}
                                                data-is-last-cell={(y ?? -1) === columns.length - 1}
                                                key={`${row._id}_${y}`}
                                            >
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isPaginated && (
                <div className="mt-10">
                    <Pagination total={total} />
                </div>
            )}
        </>
    );
}
