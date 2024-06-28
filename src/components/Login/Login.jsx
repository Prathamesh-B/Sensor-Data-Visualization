import { useState } from "react";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/auth/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log(data);
                localStorage.setItem("token", data.key);
                window.location.href = "/";
            } else {
                console.error(data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div className="container">
                <h2 className="title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="group">
                        <label className="label" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="label" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
                <p className="p">Don&apos;t have an account? Register here</p>
            </div>
        </div>
    );
};

export default Login;
