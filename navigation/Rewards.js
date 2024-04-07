import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, FlatList, ActivityIndicator, Modal, TouchableOpacity, Button } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Biodegradable from '../Biodegradable';
import { collection, getDocs } from 'firebase/firestore';
import { exportedNolCardsData } from './HomeScreen';
import { db } from '../firebaseconfig';
import QRCode from 'react-native-qrcode-svg'
import Card from '../components/Card';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const sliderWidth = screenWidth
const sliderHeight = screenHeight
const itemWidth = screenWidth


export default function RewardsScreen() {
    const [dataValue, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showQR, setQR] = useState(false)


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


    const renderModal = () => {
        if (showQR === false) {
            return (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <View style={styles.xContainer}>
                            <Text style={styles.modalHeader}>Redeem Offer</Text>
                            {/* <Button style={styles.xButton} color="black" title="X" onPress={() => setModal(false)}>
                                </Button> */}
                            <Pressable style={styles.xButton} onPress={() => setModal(false)}>
                                <Text style={{ fontWeight: 'bold', color: '#5D5FEF', fontSize: 15 }}>X</Text>
                            </Pressable>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                style={{ flexGrow: 0, width: sliderWidth }}
                                layout='default'
                                data={exportedNolCardsData}
                                renderItem={renderNol}
                                sliderWidth={sliderWidth}
                                containerCustomStyle={{ flexGrow: 0 }}
                                onScroll={handleScroll}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            {renderDotIndicators()}
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <View style={styles.xContainer}>
                            <Text style={styles.modalHeader}>Redeem Offer</Text>
                            {/* <Button style={styles.xButton} color="black" title="X" onPress={() => setModal(false)}>
                        </Button> */}
                            <Pressable style={styles.xButton} onPress={() => setModal(false)}>
                                <Text style={{ fontWeight: 'bold', color: '#5D5FEF', fontSize: 15 }}>X</Text>
                            </Pressable>
                        </View>

                        <View>
                            <QRCode
                                value='hello'></QRCode>
                        </View>

                    </View>
                </View>
            )
        }
    }
    //For dot logic
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        // console.log(scrollPosition)
        const index = scrollPosition / screenWidth;
        // console.log(index)
        setActiveIndex(index);

    }


    //Render Dot Indicators
    const renderDotIndicators = () => {
        return (
            exportedNolCardsData.map((dot, index) => {
                if (activeIndex === index) {
                    return (
                        <View>
                            <View
                                key={index}
                                style={{ borderColor: "#5D5FEF", borderWidth: 1, height: 10, width: 10, borderRadius: 20, marginHorizontal: 15, backgroundColor: "#5D5FEF" }}>

                            </View>
                        </View>
                    )
                }
                else {
                    return (
                        <View
                            key={index}
                            style={{ borderColor: "#5D5FEF", borderWidth: 1, height: 10, width: 10, borderRadius: 20, marginHorizontal: 15 }}>

                        </View>
                    )
                }

            })
        )
    }


    const renderNol = ({ item, index }) => {

        return (
            <View style={styles.carouselRoot}>
                <View style={styles.carouselContainer}>
                    <Card Text={item.nolNumber} balance={'AED' + item.credit}></Card>
                    <Text style={styles.carouselText}>Nol Card</Text>
                    {/* make it so that the subtext can be changed and updated in data folder */}
                </View>
                <View style={styles.pointSystem}>
                    <View style={styles.point}>
                        <View style={styles.textContainer}>
                            <Text style={styles.pointNumber}>{item.nolPoints} </Text>
                            <Text style={styles.pointsText}>NolPoints</Text>
                        </View>
                        <Pressable style={styles.redeemButton} onPress={() => setQR(true)}>
                            <Text style={styles.redeemText}>Redeem</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }






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
                            <TouchableOpacity onPress={() => { setModal(true); setQR(false) }} style={styles.Button}>
                                <Text style={styles.redeemText}>Redeem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal
                    animationType='fade'

                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModal(!modalVisible);
                    }}
                >
                    {renderModal()}
                </Modal>
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

    carouselRoot: {

        width: screenWidth,
        height: 300
    },

    carouselContainer: {

        marginTop: 15,
        alignItems: 'center',

    },
    carouselText: {
        color: "#79797D",
        marginTop: 15,
        fontSize: 21,
        fontFamily: "Meta-Bold-Roman"
    },
    pointSystem: {
        alignItems: "center",
        marginTop: 19,
    },
    point: {
        alignItems: "center",
        justifyContent: "center"
    },
    pointBar: {
        width: 263,
        height: 15,
        borderWidth: 1,
        borderColor: "#5D5FEF",
        backgroundColor: "#5D5FEF",
        borderRadius: 16,
        marginBottom: 5
    },
    pointNumber: {
        fontFamily: "Meta-Bold-Roman",
        fontSize: 18,
    },
    pointsText: {
        fontFamily: "Meta-Bold-Roman",

        fontSize: 16,
        paddingTop: 3,
    },

    redeemButton: {
        marginTop: 19,
        borderRadius: 5,
        height: 35,
        width: 157,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#5D5FEF",
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 3,
        shadowOffset: { width: -2, height: 4 },

    },

    redeemText: {
        fontFamily: "Meta-Bold-Roman",
        color: "#FFFFFF",
        fontSize: 17,
    },
    modalOverlay: {
        width: screenWidth,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    xContainer: {
        flexDirection: 'row',

    },
    modalHeader: {
        fontFamily: 'Meta-Bold-Roman',
        fontSize: 20,
    },

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
    claimRewards: {
        fontFamily: 'Meta-Bold-Roman',
        marginTop: 15,
        marginLeft: 8,
        fontSize: 20
    },
    xButton: {
        marginLeft: 230,
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
        marginTop: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalView: {
        //margin: 20,


        marginTop: 280,

        height: '66%',
        width: '99%',
        backgroundColor: '#F6F6FF',
        borderRadius: 15,
        paddingTop: 35,
        padding: 15,
        //alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9
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
