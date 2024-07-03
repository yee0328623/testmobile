import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import Panel from './Panel';
import Navbar from './Navbar';
// import axios from 'axios';
import "./MapPage.css";
import '../index.css';
import { fetchClients, fetchDeviceList } from '../function/useAPI';

const MapPage = () => {
  const [selectedClient, setSelectedClient] = useState();
  const [clients, setClients] = useState([]);
  const [selectedClientLocation, setSelectedClientLocation] = useState(null);
  const [clientsByCounty, setClientsByCounty] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDeviceData, setSelectedDeviceData] = useState(null);
  const [selectedClientData, setSelectedClientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const clientList = await fetchClients();
      if(clientList){
        setClients(clientList);
        organizeClientsByCounty(clientList);
        if (clientList.length > 0) {
          const firstClient = clientList[0];
          setSelectedClient(firstClient.clientName);
          setSelectedClientLocation(firstClient.location);
          setSelectedClientData(firstClient);
          setSelectedDeviceData(null);
          fetchDeviceList(firstClient.clientName);
        }
      }
    };

    fetchData();
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
  
  const handleClientSelection =  async (clientName) => {
    const deviceListData = await fetchDeviceList(clientName);
    // const selectedClientData = clients.find(client => client.clientName === clientName);
    // console.log("clients", clients.find(client => client.clientName === clientName));
    if (deviceListData) {
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
  