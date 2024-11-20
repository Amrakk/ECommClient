type Props = {
    id: string;
    label?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
};

export default function CustomTextField(props: Props) {
    return (
        <div className="relative">
            <input
                type={props.type || "text"}
                id={props.id}
                onChange={props.onChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required={props.required}
                min={props.min}
                max={props.max}
            />
            <label
                htmlFor={props.id}
                className="absolute text-sm text-gray-500 bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                {props.label}
            </label>
        </div>
    );
}
