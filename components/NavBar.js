import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

const focusedHome = require("../assets/icons/focusedhome.png")
const unFocusedHome = require("../assets/icons/unfocusedhome.png")
let iconRender

export default function NavBar(props, { navigation }) {
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
        <View style={styles.root}>
            <View style={styles.iconContainer}>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <View style={styles.homeIcon}>
                        {props.page === "Home" ? <Image source={focusedHome} /> : <Image source={unFocusedHome} />}
                    </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Maps')}>
                    <View style={styles.homeIcon}>
                        {props.page === "Maps" ? <Image source={focusedHome} /> : <Image source={unFocusedHome} />}
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Maps')}>
                    <View style={styles.homeIcon}>
                        {props.page === "Maps" ? <Image source={focusedHome} /> : <Image source={unFocusedHome} />}
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Maps')}>
                    <View style={styles.homeIcon}>
                        {props.page === "Maps" ? <Image source={focusedHome} /> : <Image source={unFocusedHome} />}
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Maps')}>
                    <View style={styles.homeIcon}>
                        {props.page === "Maps" ? <Image source={focusedHome} /> : <Image source={unFocusedHome} />}
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        root: {
            width: 363,
            height: 59,
            borderRadius: 25,
            backgroundColor: "#E0DFFB",

        },



        iconContainer: {
            flexDirection: 'row',
            justifyContent: "space-around",
            marginTop: 20,
        },






    }
)