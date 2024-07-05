import React, { useEffect} from 'react';
import "./Panel.css";
// import axios from 'axios';
import {fetchDeviceData} from '../function/useAPI';

const Panel = ({ selectedClient, selectedDeviceData, setSelectedDeviceData, deviceList }) => {

  const drawImagesOnCanvas = (canvasData) => {
    const canvas = document.getElementById('myCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvasData.sort((a, b) => a.z - b.z);

    canvasData.forEach(item => {
      const image = new Image();
      image.onload = () => {
        const desiredHeight = 200;
        const aspectRatio = image.width / image.height;
        const desiredWidth = desiredHeight * aspectRatio;

        ctx.drawImage(image, item.x, item.y, desiredWidth, desiredHeight);

        //Space above the image for the text
        const TEXT_OFFSET = 30;

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        
        // Position text above the image
        ctx.fillText(item.text, item.x, item.y - TEXT_OFFSET); 
      };
      image.src = item.image_path;
    });

  };
  
  useEffect(() => {
    if (selectedDeviceData && selectedDeviceData.canvus) {
      drawImagesOnCanvas(selectedDeviceData.canvus);
    }
  }, [selectedDeviceData]);
  

    const handlePanelSelection = async (deviceName) => {
      const selectedDevice = deviceList.find(device => device.device_name === deviceName);
      if (!selectedDevice) return;
      const deviceData = await fetchDeviceData(selectedClient, selectedDevice.device_type, selectedDevice.index);
      if(deviceData){
        setSelectedDeviceData(deviceData);
      }
    };
    // const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="client-section">
          <div className="col">
            <h3 className="client-name">{selectedClient}</h3>
            <div className="date-container">
              <div className="date-wrap">
                <input type="date" />
              </div>
              <div className="btn-container">
                <div className="btn-wrapper">
                  <button className="update-btn"><p>更新</p></button>
                </div>
                <div className="btn-wrapper">
                  <button className="reset-btn"><p>復歸</p></button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="button-section">
            <ul className="selection-container-list">
                {deviceList.map((device, index) => (
                    <li key={index} className="selection-container-list-item" data-device-type={device.device_type}>
                      <button className="selection-btn" style={{ backgroundColor: device.color }} onClick={() => handlePanelSelection(device.device_name)}>{device.device_name}</button>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
        {selectedDeviceData && (
        <div className="col">
          <div className="button-section">
            <ul className="selection-container-list">
                {selectedDeviceData.device_item.map((item, index) => (
                  <li key={index} className="selection-container-list-item">
                      <button className="selection-btn" style={{ backgroundColor: item.color }}>{item.text}</button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        )}
        {selectedDeviceData && selectedDeviceData.canvus && selectedDeviceData.canvus.length > 0 && (
        <div className="col">
          <div className="canvas-section">
            <canvas id="myCanvas" width="500" height="500"></canvas>
          </div>
        </div>
        )}
        {selectedDeviceData && selectedDeviceData.device_table && Object.keys(selectedDeviceData.device_table).length > 0 &&(
        <table className='device-table'>
            <tbody>
                  <tr>
                    <th>設備</th>
                    <th>數據</th>
                  </tr>
                {Object.entries(selectedDeviceData.device_table).map(([key, value], index) => (
                  <tr key={index}>
                      <td>{key}</td>
                      <td>{value}</td>
                  </tr>
                ))}
            </tbody>
        </table>
        )}
      </div>
    );
}

export default Panel;