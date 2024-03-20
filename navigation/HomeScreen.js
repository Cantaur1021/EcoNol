

import { StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress'
import NavBar from '../components/NavBar';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseconfig';
import { exportedUserName } from '../src/Login';
// import dataValue from '../data';




const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const sliderWidth = screenWidth
const itemWidth = screenWidth


export default function Home({ navigation }) {



    const [dataValue, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDocs(collection(db, '/users/' + exportedUserName + '/nolCards'))
                let data = [];

                docSnap.forEach((doc) => {
                    data.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });
                setData(data);
                console.log(data)


            } catch (error) {
                console.log('Error fetching data: ', error)
            }
        };
        fetchData();
        const intervalID = setInterval(fetchData, 4000);

        return () => clearInterval(intervalID)
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);



    const renderItem = ({ item, index }) => {
        if (item.depositPoints === "no deposits") {
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
                            <Pressable style={styles.redeemButton} onPress={() => navigation.navigate('Maps')}>
                                <Text style={styles.redeemText}>Redeem</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.recentDepositContainer}>
                        <View style={styles.RecentDeposits}>
                            <Text style={styles.DepositText}>Recent Deposits</Text>
                        </View>
                    </View>

                    <View style={styles.noDeposits}>
                        <Text style={styles.noDepositText}>No Deposits have been made</Text>
                    </View>

                </View>
            )
        }
        else {
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
                            <Pressable style={styles.redeemButton} onPress={() => navigation.navigate('Maps')}>
                                <Text style={styles.redeemText}>Redeem</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.recentDepositContainer}>
                        <View style={styles.RecentDeposits}>
                            <Text style={styles.DepositText}>Recent Deposits</Text>
                        </View>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        snapToAlignment={"center"}
                        scrollEnabled={true}
                        horizontal={false}
                        style={styles.scrollView}>
                        <View style={styles.depositsContainer}>
                            <View style={styles.depositTextContainer}>
                                <Text style={styles.typeText}>{item.type}</Text>
                                <Text style={styles.locationText}>{item.location}</Text>
                                <Text style={styles.locationText}>{item.time}</Text>
                            </View>
                            <View style={styles.depositPointsContainer}>
                                <Text style={styles.points}>{item.depositPoints}</Text>
                                <Text style={styles.nolPoints}>NolPoints</Text>
                            </View>
                        </View>
                    </ScrollView>
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
            dataValue.map((dot, index) => {
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

    //Main

    return (
        <View>
            <Header welcome="Home" subText="Say hello to the future of sustainability"></Header>
            <View style={styles.root}>
                <View style={styles.carouselCContainer}></View>

                <FlatList
                    style={{ flexGrow: 0 }}
                    layout='default'
                    data={dataValue}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    containerCustomStyle={{ flexGrow: 0 }}
                    onScroll={handleScroll}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}

                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    {renderDotIndicators()}
                </View>



                {/* <View style={styles.navBar}>
                    <NavBar page="Home"></NavBar>
                </View> */}



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
    recentDepositContainer: {
        marginLeft: 25,
        marginTop: 25,
    },

    carouselRoot: {
        width: screenWidth,
        height: screenHeight - 320

    },

    carouselContainer: {
        marginLeft: 20,
        marginRight: 20,
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
    DepositText: {
        fontFamily: "MetaNormal-Regular",
        fontSize: 18
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

    textContainer: {
        flexDirection: "row"
    },
    scrollView: {
        flex: 1,
        height: screenHeight
    },
    navBar: {
        position: "absolute",
        marginTop: 560
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
        color: "#5E5E6A"
    },
    depositPointsContainer: {
        marginLeft: 169,
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
    noDeposits: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    noDepositText: {
        fontFamily: "Meta-Bold-Roman",
        fontSize: 16,
        color: 'grey'
    }



})