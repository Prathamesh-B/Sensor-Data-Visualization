import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { Divider } from "@mantine/core";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAuthenticated } = useAuth();

    const handleMachineOperatorLogin = () => {
        setUsername("Rahul Singh");
        setPassword("Rahul!123@");
    };

    const handleSupervisorPMLogin = () => {
        setUsername("Manoj Prabhakar");
        setPassword("MP!123@");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (username === "Rahul Singh" && password === "Rahul!123@") {
                const token = { username, role: "Machine Operator" };
                localStorage.setItem("token", JSON.stringify(token));
                setIsAuthenticated(true);
                window.location.href = "/mo";
            } else if (
                username === "Manoj Prabhakar" &&
                password === "MP!123@"
            ) {
                const token = { username, role: "Supervisor" };
                localStorage.setItem("token", JSON.stringify(token));
                setIsAuthenticated(true);
                window.location.href = "/svpm";
            }
        } catch (error) {
            console.error(error);
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
            <h1 className="website-name">ProdViz</h1>
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
                <Divider my="md" />
                <div className="role-buttons">
                    <button
                        className="role-btn"
                        onClick={handleSupervisorPMLogin}
                    >
                        Supervisor/Product Manager
                    </button>
                    <button
                        className="role-btn"
                        onClick={handleMachineOperatorLogin}
                    >
                        Machine Operator
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
