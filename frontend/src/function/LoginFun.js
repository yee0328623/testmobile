import axios from "axios";

const loginURL = process.env.REACT_APP_LOGIN_URL;

// const CryptoJS = require("crypto-js");
// // 加密
// function encrypt(text, secretKey) {
//   return CryptoJS.AES.encrypt(text, secretKey).toString();
// }
// const Api = process.env.REACT_APP_BACKEND_URL;
// // 解密
// // function decrypt(ciphertext, secretKey) {
// //   const bytes  = CryptoJS.AES.decrypt(ciphertext, secretKey);
// //   return bytes.toString(CryptoJS.enc.Utf8);
// // }
//登入function
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

  if (match) {
    // console.log("getting cookie", match[2]);
    return match[2];
  }
  return "Cookie not found";
};
export const onLogin = async (account, password, setMessage) => {
  try {
    const csrfToken = getCookie("csrftoken");
    await axios.post(
      `${loginURL}/csrf`,
      {},
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    const response = await axios.post(`${loginURL}/login`, {
      username: account,
      password: password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);

    const protectedResponse = await axios.get(`${loginURL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage("登入成功");
  } catch (error) {
    if (error.response) {
      setMessage(error.response.data.message);
    } else {
      setMessage("登入失敗");
    }
  }
};
