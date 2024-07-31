import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setIsAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (username.toLowerCase() === "pratham" && password === "123") {
                const token = {
                    username: "Pratham Bhalekar",
                    role: "Machine Operator",
                };
                localStorage.setItem("token", JSON.stringify(token));
                setIsAuthenticated(true);
                window.location.href = "/mo";
            } else if (
                username.toLowerCase() === "riya" &&
                password === "123"
            ) {
                const token = { username: "Riya Torgal", role: "Supervisor" };
                localStorage.setItem("token", JSON.stringify(token));
                setIsAuthenticated(true);
                window.location.href = "/svpm";
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong, please try again later.");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div className="website-name"><img src="./images/ProdVizLogo.png" alt="ProdViz Logo" style={{ width: "10rem" }}/></div>
            <div style={{ padding: "20px" }} className="container">
                <p className="title">Welcome</p>
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
                    {error && <p className="error">{error}</p>}{" "}
                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
                <p className="p">Forgot password? Contact support</p>
            </div>
        </div>
    );
};

export default Login;
