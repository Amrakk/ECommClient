import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { useDebounce } from "@/hooks/Shared/useDebounce";

type Props = {
    minRating?: number;
    onChange: (rating: number) => void;
};

const gap = 12;
const starWidth = 36;
const starPositions: number[] = [
    gap,
    starWidth + 2 * gap,
    starWidth * 2 + 3 * gap,
    starWidth * 3 + 4 * gap,
    starWidth * 4 + 5 * gap,
];

export default function RatingSelector(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [rating, setRating] = useState(props.minRating ?? 0);
    const [selectedRating, setSelectedRating] = useState(props.minRating ?? 0);

    const debounceHover = useDebounce((rating: number) => {
        const width = rating * starWidth + Math.ceil(rating) * gap + (rating % Math.round(rating) === 0 ? gap / 2 : 0);

        ref.current!.style.width = `${width}px`;
    }, 0);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const currWidth = e.clientX - ref.current!.getBoundingClientRect().left;

        let curRating = 0;

        for (let i = starPositions.length - 1; i >= 0; i--) {
            if (currWidth > starPositions[i] + starWidth / 2) {
                curRating = i + 1;
                break;
            } else if (currWidth > starPositions[i]) {
                curRating = i + 0.5;
                break;
            }
        }

        setRating(curRating);
    }

    function handleMouseLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!selectedRating) setRating(0);
        else setRating(selectedRating);
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const bound = ref.current!.getBoundingClientRect();

        if (e.clientX < bound.left || e.clientX > bound.right) setSelectedRating(0);
        else setSelectedRating(rating);
    }

    useEffect(() => {
        debounceHover(rating);
    }, [rating]);

    useEffect(() => {
        props.onChange(selectedRating);
    }, [selectedRating]);

    return (
        <div
            className="flex flex-col w-full items-center justify-center isolate"
            onClick={handleClick}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex relative h-10 w-[252px]" onMouseMove={handleMouseMove}>
                <div className="flex justify-evenly absolute inset-0 z-0 w-[252px]">
                    <FaRegStar className="text-yellow-400" size={36} />
                    <FaRegStar className="text-yellow-400" size={36} />
                    <FaRegStar className="text-yellow-400" size={36} />
                    <FaRegStar className="text-yellow-400" size={36} />
                    <FaRegStar className="text-yellow-400" size={36} />
                </div>

                <div className="absolute z-10 w-0 inset-0 overflow-hidden transition-all" ref={ref}>
                    <div className="flex justify-evenly w-[252px]">
                        <div className="size-9 relative">
                            <FaStar
                                className={`text-yellow-200 backdrop-blur-sm inset-0 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
                                    selectedRating ? "" : "opacity-0"
                                }`}
                                size={42}
                            />
                            <FaStar className="text-yellow-400 inset-0 absolute" size={36} />
                        </div>
                        <div className="size-9 relative ">
                            <FaStar
                                className={`text-yellow-200 backdrop-blur-sm inset-0 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
                                    selectedRating ? "" : "opacity-0"
                                }`}
                                size={42}
                            />
                            <FaStar className="text-yellow-400 inset-0 absolute" size={36} />
                        </div>
                        <div className="size-9 relative ">
                            <FaStar
                                className={`text-yellow-200 backdrop-blur-sm inset-0 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
                                    selectedRating ? "" : "opacity-0"
                                }`}
                                size={42}
                            />
                            <FaStar className="text-yellow-400 inset-0 absolute" size={36} />
                        </div>
                        <div className="size-9 relative ">
                            <FaStar
                                className={`text-yellow-200 backdrop-blur-sm inset-0 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
                                    selectedRating ? "" : "opacity-0"
                                }`}
                                size={42}
                            />
                            <FaStar className="text-yellow-400 inset-0 absolute" size={36} />
                        </div>
                        <div className="size-9 relative ">
                            <FaStar
                                className={`text-yellow-200 backdrop-blur-sm inset-0 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
                                    selectedRating ? "" : "opacity-0"
                                }`}
                                size={42}
                            />
                            <FaStar className="text-yellow-400 inset-0 absolute" size={36} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
