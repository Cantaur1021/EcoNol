import { StyleSheet, Text, View, Image, Pressable, Dimensions, FlatList, ActivityIndicator, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Biodegradable from '../Biodegradable';
import { collection, getDocs } from 'firebase/firestore';
import { exportedNolCardsData } from './HomeScreen';
import { db } from '../firebaseconfig';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const sliderWidth = screenWidth
const sliderHeight = screenHeight
const itemWidth = screenWidth


export default function RewardsScreen() {
    const [dataValue, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModal] = useState(false);

    let [fontsLoaded] = useFonts({
        "MetaNormal-Regular": require("../assets/fonts/MetaNormal-Regular.ttf"),
        "Meta-Bold-Roman": require("../assets/fonts/Meta-Bold-Roman.ttf"),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDocs(collection(db, '/Rewards/'));
                let data = [];

                docSnap.forEach((doc) => {
                    data.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                });
                setData(data);
                console.log(data);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching data: ', error);
                setIsLoading(false);
            }
        };

        // Fetch the data and show the loading screen for 3 minutes
        fetchData();
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 180000); // 3 minutes

        return () => clearTimeout(timer);
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 0, }}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.pic }} style={styles.image} />

                    </View>
                    <View style={styles.mainTextContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textHeader}>{item.header}</Text>
                            <Text style={styles.nolPoints}>{item.nolPoints} NolPoints</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>
                                {item.Description}
                            </Text>
                            <Pressable style={styles.Button}>
                                <Text style={styles.redeemText}>Redeem</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#5D5FEF" />
                <Text style={styles.loadingText}>Loading data, please wait...</Text>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <Header welcome="Rewards" subText="Claim your rewards!" />
            <View style={styles.carouselContainer}>
                <FlatList
                    data={dataValue}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6FF',
    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 18,
        fontFamily: 'Meta-Bold-Roman',
    },
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F6F6FF",

    },

    mainContainer: {
        borderRadius: 10,
        height: 200,
        width: 380,
        backgroundColor: '#E0DFFB',
        marginTop: 90,
    },
    textHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Meta-Bold-Roman'

    },
    nolPoints: {
        fontSize: 20,
        fontFamily: 'Meta-Bold-Roman',
    },
    image: {
        height: 120,
        width: 380,
    },
    mainTextContainer: {
        marginTop: 5
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10,
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    description: {
        marginTop: 6,
        fontFamily: 'MetaNormal-Regular',

    },


    Button: {
        marginRight: 10,
        marginTop: 1,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: '#5D5FEF',
        backgroundColor: "#5D5FEF",
        borderWidth: 2,
        padding: 3,
    },
    redeemText: {
        color: 'white',
        fontFamily: 'MetaNormal-Regular',
        fontSize: 15
    }


})
