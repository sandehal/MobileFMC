import { useTheme } from '../../ThemeContext';
import { Text, StyleSheet, View } from 'react-native';
const FMCLabelLine = ({ label }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const renderCharacter = (index) => {
        try {
            const charSmall = label[index];
    
            if (charSmall !== ' ') {
                return <Text style={styles.smallWhite}>{charSmall}</Text>;
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
}

const createStyles = (theme) =>
    StyleSheet.create({
        row: {
            flexDirection: 'row',
            width: '19%',
            marginLeft: '2%',
        },
        smallWhite: {
            fontSize: 14, // Example small font size
            fontFamily: 'monospace',
            color: theme.screenTextColor,
        },
    });

export default FMCLabelLine;