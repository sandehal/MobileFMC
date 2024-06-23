import { useTheme } from '../ThemeContext';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, Alert, TouchableOpacity, View} from 'react-native';
import fetchMetar from '../Network/fetchMetar';
import NetInfo from "@react-native-community/netinfo";


const MetarScreen = ({}) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [icaoCode, setIcaoCode] = useState('');
    const [departureIcaoCode, setDepartureIcaoCode] = useState('');
    const [arrivalIcaoCode, setArrivalIcaoCode] = useState('');
    const [departureMetar, setDepartureMetar] = useState('                        ');
    const [arrivalMetar, setArrivalMetar] = useState('                       ');

    const validateICAO = (icao) => {
        const regex = /^[A-Za-z]{4}$/;
        return regex.test(icao);
    };

    const handleButtonPress = async () => {
        NetInfo.fetch().then(async state => {
            if (state.isConnected && state.isInternetReachable) {
                if (validateICAO(departureIcaoCode) && validateICAO(arrivalIcaoCode)) {
                    try {
                        if (isNewMetar(departureMetar, departureIcaoCode)) {
                            const departureData = await fetchMetar(departureIcaoCode);
                            setDepartureMetar(departureData);
                        }
                        if (isNewMetar(arrivalMetar, arrivalIcaoCode)) {
                            const arrivalData = await fetchMetar(arrivalIcaoCode);
                            setArrivalMetar(arrivalData);
                        }
                    } catch (error) {
                        console.error(error);
                        Alert.alert('Error fetching METAR data', 'Please try again later.');
                        setDepartureMetar('Failed to fetch METAR data');
                        setArrivalMetar('Failed to fetch METAR data');
                    }
                } else {
                    Alert.alert('Invalid ICAO code', 'Please enter a valid 4-letter ICAO code.');
                }
            } else {
                Alert.alert('No internet connection', 'Please check your internet connection and try again.');
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Entry field for ICAO code */}
            <View style={styles.row}>
                <Text style={styles.text}>Departure :</Text>
                <TextInput
                style={styles.input}
                onChangeText={setDepartureIcaoCode}
                value={departureIcaoCode}
                placeholder="ICAO"
                autoCapitalize="characters"
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.text}>Arrival :</Text>
                <TextInput
                style={styles.input}
                onChangeText={setArrivalIcaoCode}
                value={arrivalIcaoCode}
                placeholder="ICAO"
                autoCapitalize="characters"
                />
            </View>
            

            {/* Button to fetch METAR data */}
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress()}>
                <Text style={styles.buttonText}>Fetch METAR</Text>
            </TouchableOpacity>
            {/* Display the METAR data */}

            <View style={styles.report}>
                {departureMetar.length > 0 && (
                    <Text style={styles.reportText}>{departureMetar}</Text>
                )}
            </View>

            <View style={styles.report}>
                {arrivalMetar.length > 0 && (
                    <Text style={styles.reportText}>{arrivalMetar}</Text>
                )}
            </View>

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
            color: theme.buttonText,
            fontSize: 20,
        },
        input: {
            height: '50%',
            width: '20%',
            margin: 12,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderColor: theme.buttonText,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: theme.inputBackground,
            color: theme.text,
            justifyContent: 'center',
            alignItems: 'center',
            
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        button: {
            backgroundColor: theme.buttonBackground,
            padding: 10,
            margin: 10,
            borderColor: theme.buttonText,
            borderWidth: 2,
            borderRadius: 10,
        },
        buttonText: {
            color: theme.buttonText,
        },
        report: {
            flex: 0.4,
            color: theme.text,
            margin: 10,
            padding: 10,
            borderColor: theme.buttonText,
            borderWidth: 2,
            borderRadius: 10,
            justifyContent: 'center',
        },
        reportText: {
            color: theme.buttonText,
            padding: 11,
            borderColor: theme.buttonText,
        },
        // Define more styles based on theme if needed
    });


const isNewMetar = (metarData, icao) => {
    if(metarData.length <= 0) {
        return true;
    }

    // Check if the airport code is the same
    const airportCode = metarData.slice(0, 4);
    if (airportCode !== icao) {
        return true;
    }

    // Check if day of month is the same
    const currentDate = new Date();
    const metarDay = metarData.slice(5, 7);
    const metarHour = metarData.slice(7, 9);
    const metarMinute = metarData.slice(9, 11);

    const metarDate = new Date();
    metarDate.setUTCDate(parseInt(metarDay));
    metarDate.setUTCHours(parseInt(metarHour));
    metarDate.setUTCMinutes(parseInt(metarMinute));
    
    const diff = (currentDate - metarDate) / 60000;

    if (diff > 30) {
        return true;
    }
    console.log('METAR data for ' + icao + ' is up to date.');
    return false;
};

export default MetarScreen;