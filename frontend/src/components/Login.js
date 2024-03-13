import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {

  const [account, setAccount] = useState({
    "account": '',
    "password": '',
  });
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      if (!account.account || !account.password) {
        setError('Please fill in both account and password.');
        return;
      }

      // Clear any previous error
      setError(null);

      const response = await fetch('http://35.185.160.20:5566/api/users/login/', {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account
        }),
      });

      if (!response.ok) {
        console.log('account:', account);
        console.log('error:', response);
        console.error('Login failed:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);

      const accessToken = data.data.access_token;
      setToken(accessToken);
      console.log('Token:', accessToken);
      } catch (error) {
        console.error('Error:', error);
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
};

export default Login;
