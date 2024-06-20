import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import setupUdpListener from './Network/udpClient';
import AppNavigator from './AppNavigator';
import { ThemeProvider } from './ThemeContext';

const App: React.FC= () => {
  const [liveData, setLiveData] = useState<any>(null);
  const [sendJson, setSendJson] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const [isExecLightOn, setIsExecLightOn] = useState<boolean>(false);
  const [serverIp, setServerIp] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [sendConnectRequest, setSendConnectRequest] = useState<any>(null);
  

  useEffect(() => {
    const onMessage = (data: any) => {
      console.log('Received data:', data);
      setLiveData(data);
    };

    const onAck = (ipAddress: string) => {
      console.log('Received ack from:', ipAddress);
      setServerIp(ipAddress);
      setConnected(true);
    };

    const { socket, sendConnectRequest, sendJson } = setupUdpListener(onMessage, onAck);
    setSocket(socket);
    setSendJson(() => sendJson);
    setSendConnectRequest(() => sendConnectRequest);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log('liveData updated in App:', liveData);
  }, [liveData]);

  
  return (
    <ThemeProvider>
      <AppNavigator serverIp={serverIp} sendConnectRequest={sendConnectRequest}sendJson={sendJson} connected={connected} socket={socket}/>
    </ThemeProvider>
  );
};

export default App;