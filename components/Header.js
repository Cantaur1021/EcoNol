import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';


export default function Header(props) {
    let [fontsLoaded] = useFonts({
        "MetaNormal-Regular": require("../assets/fonts/MetaNormal-Regular.ttf"),
        "Meta-Bold-Roman": require("../assets/fonts/Meta-Bold-Roman.ttf"),
    });


    //Displays splashscreen till the fonts loaded
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])

    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <View style={styles.PurpleHeader}>
            <View style={styles.HeaderText}>
                <Text style={styles.BoldText}>{props.welcome}<Text style={styles.PurpleText}>.</Text></Text>

            </View>
            <View>
                <Text style={styles.subText}>{props.subText}</Text>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    PurpleHeader: {
        backgroundColor: "#EDECFE",
        width: 390,
        height: 185,
    },

    BoldText: {
        marginTop: 80,
        marginLeft: 12,
        fontFamily: "Meta-Bold-Roman",
        fontSize: 35,
        color: "#000000",
    },

    PurpleText: {
        fontFamily: "Meta-Bold-Roman",
        fontSize: 35,
        color: "#5D5FEF",
    },

    subText: {
        marginTop: 15,
        marginLeft: 14,
        fontFamily: "MetaNormal-Regular",
        fontSize: 15,
        color: "#77767f"


    },
})

