import axios from 'axios';
const localhost= process.env.REACT_APP_localhost;
//獲取客戶列表
export const fetchClients = async () => {
  try {
    const response = await axios.get(`${localhost}/getClientList`);
    return response.data.client_list; // 直接返回客戶列表數據
  } catch (error) {
    console.error('Error fetching the client list:', error);
    return null; // 發生錯誤時返回 null
  }
};
//獲取設備列表
export const fetchDeviceList = async (clientName) => {
  try {
    const response = await axios.get(`${localhost}/${clientName}/getDeviceList`);
    return response.data; // 直接返回設備列表數據
  } catch (error) {
    console.error('Error fetching the device list:', error);
    return null; // 發生錯誤時返回 null
  }
};
//獲取設備數據
export const fetchDeviceData = async (clientName, deviceType, index) => {
    try {
        const response = await axios.get(`${localhost}
        /${clientName}/getDeviceData/${deviceType}/${index}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching device data:', error);
        return null;
      }
}