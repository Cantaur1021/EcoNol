import { StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Biodegradable from '../Biodegradable';
import { exportedNolCardsData } from './HomeScreen';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');



const sliderWidth = screenWidth
const sliderHeight = screenHeight
const itemWidth = screenWidth


export default function InfoScreen() {
    let [fontsLoaded] = useFonts({
        "MetaNormal-Regular": require("../assets/fonts/MetaNormal-Regular.ttf"),
        "Meta-Bold-Roman": require("../assets/fonts/Meta-Bold-Roman.ttf"),
    });

    //Displays splashscreen till the fonts loaded
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
            console.log(exportedNolCardsData)
        }
        prepare();
    }, [])

    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync();
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.carouselRoot}>
                <View style={styles.depositsContainer}>
                    <View style={styles.depositTextContainer}>
                        <Text style={styles.typeText}>{item.name}</Text>
                        <Text style={styles.locationText}>{item.text}</Text>

                    </View>
                    <View style={styles.depositPointsContainer}>
                        <Text style={styles.points}>+{item.points}</Text>
                        <Text style={styles.nolPoints}>NolPoints</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            <Header welcome="Info" subText="Lorem Ipsum Dior Gucci">

            </Header>
            <View style={styles.biodeContainer}>
                <Text style={styles.biodeText}>Biodegradable Waste</Text>
            </View>
            <FlatList
                renderItem={renderItem}
                data={Biodegradable}
                style={styles.flatlistView}></FlatList>
            <View style={styles.biodeContainer}>
                <Text style={styles.biodeText}>Biodegradable Waste</Text>
            </View>
            <FlatList
                renderItem={renderItem}
                data={Biodegradable}
                style={styles.flatlistView}></FlatList>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        height: "100%",
        width: "100%",
        backgroundColor: "#F6F6FF",
    },
    biodeContainer: {
        marginTop: 20,

    },
    biodeText: {
        fontFamily: 'MetaNormal-Regular',
        marginLeft: 15,
        fontSize: 18,
    },
    depositsContainer: {
        width: 345,
        height: 70,
        backgroundColor: "#E0DFFB",
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 25,
        flexDirection: "row"
    },
    typeText: {
        fontFamily: "MetaNormal-Regular",
        marginLeft: 9,
        fontSize: 18,
        marginTop: 8
    },
    locationText: {
        fontFamily: "MetaNormal-Regular",
        fontSize: 13,
        marginLeft: 9,
        marginTop: 2,
        color: "#5E5E6A",

    },
    depositPointsContainer: {
        marginLeft: 120,
        marginTop: 12,
        alignItems: "center"
    },
    points: {
        fontFamily: "MetaNormal-Regular",
        fontSize: 18,
    },
    nolPoints: {
        fontFamily: "MetaNormal-Regular",
        fontSize: 15
    },
    carouselRoot: {
        width: screenWidth,

    },
    flatlistView: {
        flexGrow: 0,
        height: screenHeight - 600
    },



})