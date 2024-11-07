import { useState } from "react";
import { User } from "@/models/user";
import useLogin from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";

export default function LoginForm() {
    const { setUser } = useUserStore();
    const [error, setError] = useState(false);
    const { mutateAsync, status } = useLogin();

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const data = { email, password };
        mutateAsync(data)
            .then((response) => {
                const newUser = new User(response.data.email, response.data.role);
                setUser(newUser);
                navigate("/admin/dashboard");
            })
            .catch(() => {
                setError(true);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" disabled={status === "pending"} />
                <input name="password" type="password" placeholder="Password" disabled={status === "pending"} />
                <p hidden={!error}>Invalid email or password</p>
                <button type="submit" disabled={status === "pending"}>
                    Submit
                </button>
            </form>
        </div>
    );
}
