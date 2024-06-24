import { useTheme } from '../../ThemeContext';
import { View, Text, StyleSheet} from "react-native"
import React from "react"




const FMCLine = ({ LineLarge, LineSmall, LineMag }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    // Helper function to determine the style and character for each index
    const renderCharacter = (index) => {
        try {
            const charLarge = LineLarge[index];
            const charSmall = LineSmall[index];
            const charMag = LineMag[index];
    
            if (charLarge !== ' ') {
                return <Text style={styles.largeWhite}>{charLarge}</Text>;
            } else if (charSmall !== ' ') {
                return <Text style={styles.smallWhite}>{charSmall}</Text>;
            } else if (charMag !== ' ') {
                return <Text style={styles.largeMagenta}>{charMag}</Text>;
            } else {
                return <Text style={styles.defaultStyle}> </Text>;
            }
        } catch (error) {
            console.error("Error rendering character:", error);
            // Optionally, return a fallback UI component or a default character
            return <Text style={styles.errorStyle}>?</Text>;
        }
    };

    return (
        <View style={styles.row}>
            {Array.from({ length: 24 }).map((_, index) => (
            <View key={index} style={styles.row}>
                {renderCharacter(index)}
            </View>
            ))}
        </View>
    );
};

// Define the styles

const createStyles = (theme) =>
    StyleSheet.create({
        row: {
            flexDirection: 'row',
            width: '19%',
            marginLeft: '2%',
        },
        largeWhite: {
            fontSize: 17, // Example large font size
            color: theme.screenTextColor,
            fontFamily: 'monospace',
        },
        smallWhite: {
            fontSize: 14, // Example small font size
            fontFamily: 'monospace',
            color: theme.screenTextColor,
        },
        largeMagenta: {
            fontSize: 16, // Example large font size
            color: 'magenta',
            fontFamily: 'monospace',
        },
    });

export default FMCLine;