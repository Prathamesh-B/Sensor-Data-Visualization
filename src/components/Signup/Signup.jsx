import { useState } from "react";
import "./Signup.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <div className="container">
            <h2 className="title">SignUp</h2>
            <form>
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
                    <label className="label" htmlFor="username">
                        Email:
                    </label>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="group">
                    <label>First Name:</label>
                    <input
                        className="input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="group">
                    <label>Last Name:</label>
                    <input
                        className="input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="group">
                    <label className="label" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="input"
                        type="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />
                </div>
                <div className="group">
                    <label>Confirm Password:</label>
                    <input
                        className="input"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
            </form>
            <p className="p">Don&apos;t have an account? Register here</p>
        </div>
    );
};

export default Login;
