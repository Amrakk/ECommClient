import { ReactElement, useEffect, useState } from "react";

type Props = {
    top?: number;
    width?: string;
    title?: string;
    builder?: () => ReactElement;

    hide: () => void;
    isShowing: boolean;
};

export default function BaseModal(props: Props) {
    const [isShowing, setIsShowing] = useState(props.isShowing);

    useEffect(() => {
        if (props.isShowing) setIsShowing(props.isShowing);
    }, [props.isShowing]);

    if (!isShowing) return null;

    function handleModalBackground(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.target === e.currentTarget) props.hide();
    }

    return (
        <>
            <div
                className={`fixed inset-0 z-50 h-screen w-screen bg-black bg-opacity-50 ${
                    props.isShowing ? "fade-in" : "fade-out"
                }`}
                onClick={handleModalBackground}
                onAnimationEnd={() => {
                    if (!props.isShowing) setIsShowing(false);
                }}
            >
                <div
                    className="shadow fixed bg-white -translate-y-1/2 left-1/2 -translate-x-1/2  p-6 rounded-lg"
                    style={{ top: `calc(${props.top ?? 0}px + 50%)`, width: props.width ?? "30%" }}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-2xl font-bold text-gray-900">{props.title}</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm size-10 ms-auto inline-flex justify-center items-center transition-all duration-200"
                            data-modal-toggle="select-modal"
                            onClick={props.hide}
                        >
                            <svg
                                className="size-4 hover:animate-bounce"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal Header */}

                    <div>{props.builder?.()}</div>
                </div>
            </div>
        </>
    );
}
