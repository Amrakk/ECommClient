import { useState } from "react";
import useAuth from "@/hooks/Auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [error, setError] = useState(false);
    const { loginMutate } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const data = { email, password };
        loginMutate
            .mutateAsync(data)
            .then(() => {
                navigate("/home");
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
