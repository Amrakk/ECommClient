import Dropdown from "./Dropdown";
import { PaginationLimitOptions } from "@/constants";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import usePagination from "@/hooks/Shared/usePagination";
import { useEffect } from "react";

type Props = {
    total: number;
    disabled?: boolean;
};

export default function Pagination(props: Props) {
    const { currentPage, limitPage, changePage } = usePagination();

    const totalPage = Math.ceil(props.total / (limitPage ?? 10));

    const hasPrev = currentPage > 1;
    const hasNext = totalPage > currentPage;
    const isTooFarFromStart = currentPage >= 3;

    function goto(page: number) {
        return () => {
            changePage(page, limitPage);
        };
    }

    useEffect(() => {
        changePage();
    }, []);

    return (
        <div className={`flex justify-center gap-4 ${props.disabled ? "opacity-40 pointer-events-none" : ""}`}>
            <button
                className="rounded-md p-1 hover:opacity-40 transition-opacity disabled:opacity-20"
                disabled={!isTooFarFromStart}
                onClick={goto(1)}
            >
                <HiOutlineChevronDoubleLeft size={24} />
            </button>
            <button
                className="rounded-md p-1 hover:opacity-40 transition-opacity disabled:opacity-20"
                disabled={!hasPrev}
                onClick={goto(currentPage - 1)}
            >
                <IoIosArrowBack size={24} />
            </button>
            <div className="flex justify-center gap-4 w-32">
                {hasPrev ? (
                    <button
                        className="px-3 rounded-md text-black hover:bg-slate-400/20"
                        onClick={goto(currentPage - 1)}
                    >
                        {currentPage - 1}
                    </button>
                ) : (
                    <div className="px-3"></div>
                )}
                <button className="px-3 rounded-md text-white bg-black scale-110 font-bold">{currentPage}</button>
                {hasNext ? (
                    <button
                        className="px-3 rounded-md text-black hover:bg-slate-400/20"
                        onClick={goto(currentPage + 1)}
                    >
                        {currentPage + 1}
                    </button>
                ) : (
                    <div className="px-3"></div>
                )}
            </div>
            <button
                className="rounded-md p-1 hover:opacity-40 transition-opacity disabled:opacity-20"
                onClick={goto(currentPage + 1)}
                disabled={!hasNext}
            >
                <IoIosArrowForward size={24} />
            </button>

            <div className="w-20 h-full ml-8">
                <Dropdown
                    data={PaginationLimitOptions}
                    selected={`${limitPage}`}
                    onChange={(data) => {
                        changePage(currentPage, parseInt(data.value));
                    }}
                />
            </div>
        </div>
    );
}
