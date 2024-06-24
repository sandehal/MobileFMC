import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import setupUdpListener from '../../Network/udpClient';
import { Line } from 'react-native-svg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const fmcButtonsMap = require('./FMCCommands');
import { useTheme } from '../../ThemeContext';
import FMCDisplay from './FMCDisplay';


const PrimaryFlightDisplay = ( {data, sendJson, serverIp , setIsExecLightOn, socket} ) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);


  const isActivate = useState(false);

  const handleButtonClick = (commandRef) => {
    const sendMessage = {
      // your data here
      command: fmcButtonsMap.get(commandRef)
    };
    try {
      sendJson(sendMessage, serverIp);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };


  // try {
  //   data.PageLarge.split("");
  // } catch (error) {
  //   console.log("liveData is undefined");
  //   data = null;
  // }

  let lines = new Array(28).fill("");
  const regex = /\s{3,} |> </; // 2 or more spaces
  const buttonDesign = '────';

  if (data) {let { pageLarge, 
    pageSmall, 
    line1LabSmall, 
    line2LabSmall, 
    line3LabSmall, 
    line4LabSmall, 
    line5LabSmall, 
    line6LabSmall,
    Line1Large,
    Line2Large,
    Line3Large,
    Line4Large,
    Line5Large,
    Line6Large,
    Line1LargeInverse,
    Line2LargeInverse,
    Line3LargeInverse,
    Line4LargeInverse,
    Line5LargeInverse,
    Line6LargeInverse,
    Line1Small,
    Line2Small,
    Line3Small,
    Line4Small,
    Line5Small,
    Line6Small,
    Entry,
    EntryInverse,
    ExecLight } = data;

    // if(data.Line6Large.includes("ACTIVATE")) {
    //   isActivate = true;
    // }
      
    lines = [pageLarge, 
      pageSmall, 
      line1LabSmall, 
      line2LabSmall, 
      line3LabSmall, 
      line4LabSmall, 
      line5LabSmall, 
      line6LabSmall,
      Line1Large,
      Line2Large,
      Line3Large,
      Line4Large,
      Line5Large,
      Line6Large,
      Line1LargeInverse,
      Line2LargeInverse,
      Line3LargeInverse,
      Line4LargeInverse,
      Line5LargeInverse,
      Line6LargeInverse,
      Line1Small,
      Line2Small,
      Line3Small,
      Line4Small,
      Line5Small,
      Line6Small,
      Entry,
      EntryInverse,
      ExecLight ];

      
}

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <View style={styles.buttonSides}>
          <TouchableOpacity style={styles.sideButton} title="-" onPress={() => handleButtonClick("l1")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("l2")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("l3")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("l4")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("l5")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => {
            handleButtonClick("l6");
            if(isActivate) {setIsExecLightOn(false); console.log("Exec Light off");}
          }} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FMCDisplay data={data}/>
        <View style={styles.buttonSides}>
          <TouchableOpacity style={styles.sideButton} title="-" onPress={() => handleButtonClick("r1")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("r2")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("r3")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("r4")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleButtonClick("r5")} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => {
            handleButtonClick("r6");
            if(isActivate) {setIsExecLightOn(true); console.log("Exec Light On");}
          }} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonDesign}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// const colors = {
//   screenBackground: '#02011c',
//   materialBackground: '#292b2d',
//   buttonBackground: '#080807',
//   buttonText: '#8c8c8d',
//   screenTextColor: '#d2d2d6',
//   sideButtonBackground: '#080807',
// };
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.materialBackground,
      flex: 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 20,
      width: '100%',
      height: '100%',
    },
    upperHalf: {
      flex: 1,
      marginTop: 10,
      flexDirection: 'row', // Arrange children in a row
      justifyContent: 'center', // Center children horizontally
      alignItems: 'center', // Center children vertically
    },
    buttonSides: {
      //Very short horizontally
      width: '15%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginBottom: '5%',
      marginTop: '20%',
      paddingBottom: 31,
      // paddingLeft: 5,
      // paddingRight: 5,
      // borderColor: 'white',
      // borderWidth: 2,
    },
    sideButton: {
      //Very short horizontally
      width: '100%',
      height: '7%',
      marginVertical: '20%',
      backgroundColor: theme.sideButtonBackground,
    },
    button: {
      //Very short horizontally
      width: '100%',
      height: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 10,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      textAlign: 'center',
    },
    page: {
      fontSize: 16,
      fontWeight: 'bold',
      alignItems: 'center',
      color: 'white',
      marginBottom: 10, // Reduce the vertical margin
    },
    largeDisplay: {
      backgroundColor: theme.screenBackground,
      // Ensure only half the screen is used
      // 
      width: '80%',
      marginBottom: 20,
      // Shadow effect
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 15,
    },
    lineContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5
    },
    leftTextSmall: {
      color: theme.screenTextColor,
      fontSize: 13,
      fontFamily: 'monospace',
      textAlign: 'left',
      marginRight: 60,
      marginLeft: 10,
    },
    rightTextSmall: {
      color: theme.screenTextColor,
      fontSize: 13,
      fontFamily: 'monospace',
      textAlign: 'right',
      marginRight: 16,
    },
    leftText: {
      color: theme.screenTextColor,
      fontSize: 15,
      fontFamily: 'monospace',
      textAlign: 'left',
      marginRight: 60,
      marginLeft: 10,
    },
    rightText: {
      color: theme.screenTextColor,
      fontSize: 15,
      fontFamily: 'monospace',
      textAlign: 'right',
      marginRight: 16,
    },
    EntryText: {
      fontSize: 14,
      color: theme.screenTextColor,
      fontFamily: 'monospace',
      textAlign: 'left',
      marginLeft: 10,
      letterSpacing: 2,
    },
    keyboardHalf: {
      flex: 1,
      justifyContent: 'space-between',
    },
    lowerhalfUpperThird: {
      flex: 1,
      width: '100%',
      height: '50%',
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderColor: 'yellow',
      borderWidth: 2,
    },
    displayNavigation: {
      flexDirection: 'row',
      height: '70%',
      width: '55%',
      borderColor: 'green',
      borderWidth: 2,
    },
    displayNavigationRows: {
      flexDirection: 'column',
      height: '30%',
      borderColor: 'white',
      borderWidth: 2,
    },
    displayExec: {
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      borderColor: 'blue',
      borderWidth: 2,
    },
    buttonWithText: {
      backgroundColor: theme.buttonBackground,
      width: '12%',
      height: '60%',
      borderColor: 'pink',
      borderWidth: 2,
      // marginHorizontal: 12,
      // marginVertical: 2,
    },
    middleThird: {
      flex: 1,
      width: '100%',
      height: '50%',
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderColor: 'yellow',
      borderWidth: 2,
    },
    // Define more styles based on theme if needed
  });

const styles = StyleSheet.create({
  
  
  
  
});

export default PrimaryFlightDisplay;


function resetUnusedLines(lines) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].charAt(0) === "@" || (lines[i].charAt(0) === " " && lines[i].charAt(1) === "@")) {
      lines[i] = "";
      console.log("Line reset: ", i)
    }

    else if(countCharacter(lines[i], "-") >= 24){
      lines[i] = "────────-----";
    }

    else {
      let atIndex = lines[i].indexOf("@");
        if (atIndex !== -1) {
          lines[i] = lines[i].slice(0, atIndex);
        }
    }
  }
}

function countCharacter(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === char) {
      count++;
    }
  }
  return count;
}

function safeSplit(str, regex) {
  let result = str.split(regex);
  if (result.length === 1) {
    result.push("");
  }
  return result;
}