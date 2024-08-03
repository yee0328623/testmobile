import axios from "axios";

const DataUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/`;
const CryptoJS = require("crypto-js");
// 加密
function encrypt(text, secretKey) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}
const Api = process.env.REACT_APP_BACKEND_URL;
// 解密
// function decrypt(ciphertext, secretKey) {
//   const bytes  = CryptoJS.AES.decrypt(ciphertext, secretKey);
//   return bytes.toString(CryptoJS.enc.Utf8);
// }
export const createuserdata = async (username, password) => {
  try {
    const response = await axios.post(`${DataUrl}`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
export const getuserdata = async (userid) => {
  // 獲取全部資料就帶空值
  try {
    const response = await axios.get(`${DataUrl}${userid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
export const updateuserdata = async (userid, data) => {
  try {
    const response = await axios.post(`${DataUrl}`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
export const deleteuserdata = async (userid) => {
  //一定要有userid
  try {
    const response = await axios.delete(`${DataUrl}${userid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
export const patchuserdata = async (data) => {
  try {
    const response = await axios.patch(`${DataUrl}`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
