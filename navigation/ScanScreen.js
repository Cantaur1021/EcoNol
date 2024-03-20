import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { exportedUserName } from '../src/Login';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseconfig';



export default function ScanScreen({ navigation }) {




    let [fontsLoaded] = useFonts({
        "MetaNormal-Regular": require("../assets/fonts/MetaNormal-Regular.ttf"),
        "Meta-Bold-Roman": require("../assets/fonts/Meta-Bold-Roman.ttf"),
    });

    const [nolNumber, setNolNumber] = useState('');


    function sendToDatabase() {
        const userDocRef = doc(db, 'users', exportedUserName)

        setDoc(doc(userDocRef, "nolCards", nolNumber),
            {
                nolNumber: nolNumber,
                credit: "0",
                nolPoints: "0",
                cardName: "Nol Card",
                depositPoints: "no deposits"

            }).then(() => {
                console.log('data submitted');
            }).catch((error) => {
                console.log(error)
            })
        setNolNumber("");
    }

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
        <View>
            <Header welcome="Add Card" subText="Please enter the Nol Number found behind your card"></Header>
            <View style={styles.root}>
                <View style={styles.card}></View>
                <Card Text={nolNumber}></Card>


                <View style={styles.enterID}>
                    <TextInput
                        style={styles.IDText}
                        maxLength={11}
                        value={nolNumber}
                        placeholder='Please enter your Nol ID'
                        onChangeText={(nolNumber) => { setNolNumber(nolNumber) }}
                    />
                </View>
                <View style={styles.loginButton}>
                    {/* Put onPress as well */}
                    <Pressable style={styles.Button}
                        onPress={() => {
                            navigation.navigate('Home')
                            sendToDatabase()
                        }
                        }>
                        <Text style={styles.buttonText}>
                            Continue
                        </Text>
                    </Pressable>
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
        alignItems: 'center',
    },
    card: {
        marginTop: 35,
    },

    enterID: {
        marginTop: 100,
        borderBottomWidth: 1,
        alignItems: 'center',
        width: 220,
        borderBottomColor: "#99999E"
    },

    IDText: {
        paddingBottom: 5,
        fontFamily: "Meta-Bold-Roman",
        fontSize: 16
    },

    loginButton: {
        marginTop: 100,
        width: 220,
        justifyContent: 'center',
        alignItems: 'center'

    },

    Button: {
        alignItems: 'center',
        width: 300,
        padding: 13,
        borderRadius: 7,
        borderColor: "#5D5FEF",
        borderWidth: 1,
        backgroundColor: "#5D5FEF",
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 3,
        shadowOffset: { width: -2, height: 4 },
    },

    buttonText: {
        color: "white",
        fontFamily: "MetaNormal-Regular",
        fontSize: 18,
    }


})

