import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import PrimaryFlightDisplay from './FMCComponents/PrimaryFlightDisplay';
import FMCKeyboard from './FMCComponents/FMCKeyboard';
import setupUdpListener from '../Network/udpClient';
import { useTheme } from '../ThemeContext';

const colors = require('../Styles/colors');

const FMCScreen = ({ navigation, liveData, serverIp, sendJson, connected, socket }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // const [liveData, setLiveData] = useState(null);
    // const [sendJson, setSendJson] = useState(null);
    // const [socket, setSocket] = useState(null);
    const [isExecLightOn, setIsExecLightOn] = useState(false);
  
    // useEffect(() => {
    //   const onMessage = (data) => {
    //     console.log('Received data:', data);
    //     setLiveData(data);
    //   };
    //   return () => {
    //     if (socket) {
    //       socket.close();
    //     }
    //   };
    // }, []);

    // useEffect(() => {
    //     console.log('liveData updated in App:', liveData);
    //   }, [liveData]);

  return (
    <SafeAreaView style={styles.container}>
      {<PrimaryFlightDisplay sendJson={sendJson} data={liveData} setIsExecLightOn={setIsExecLightOn} serverIp={serverIp}/>}
      {<FMCKeyboard sendJson={sendJson} isExecLightOn={isExecLightOn} setIsExecLightOn={setIsExecLightOn} serverIp={serverIp} socket={socket}/>}
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.materialBackground,
      },
      text: {
        color: theme.text,
      },
      // Define more styles based on theme if needed
    });

export default FMCScreen;
