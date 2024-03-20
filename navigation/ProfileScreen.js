import { StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import data from '../data'
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress'
import NavBar from '../components/NavBar';
import { exportedUserName } from '../src/Login';

export default function Profile({ navigation }) {
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
            <Header welcome="Profile" subText="View/Edit your profile"></Header>
            <View style={styles.profileSection}>
                <View style={styles.profilePicture}></View>
                <View style={styles.profileNameSection}>
                    <Text style={styles.userName}>Chinmay Rajeev</Text>
                    <Text style={styles.phoneNumber}>05X-XXX-XXXX</Text>
                    <Text style={styles.gmail}>XXX@gmail.com</Text>
                </View>
            </View>
            <View style={styles.ViewProfileContainer}>
                <Pressable style={styles.ViewProfileButton}>
                    <Text style={styles.ViewProfileText}>View Profile</Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 35, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center', fontFamily: "Meta-Bold-Roman", fontSize: 16 }}>or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <View style={styles.SignOutContainer}>
                <View style={styles.SignOutButton}>
                    <Text style={styles.SignOutText}>
                        Sign Out
                    </Text>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F6F6FF",
        // alignItems: 'center',
    },
    profileSection: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 12
    },
    profilePicture: {
        backgroundColor: 'grey',
        height: 100,
        width: 100,
        borderRadius: 140,
    },
    profileNameSection: {
        marginTop: 15,
        paddingLeft: 10,
        paddingTop: 2
    },
    userName: {
        fontFamily: 'Meta-Bold-Roman',
        fontSize: 30
    },
    phoneNumber: {
        fontFamily: 'MetaNormal-Regular',
        fontSize: 14,
        marginLeft: 3,
        paddingTop: 2
    },
    gmail: {
        fontFamily: 'MetaNormal-Regular',
        fontSize: 14,
        marginLeft: 3,
        paddingTop: 5
    },
    ViewProfileContainer: {
        marginTop: 60,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ViewProfileButton: {
        backgroundColor: '#5D5FEF',
        width: 300,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9
    },
    ViewProfileText: {
        fontFamily: 'MetaNormal-Regular',
        fontSize: 20,
        color: 'white'
    },
    SignOutContainer: {
        marginTop: 60,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    SignOutButton: {
        borderColor: 'red',
        borderWidth: 1,
        width: 300,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9
    },
    SignOutText: {
        fontFamily: 'MetaNormal-Regular',
        fontSize: 20,
        color: 'red'
    }


})
