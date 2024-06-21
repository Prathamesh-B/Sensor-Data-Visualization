import "./Signup.css";

const Login = () => {
    return (
        <div className="container">
            <h2>SignUp</h2>
            <form>
                <div className="group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" required />
                </div>
                <div className="group">
                    <label htmlFor="username">Email:</label>
                    <input type="email" required />
                </div>
                <div className="group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" required />
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
            </form>
            <p>Don&apos;t have an account? Register here</p>
        </div>
    );
};

export default Login;
