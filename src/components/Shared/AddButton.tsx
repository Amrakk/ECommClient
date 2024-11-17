import "@/styles/clickAnimation.css";

type Props = {
    onClick: () => void;
};

export default function AddButton(props: Props) {
    return (
        <div onClick={props.onClick} className="floating-button">
            <svg
                className="text-black"
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
            >
                <path
                    d="M12 4v16M4 12h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
