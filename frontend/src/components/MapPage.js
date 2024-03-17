import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import Panel from './Panel';
import Navbar from './Navbar';
import axios from 'axios';
import "./MapPage.css";
import '../index.css';

const MapPage = () => {
  const [selectedClient, setSelectedClient] = useState();
  const [clients, setClients] = useState([]);
  const [selectedClientLocation, setSelectedClientLocation] = useState(null);
  const [clientsByCounty, setClientsByCounty] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDeviceData, setSelectedDeviceData] = useState(null);
  const [selectedClientData, setSelectedClientData] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getClientList');
        setClients(response.data.client_list);
        organizeClientsByCounty(response.data.client_list);

        if (response.data.client_list.length > 0) {
          const firstClient = response.data.client_list[0];
          setSelectedClient(firstClient.clientName);
          setSelectedClientLocation(firstClient.location);
          setSelectedClientData(firstClient);
          setSelectedDeviceData(null);
          fetchDeviceList(firstClient.clientName);
        }
      } catch (error) {
        console.error('Error fetching the client list:', error);
      }
    };

    fetchClients();
  }, []);

  const organizeClientsByCounty = (clients) => {
    const map = clients.reduce((acc, client) => {
      const { county, clientName } = client;
      if (acc[county]) {
        acc[county].push(clientName);
      } else {
        acc[county] = [clientName];
      }
      return acc;
    }, {});
    setClientsByCounty(map);
  };
  
  const fetchDeviceList = async (clientName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/${clientName}/getDeviceList`);
      // console.log("response",response);
      setDeviceList(response.data);
    } catch (error) {
      console.error('Error fetching the device list:', error);
    }
  };

  const handleClientSelection = (clientName) => {
    const selectedClientData = clients.find(client => client.clientName === clientName);
    console.log("clients", clients.find(client => client.clientName === clientName));
    if (selectedClientData) {
      setSelectedClient(selectedClientData.clientName);
      setSelectedClientLocation(selectedClientData.location);
      setSelectedClientData(selectedClientData);
      setSelectedDeviceData(null);
      setDeviceList([]);
      fetchDeviceList(clientName);
      // console.log(selectedClientData);
    } else {
      console.log("Client not found:", clientName);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <section>
        <Navbar isOpen={isOpen} toggleNavbar={toggleNavbar} handleClientSelection={handleClientSelection} clientsByCounty={clientsByCounty}/>
      </section>
      <section>
        <div className='map-container'>
          <MapComponent clients={clients} handleClientSelection={handleClientSelection} selectedClientLocation={selectedClientLocation} setSelectedClientLocation={setSelectedClientLocation} selectedClientData={selectedClientData} />
          <Panel selectedClient={selectedClient} setSelectedDeviceData={setSelectedDeviceData} selectedDeviceData={selectedDeviceData} deviceList={deviceList.device_list || []}/>
        </div>
      </section>
    </div>
  );
};

export default MapPage;
  