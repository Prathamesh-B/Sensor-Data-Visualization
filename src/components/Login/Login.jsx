import React from 'react'
import "./Login.css"

const Login = () => {
  return (
    <div class="container">
            <h2>Login</h2>
            <form>
                <div class="group">
                    <label for="username">Username:</label>
                    <input 
                        type="text" 
                        required 
                    />
                </div>
                <div class="group">
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        required
                    />
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
            <p>Don't have an account? Register here</p>
        </div>
  )
}

export default Login