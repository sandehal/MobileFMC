import * as React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import FMCScreen from './Screens/FMCScreen';
import MetarScreen from './Screens/MetarScreen';
import { useTheme } from './ThemeContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const Stack = createStackNavigator();

const AppNavigator = ({liveData, serverIp, sendJson, sendConnectRequest, connected, socket}) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
  return (
    <NavigationContainer style={styles.AppTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
            
            headerStyle: {
              height: 30, // Adjust this value as needed
              backgroundColor: theme.headerBackground,
            },
            headerTitleStyle: {
              fontSize: 18, // Adjust this value as needed
              
              color: theme.buttonText,
            },
            headerTitleAlign: 'center',
            headerTintColor: theme.buttonText,
            
          }}>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menu' }} /> */}

        <Stack.Screen name="Home">
        {props => (
          <HomeScreen
            {...props}
            sendConnectRequest={sendConnectRequest}
            connected={connected}
            socket={socket}
          />
        )}
        </Stack.Screen>

        {/* <Stack.Screen name="FMC" component={FMCScreen} options={{ title: 'FMC' } } /> */}
        <Stack.Screen name="FMC">
        {props => (
          <FMCScreen
            {...props}
            liveData={liveData}
            serverIp={serverIp}
            sendJson={sendJson}
            socket={socket}
          />
        )}
      </Stack.Screen>
        <Stack.Screen name="METAR" component={MetarScreen} options={{ title: 'Metar' } } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const createStyles = (theme) =>
    StyleSheet.create({
        AppTheme: {
            backgroundColor: theme.materialBackground,
            justifyContent: 'center',
            alignItems: 'center',
          },
    });

export default AppNavigator;
