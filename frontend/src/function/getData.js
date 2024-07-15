import axios from "axios";
const DataUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/`;
//由前台去傳送要get，post，patch，delete，資料希望能塞進一個一維陣列，看需要甚麼資料直接取出來。
export const userFunction = async (requestType, username, password) => {
  try {
    let response;
    if (requestType === "post") {
      response = await axios.post(`${DataUrl}`, {
        username: username,
        password: password,
      });
    } else if (requestType === "get") {
      response = await axios.get(`${DataUrl}`, {
        headers: {
          Authorization: `Bearer ${username}`,
        },
      });
    } else if (requestType === "patch") {
      response = await axios.post(
        `${DataUrl}`,
        {},
        {
          headers: {
            "X-CSRF-Token": username,
          },
        }
      );
    } else if (requestType === "delete") {
      response = await axios.delete(`${DataUrl}`, {
        headers: {
          Authorization: `Bearer ${username}`,
        },
      });
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
