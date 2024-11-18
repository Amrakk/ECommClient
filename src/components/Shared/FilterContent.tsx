import React, { ReactElement, useEffect } from "react";

type Props = {
    elements: { label: string; builder: () => ReactElement }[];
    reset: () => void;
    apply: () => void;
    close: Function;
};

export default function FilterContent(props: Props) {
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const nonTarget = document.getElementById("filterBtn") as HTMLElement;
            if (nonTarget && !nonTarget.contains(event.target as Node)) props.close();
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="absolute min-w-64 right-0 top-14 overflow-hidden rounded-md z-10 bg-white fade-in"
            ref={ref}
            style={{
                boxShadow:
                    "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
            }}
        >
            {props.elements.map((element, index) => (
                <div key={index} className="w-full text-left p-4 bg-white">
                    <h4>
                        <strong>{element.label}</strong>
                    </h4>
                    <div className="mt-2">{element.builder()}</div>
                </div>
            ))}

            <hr className="border-gray-400 my-2" />

            <div className="w-full text-left p-4 bg-white flex justify-end">
                <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-75 ml-2"
                    onClick={props.apply}
                >
                    Apply
                </button>

                <button
                    className=" border border-gray-300 px-4 py-2 rounded hover:bg-opacity-10 hover:bg-black ml-2"
                    onClick={props.reset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
