import { useEffect, useRef } from "react";

type Props = {
    id: string;
    label?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    isCurrency?: boolean;
    backgroundColor?: string;
    rows?: number;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    min?: number | string;
    max?: number | string;
    step?: number | string;
};

export default function CustomTextField(props: Props) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const cur = ref.current;

        if (!cur || props.type !== "datetime-local") return;

        function handleOnClick() {
            try {
                ref.current!.showPicker();
            } catch (e) {}
        }

        cur.addEventListener("click", handleOnClick);
        return () => cur.removeEventListener("click", handleOnClick);
    }, []);

    return (
        <label className="" htmlFor={props.id}>
            <div className="relative">
                {props.type === "textarea" ? (
                    <textarea
                        id={props.id}
                        rows={props.rows || 4}
                        onChange={(e) => {
                            if (props.isCurrency) formatCurrencyInput(e);
                            if (props.onChange) props.onChange(e);
                        }}
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-black focus:border-black peer"
                        placeholder=" "
                        value={props.value}
                    ></textarea>
                ) : (
                    <input
                        type={props.type || "text"}
                        id={props.id}
                        onChange={(e) => {
                            if (props.isCurrency) formatCurrencyInput(e);
                            if (props.onChange) props.onChange(e);
                        }}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                        placeholder=" "
                        onKeyDown={props.onKeyDown}
                        ref={ref}
                        required={props.required}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        value={props.value}
                    />
                )}

                <label
                    htmlFor={props.id}
                    className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
                        props.backgroundColor ?? "bg-white"
                    }`}
                >
                    {props.label}
                </label>
            </div>
        </label>
    );
}

function formatCurrencyInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let value = e.target.value;

    value = value.replace(/[^0-9₫]/g, "");

    const isBackspace = (e.nativeEvent as InputEvent).inputType === "deleteContentBackward";

    if (isBackspace) value = value.slice(0, -1);

    if (value.length === 0) {
        e.target.value = "";
        return;
    }

    value = value.replace(/[^0-9]/g, "");

    e.target.value = parseInt(value, 10).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}
