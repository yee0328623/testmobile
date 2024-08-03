import React, { useState } from "react";
import "./Login.css";
// import axios from "axios";
import { onLogin } from "../function/LoginFun";
// const loginURL = process.env.REACT_APP_LOGIN_URL;

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    await onLogin(account, password, setMessage);
  };

  return (
    <main className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <div className="text">Log In</div>
        <div className="form-label">
          <label>Account</label>
        </div>
        <div className="form-input">
          <input
            className="input"
            type="text"
            required
            placeholder="account"
            name="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
        <div className="form-label">
          <label>Password</label>
        </div>
        <div className="form-input">
          <input
            className="input"
            type="password"
            required
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-btn">
          <button className="login-btn" type="submit">
            Log In
          </button>
        </div>
        {message && <div className="error-message">{message}</div>}
      </form>
    </main>
  );
};

export default Login;
