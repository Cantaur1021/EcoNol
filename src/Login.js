import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import Header from '../components/Header';

export default function Login({ navigation }) {
    //Loads the fonts
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

    //returns the view
    return (
        <View>
            <Header welcome="Welcome" subText="Say hello to the future of sustainability"></Header>
            <View style={styles.root}>
                <View style={styles.LoginContainer}>
                    <View style={styles.Username}>
                        <TextInput
                            style={styles.input}
                            placeholder='Username'
                        />
                    </View>
                    <View style={styles.Password}>
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.forgotContainer}>
                        <Text style={styles.forgotUsername}>Forgot Username?</Text>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </View>
                    <View style={styles.loginButton}>
                        {/* Put onPress as well */}
                        <Pressable style={styles.Button}
                            onPress={() => navigation.navigate('Scan')}>
                            <Text style={styles.buttonText}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
                    <View style={{ marginTop: 35, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center', fontFamily: "Meta-Bold-Roman", fontSize: 16 }}>or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <View style={styles.createAccount}>
                        {/* Put onPress as well */}
                        <Pressable style={styles.Button1}>
                            <Text style={styles.buttonText1}>
                                Create Account
                            </Text>
                        </Pressable>
                        <Pressable style={styles.guestButton}>
                            <Text style={styles.guestText}>
                                Continue as Guest
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F6F6FF",
        alignItems: 'center',
    },

    LoginContainer: {
        width: 363,
        height: 143,
        marginRight: 5,
        marginTop: 20
    },

    Username: {
        marginVertical: 15,
        borderColor: "#D3D2F7",
        borderWidth: '1',
        borderRadius: 5,
    },

    Password: {
        marginVertical: 15,
        borderColor: "#D3D2F7",
        borderWidth: '1',
        borderRadius: 5,
    },

    input: {
        paddingVertical: 20,
        paddingLeft: 6,
        fontFamily: "MetaNormal-Regular"
    },

    forgotContainer: {
        marginTop: 10,
        height: 59,
        width: 363,
        flexDirection: 'row',
    },

    forgotUsername: {
        flex: 1,
        fontFamily: "MetaNormal-Regular",
        fontSize: 14,
        color: "#5D5FEF"
    },

    forgotPassword: {
        flex: 0,
        marginRight: 5,
        fontFamily: "MetaNormal-Regular",
        fontSize: 14,
        color: "#5D5FEF",
    },

    loginButton: {
        marginTop: 10,
        height: 50,
        width: 363,
    },

    Button: {
        height: "100%",
        width: "100%",
        backgroundColor: "#5D5FEF",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 3,
        shadowOffset: { width: -2, height: 4 },

    },

    buttonText: {
        fontFamily: "Meta-Bold-Roman",
        color: "white",
        fontSize: 16,
    },

    createContainer: {
        alignItems: 'center'
    },

    createAccount: {
        marginTop: 35,
        width: 363,
        height: 50,
    },

    Button1: {
        height: "100%",
        width: "100%",
        borderColor: "#5D5FEF",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText1: {
        fontFamily: "Meta-Bold-Roman",
        color: "black",
        fontSize: 16,
    },

    guestButton: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    guestText: {
        fontFamily: 'Meta-Bold-Roman',
        fontSize: 18,
        color: "#2021A2",
    },

});
