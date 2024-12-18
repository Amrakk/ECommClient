import "@/styles/dropdown.css";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

export type Option<T = string> = {
    name: string;
    value: T;
};

type Props<T> = {
    placeholder?: string;
    data: Option<T>[];
    direction?: "up" | "down";
    maxHeight?: number;
    compare?: (a?: T, b?: T) => boolean;
    onChange?: (data: Option<T>) => void | Promise<void>;
    variant?: "primary" | "secondary";
    fixedPlaceholder?: boolean;
    selected?: T;
};

export default function Dropdown<T>(props: Props<T>) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<T | undefined>(undefined);
    const [displayText, setDisplayText] = useState(props.placeholder ?? props.data[0].name);
    const placeHolderRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleOnClick(e: MouseEvent) {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target as HTMLElement)) {
                setOpen(false);
            }
        }

        document.addEventListener("click", handleOnClick);

        return () => document.removeEventListener("click", handleOnClick);
    }, []);

    useEffect(() => {
        if (props.selected) {
            const find = props.data.find((d) => props.compare?.(d.value, props.selected) ?? d.value === props.selected);
            if (find) {
                setSelected(props.selected);
                if (!props.fixedPlaceholder) setDisplayText(find.name);
            }
        } else {
            setSelected(undefined);
        }
    }, [props.data, props.selected, props.fixedPlaceholder]);

    function handleSelect(data: Option<T>) {
        return () => {
            setOpen(false);
            setSelected(data.value);
            if (!props.fixedPlaceholder) setDisplayText(data.name);

            props.onChange?.(data);
        };
    }

    return (
        <div className="relative ml-auto isolate size-full z-30 dropdown" ref={dropdownRef}>
            <button
                type="button"
                className={`flex justify-between items-center p-2 rounded-md size-full font-bold select-none ${
                    props.variant == "secondary" ? "bg-white text-black border-2 " : "bg-black text-white"
                }`}
                onClick={() => setOpen((s) => !s)}
                ref={placeHolderRef}
            >
                <div className="w-[90%] truncate text-left">{displayText}</div>
                <IoIosArrowDown className={`${open ? "-rotate-180" : "rotate-0"} transition-transform`} />
            </button>
            {open && (
                <div
                    className={`absolute w-full drop-shadow-xl overflow-y-auto rounded-md`}
                    style={{
                        bottom: props.direction === "down" ? "unset" : `${placeHolderRef.current?.offsetHeight}px`,
                        maxHeight: `${props.maxHeight ?? 240}px`,
                    }}
                >
                    <ul>
                        {props.data.map((d) => (
                            <li key={`${JSON.stringify(d.value)}`} className="bg-white">
                                <button
                                    className={`w-full hover:bg-opacity-40 text-left p-2 select-none ${
                                        props.variant == "secondary"
                                            ? "hover:bg-black"
                                            : "hover:bg-opacity-10 hover:bg-black"
                                    } ${
                                        selected == d.value
                                            ? props.variant == "secondary"
                                                ? "bg-black/20"
                                                : "bg-opacity-15 bg-black"
                                            : "bg-white"
                                    }`}
                                    onClick={handleSelect(d)}
                                >
                                    {d.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
