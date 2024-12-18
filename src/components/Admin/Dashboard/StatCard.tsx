import { ReactNode } from "react";

interface Props {
    title: string;
    total: string;
    rate: () => ReactNode;
    levelUp?: boolean;
    levelDown?: boolean;
    children: ReactNode;
    onClick?: () => void;
}

export default function StatCard(props: Props) {
    return (
        <div
            className="rounded-xl border border-stroke bg-white py-6 px-7 shadow-default cursor-pointer"
            onClick={props.onClick}
        >
            <div className="flex size-11 items-center justify-center rounded-full bg-meta-2">{props.children}</div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black">{props.total}</h4>
                    <span className="text-sm font-medium">{props.title}</span>
                </div>

                <span
                    className={`flex items-center gap-1 text-sm font-medium ${props.levelUp && "text-meta-3"} ${
                        props.levelDown && "text-meta-7"
                    } ${!props.levelUp && !props.levelDown && "text-meta-5"}`}
                >
                    {props.rate()}

                    {props.levelUp && (
                        <svg
                            className="fill-meta-3"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                                fill=""
                            />
                        </svg>
                    )}
                    {props.levelDown && (
                        <svg
                            className="fill-meta-7"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                                fill=""
                            />
                        </svg>
                    )}
                </span>
            </div>
        </div>
    );
}
