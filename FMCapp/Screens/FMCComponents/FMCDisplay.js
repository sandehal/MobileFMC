import { useTheme } from '../../ThemeContext';
import { View, Button, StyleSheet, Touchable, Text } from 'react-native';
import FMCLine from './FMCLine';
import FMCLabelLine from './FMCLabelLine';


const FMCDisplay = ( {data} ) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    
    let lines = new Array(35).fill("");
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
        Line1Mag,
        Line2Mag,
        Line3Mag,
        Line4Mag,
        Line5Mag,
        Line6Mag,
        Entry,
        EntryInverse,
        ExecLight } = data;

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
            Line1Mag,
            Line2Mag,
            Line3Mag,
            Line4Mag,
            Line5Mag,
            Line6Mag,
            Entry,
            EntryInverse,
            ExecLight ];
            // Take all characters of lines[0] up to its last three characters
            lines[0] = lines[0].slice(0, -3);
            // Take the last three characters of lines[1]
            lines[1] = lines[1].slice(-5);
            // Concatenate prefix with suffix and update lines[0]
            console.log(lines[34]);
    }

    return (
        <View style={styles.largeDisplay}>
            <View style={styles.pageContainer}>
                <Text style={styles.pageLarge}>{lines[0]}</Text>
                <Text style={styles.pageSmall}>{lines[1]}</Text>
            </View>
            {/* Line 1 */}
            <FMCLabelLine label={lines[2]}></FMCLabelLine>

            <FMCLine LineLarge={lines[8]} LineSmall={lines[20]} LineMag={lines[26]}></FMCLine>

            {/* Line 2 */}
            <FMCLabelLine label={lines[3]}></FMCLabelLine>

            <FMCLine LineLarge={lines[9]} LineSmall={lines[21]} LineMag={lines[27]}></FMCLine>

            {/* Line 3 */}
            <FMCLabelLine label={lines[4]}></FMCLabelLine>

            <FMCLine LineLarge={lines[10]} LineSmall={lines[22]} LineMag={lines[28]}></FMCLine>

            {/* Line 4 */}
            <FMCLabelLine label={lines[5]}></FMCLabelLine>

            <FMCLine LineLarge={lines[11]} LineSmall={lines[23]} LineMag={lines[29]}></FMCLine>

            {/* Line 5 */}
            <FMCLabelLine label={lines[6]}></FMCLabelLine>

            <FMCLine LineLarge={lines[12]} LineSmall={lines[24]} LineMag={lines[30]}></FMCLine>

            {/* Line 6 */}
            <FMCLabelLine label={lines[7]}></FMCLabelLine>

            <FMCLine LineLarge={lines[13]} LineSmall={lines[25]} LineMag={lines[31]}></FMCLine>

            <View style={styles.lineContainer}>
                <Text style={[styles.EntryText]}>{lines[32]}</Text>
            </View>
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
            largeDisplay: {
                backgroundColor: theme.screenBackground,
                width: '80%',
                height: '90%',
                justifyContent: 'space-between',
            },
            pageLarge: {
                fontSize: 15,
                color: theme.screenTextColor,
                fontFamily: 'monospace',
            },
            pageSmall: {
                fontSize: 12,
                color: theme.text,
            },
            pageContainer: {
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },

            lineContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            },
            textSmallContainer: {
                justifyContent: 'space-between', // Align to the end
                flexWrap: 'wrap',
                width: '100%',
            },

            textSmall: {
                fontFamily: 'monospace',
                fontSize: 14,
                color: theme.text,
            },
            EntryText: {
                fontFamily: 'monospace',
                fontSize: 15,
                color: theme.text,
            },
            
    });

export default FMCDisplay;


//   function mergeLargeTextwithSmall(large, small) {
//     let result = {
//         mergedText: "",
//         smallText: ""
//     };
//     let slashIndex = findSlash(large);
//     if (slashIndex === -1) {
//         result.mergedText = large;
//         return result;
//     }
//     let startIndexofSmall = firstIndexNonSpace(small);
//     let slashInsertIndex = searchFirstSpaceFromIndex(small, startIndexofSmall);
//     if (slashInsertIndex === -1) {
//         result.mergedText = large;
//         return result;
//     }
//     let smallTextPart = small.slice(startIndexofSmall, slashInsertIndex);
//     result.mergedText = large.slice(0, slashIndex) + smallTextPart + "/" + small.slice(slashInsertIndex + 1);
//     result.smallText = smallTextPart;
//     return result;
// }

// function findSlash(str) {
//     let index = str.indexOf("/");
//     if (index !== -1) {
//         return index;
//     }
//     return -1;
// }

// function firstIndexNonSpace(str) {
//     return str.search(/[^ ]/);
// }

// function searchFirstSpaceFromIndex(str, index) {
//     return str.indexOf(" ", index);
// }

function mergeLargeTextwithSmall(large, small) {
    // Two strings. Both contain 24 characters. If one of them contains a char, the other contains a space
    // We essentially need to OR these together
    // Read the large string from left to right
    // If the large string contains a space, we check the small string
    // If the small string contains a char, we replace the space with the char
    // If the small string contains a space, we keep the space
    // If the large string contains a char, we keep the char
    // Step 1: Iterate through the large string
    // Step 2: If we encounter a space, we check the small string
    // Step 3: If the small string contains a char, we replace the space with the char
    // Step 4: If the small string contains a space, we keep the space

    result = "";
    for (charInd in large) {
        if(large[charInd] === " ") {
            if (small[charInd] !== " ") {
                result += small[charInd];
            } else {
                result += " ";
            }
        }
        else {
            result += large[charInd];
        }
    }
    return result;
}