import { BiHome } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR_URL } from "@/constants";
import { useUserStore } from "@/stores/user.store";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

export default function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { user, logout } = useUserStore();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const nonTarget = document.getElementById("avatarBtn") as HTMLElement;
            if (nonTarget && !nonTarget.contains(event.target as Node)) setOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    return (
        <header className="border-b-2 flex justify-between items-center bg-gray-100 p-3 pr-6">
            <div id="avatarBtn" className="p-1 ml-auto">
                <button onClick={() => setOpen((s) => !s)}>
                    <div className="flex gap-5 text-base items-center">
                        <img
                            src={user?.avatarUrl ?? DEFAULT_AVATAR_URL}
                            className="rounded-full p-1 size-12 bg-gray-200"
                        />
                        {user?.name ?? "User"}
                    </div>
                </button>
                {open && (
                    <div className="absolute right-6 top-20 flex flex-col gap-1 px-4 py-2 overflow-hidden rounded-md z-10 bg-white shadow-lg fade-in max-w-[90vw] select-none">
                        <div className="mx-auto w-full cursor-pointer" onClick={() => navigate("/home")}>
                            <div className="flex items-center gap-6 text-base font-semibold text-black px-3 py-2 rounded-md w-full hover:bg-gray-100 transition-colors duration-200">
                                <BiHome size={24} className="text-gray-800" />
                                <span>Home</span>
                            </div>
                        </div>

                        <div className="mx-auto w-full cursor-pointer" onClick={() => navigate("/user/profile")}>
                            <div className="flex items-center gap-6 text-base font-semibold text-black px-3 py-2 rounded-md w-full hover:bg-gray-100 transition-colors duration-200">
                                <FaRegUser size={24} className="text-gray-800" />
                                <span>Profile</span>
                            </div>
                        </div>

                        <hr className="border-gray-300 my-2" />

                        <div className="mx-auto w-full cursor-pointer" onClick={handleLogout}>
                            <div className="flex items-center gap-6 text-base font-semibold text-black px-3 py-2 rounded-md w-full hover:bg-gray-100 transition-colors duration-200">
                                <MdOutlinePowerSettingsNew size={24} className="text-gray-800" />
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
