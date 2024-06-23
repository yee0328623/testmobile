import React, { useState } from 'react';
import './Login.css'; 
import { login } from '../function/LoginFun.js';
//const Login = () => {
function LoginPage() {
  const [account, setAccount] = useState({
    "account": '',
    "password": '',
  });
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const handleLogin = async () => {
  // const handleLogin = async () => {
    const result = await login(account);
    if (result.error) {
      setError(result.error);
    } else {
      setToken(result.token);
    }
  };
  const handleInputChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className='form-container'>
      <div className="form">
        <div className="text">Log In</div>
        {error && <div className="error"><div className="error_title">{error}</div></div>}
        <div className="form-label">
          <label>Account</label>
        </div>
        <div className="form-input">
          <input className="input" type="text" required="" placeholder="account" name="account" value={account.account} onChange={handleInputChange}/>
        </div>
        <div className="form-label">
          <label>Password</label>
        </div>
        <div className="form-input">
          <input className="input" type="password" required="" placeholder="password" name="password" value={account.password} onChange={handleInputChange}/>
        </div>
        <div className="form-btn">
          <button className="login-btn" onClick={handleLogin} >Log In</button>
          {token && <p>Token: {token}</p>}
        </div>
      </div>
    </main>
  );
}

 
// };

export default LoginPage;
