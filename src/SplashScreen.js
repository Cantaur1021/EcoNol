import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import Header from '../components/Header'
import { useState } from 'react';


export default function Splash({ navigation }) {


    setTimeout(() => {
        navigation.navigate('Login');
    }, 2000)


    let [fontsLoaded] = useFonts({
        "MetaNormal-Regular": require("../assets/fonts/MetaNormal-Regular.ttf"),
        "Meta-Bold-Roman": require("../assets/fonts/Meta-Bold-Roman.ttf"),
    });

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
            <View style={styles.ImageContainer}>
                <Image style={styles.image}
                    source={require('../assets/pictures/MainLogo.png')} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#F6F6FF",
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    image: {
        width: 200,
        height: 200,

    }

});
