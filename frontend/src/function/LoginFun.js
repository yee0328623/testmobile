const CryptoJS = require('crypto-js');
// 加密
function encrypt(text, secretKey) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}
const Api=process.env.REACT_APP_API_URL
// 解密
function decrypt(ciphertext, secretKey) {
  const bytes  = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
//登入function
async function login(account) {
  const secretkey = process.env.REACT_APP_SECRET_KEY
  const password =encrypt(account.password, secretkey);
  console.log(password);
  //U2FsdGVkX1/T/8WV7UqXydiUvr+dqKrqaVXlMDUDNFA= 加密後的密碼
  try {
      if (!account.account || !account.password) {
        return { error: 'Please fill in both account and password.' };
      }
      
      const response = await fetch(`${Api}/users/login/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account
        }),
      });
  
      if (!response.ok) {
        console.error('Login failed:', response.statusText);
        return { error: 'Login failed: ' + response.statusText };
      }
  
      const data = await response.json();
      const accessToken = data.data.access_token;
      return { token: accessToken };
    } catch (error) {
      console.error('Error:', error);
      return { error: error.toString() };
    }
  }
    
  export { login };