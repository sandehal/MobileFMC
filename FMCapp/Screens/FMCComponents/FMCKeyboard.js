import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import sendMessage from './PrimaryFlightDisplay';
import PropTypes from 'prop-types';
import { execLightOff, execLightOn } from '../colors';
import { useTheme } from '../../ThemeContext';

const fmcButtonsMap = require('./FMCCommands');

var executionColors = {
    execLightOff: '#0a0a0b',
    execLightOn: '#f3ffa3',
};

const FMCKeyboard = ({ sendJson, isExecLightOn, setIsExecLightOn})=> {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    // const [isExecLightOn, setExecLightOn] = useState(false); // Add this line

    const handleButtonClick = (commandRef) => {
        const sendMessage = {
          // your data here
          command: fmcButtonsMap.get(commandRef)
        };
        sendJson(sendMessage);
      };


    return (
        <View style={styles.keyboardHalf}>

            {/* Upper third */}
            <View style={styles.UpperThird}>
                <View style={styles.displayNavigationRows}>
                    {/* INIT REF | RTE | CLB | CRZ | DES */}
                    <View style={styles.displayNavigation}>
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("initRef")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>INIT{'\n'}REF</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("rte")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>RTE</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("clb")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>CLB</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("crz")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>CRZ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("des")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>DES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.displayNavigation}>
                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("menu")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>MENU</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("legs")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>LEGS</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("depArr")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>DEP{'\n'}ARR</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("hold")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>HOLD</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("prog")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>PROG</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.execBox}>
                            <View style={[styles.execLight, {backgroundColor: isExecLightOn ? executionColors.execLightOn : executionColors.execLightOff}]}></View>
                            <TouchableOpacity style={styles.buttonWithText} onPress={() => 
                                {   
                                    handleButtonClick("exec");
                                    setIsExecLightOn(false);
                                }
                                }>
                            
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>EXEC</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Middle third */}
            <View style={styles.middleThird}>
                <View style={styles.displayNavigationRows}>
                    <View style={styles.displayNavigation}>
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("n1Limit")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>N1</Text>
                                <Text style={styles.buttonText}>LIMIT</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("fix")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>FIX</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.displayNavigation}>
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("prevPage")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>PREV{'\n'}PAGE</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("nextPage")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>NEXT{'\n'}PAGE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.displayNavigationRows}>
                    <View style={styles.displayNavigation}>
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("a")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>A</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("b")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>B</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("c")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>C</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("d")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>D</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("e")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>E</Text>
                        </View>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.displayNavigation}>
                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("f")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>F</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("g")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>G</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("h")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>H</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("i")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>I</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("j")}>
                        <View style={styles.letterButton}>
                            <Text style={styles.buttonText}>J</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

                

                
        </View>

            {/* Lower third */}
            <View style={styles.lowerThird}>
                <View style={[styles.displayNavigationRows]}>
                    {/* 123KLMNO */}
                    <View style={styles.displayNavigation}>
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("one")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.circleButtonText}>1</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("two")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.circleButtonText}>2</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("three")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>3</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("k")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>K</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("l")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>L</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("m")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>M</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("n")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>N</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("o")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>O</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* 456PQRST */}
                    <View style={styles.displayNavigation}>
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("four")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>4</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("five")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>5</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("six")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>6</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("p")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>P</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("q")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>Q</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("r")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>R</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("s")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>S</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("t")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>T</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.displayNavigation}>
                        
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("seven")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>7</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("eight")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>8</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("nine")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>9</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("u")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>U</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("v")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>V</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("w")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>W</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("x")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>X</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("y")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>Y</Text>
                            </View>
                        </TouchableOpacity>
                    
                    </View>

                    <View style={styles.displayNavigation}>
                        
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("period")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>.</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("zero")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>0</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("plusminus")}>
                            <View style={styles.circleButton}>
                                <Text style={styles.buttonText}>+/-</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("z")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>Z</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("space")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>SP</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("delete")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>DEL</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("slash")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>/</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonWithText} onPress={() => handleButtonClick("clear")}>
                            <View style={styles.letterButton}>
                                <Text style={styles.buttonText}>CLR</Text>
                            </View>
                        </TouchableOpacity>
                    
                    </View>
                </View>
            </View>
        </View>
    )
};

const createStyles = (theme) =>
    StyleSheet.create({
        keyboardHalf: {
            marginLeft: 10,
            backgroundColor: theme.materialBackground,
            flex: 1,
          justifyContent: 'space-around',
        },
        UpperThird: {
          width: '100%',
          height: '23%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
    
        middleThird: {
            flexWrap: 'wrap',
            width: '91%',
            height: '23%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'row',
          },
        lowerThird: {
            width: '100%',
            height: '50%',
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        displayNavigation: {
          flexDirection: 'row',
        },
        displayNavigationRows: {
          flexDirection: 'column',
          justifyContent: 'space-between',
          
        },
        button: {
          backgroundColor: theme.buttonBackground,
            justifyContent: 'center',
            alignItems: 'center',
          alignItems: 'center', // Center the text horizontally
          justifyContent: 'center', // Center the text vertically
          margin: 8,
          borderColor: 'black',
          borderWidth: 2,
          width: 45,
          height: 40,
        },
        buttonText: {
          color: theme.buttonText,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 12,
        },
        buttonWithText: {
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'green',
        },
    
        letterButton: {
          backgroundColor: theme.buttonBackground,
          alignItems: 'center',
          justifyContent: 'center', // Center the text vertically
          margin: 8,
          color: theme.buttonText,
          borderColor: 'black',
          borderWidth: 2,
          width: 30,
          height: 30,
          marginTop: 10
        },
        circleButton: {
            width: 30,
            height: 30,
            borderRadius: 50 / 2,
            backgroundColor: theme.buttonBackground,
            color: theme.buttonText,
            alignItems: 'center',
            justifyContent: 'center', // Center the text vertically
            margin: 8,
            borderColor: 'black',
            borderWidth: 2,
            },
        circleButtonText: {
            color: theme.buttonText,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 12,
        },
        execBox: {
            height: 40,
            width: 90,
            justifyContent: 'center',
            alignItems: 'center',
        },
        execLight: {
            width: 30,
            height: 10,
            borderRadius: 50 / 2,
        },
      // Define more styles based on theme if needed
    });

const styles = StyleSheet.create({
    
  });

  export default FMCKeyboard;