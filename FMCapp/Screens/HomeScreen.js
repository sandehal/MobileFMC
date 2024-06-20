import React, {useState} from 'react';
import { View, Button, StyleSheet, Touchable, Text } from 'react-native';
import { useTheme } from '../ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation, sendConnectRequest, socket, connected }) => {
  const { toggleTheme } = useTheme();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleConnect = () => {
    if (socket) {
      sendConnectRequest();
    }
  };

  return (
    <View style={styles.container}>

      <View>
        <TouchableOpacity style={[styles.button, {borderColor: connected ? 'green' : 'red' }]} onPress={() => handleConnect()}>
          <Text style={[styles.buttonText, {color: connected ? 'green' : 'red' }]}>CONNECT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowOfButtons}>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FMC')}>
              <Text style={styles.buttonText}>FMC</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => {toggleTheme(theme)}}>
              <Text style={styles.buttonText}>TOGGLE theme</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rowOfButtons}>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('METAR')}>
            <Text style={styles.buttonText}>METAR</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => {toggleTheme(theme)}}>
            <Text style={styles.buttonText}>TOGGLE THEME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      backgroundColor: theme.materialBackground,
      // borderColor: theme.buttonText,
      // birderWidth: 2,
    },
    button: {
      backgroundColor: theme.materialBackground,
      padding: 10,
      marginHorizontal: 30,
      marginVertical: 20,
      borderColor: theme.buttonText,
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      // Consistent size for buttons, also regardless of screensize
      width: 140,
      height: 60,
    },
    buttonText: {
      color: theme.buttonText,
      // borderColor: theme.buttonText,
      // birderWidth: 2,
    },
    rowOfButtons: {
      flexDirection: 'row',
      // borderColor: theme.buttonText,
      // borderWidth: 2,
    },
    
    // Define more styles based on theme if needed
  });

export default HomeScreen;

{/* <TouchableOpacity onPress={() => navigation.navigate('FMC')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>FMC</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {toggleTheme(theme)}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Toggle theme</Text>
        </View>
      </TouchableOpacity> */}