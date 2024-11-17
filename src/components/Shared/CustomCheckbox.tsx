type Props = {
    id: string;
    name: string;
    value: string;
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
};

export default function CustomCheckbox(props: Props) {
    return (
        <div className="inline-flex items-center">
            <label className="relative flex items-center cursor-pointer" htmlFor={props.id}>
                <input
                    name={props.name}
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-black border-opacity-25 checked:border-black checked:border-opacity-50 transition-all"
                    value={props.value}
                    onChange={props.onChange}
                    checked={props.checked}
                    id={props.id}
                />
                <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
            </label>
            <label className="ml-2 cursor-pointer text-sm" htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    );
}
