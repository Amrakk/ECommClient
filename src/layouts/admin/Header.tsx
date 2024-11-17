import adminImage from "@/assets/adminIcon.png";

export default function Header() {
    return (
        <header className="border-b-2">
            <div className="flex justify-between items-center bg-gray-100 p-4">
                <div className="size-10 rounded-full bg-gray-400 ml-auto">
                    <img src={adminImage} className="rounded-full" />
                </div>
            </div>
        </header>
    );
}
