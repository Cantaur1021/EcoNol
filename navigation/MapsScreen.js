import { StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';

import MapView, { Marker, Overlay, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';


const INITIAL_REGION = {
    latitude: 25.102834,
    longitude: 55.164879,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}


export default function MapScreen() {

    const [selectedMarker, setSelectedMarker] = useState(null);


    const markers = [
        {
            id: 1, title: 'Metro Station', coordinate: {
                latitude: 25.1020,
                longitude: 55.1736,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        },
        {
            id: 2, title: 'Top Golf ', coordinate: {
                latitude: 25.08212,
                longitude: 55.16086,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        },
        {
            id: 3, title: 'Middlesex University', coordinate: {
                latitude: 25.101994,
                longitude: 55.162329,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        },
        {
            id: 4, title: 'Sufouh Beach', coordinate: {
                latitude: 25.1163,
                longitude: 55.1678,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }

    ];

    const handleMarkerPress = (marker) => {
        setSelectedMarker(marker)
    }

    const renderMarkerPopUp = () => {
        if (!selectedMarker) {
            return null
        }
        return (
            <View style={styles.markerContainer}>
                <View style={styles.locationSection}>
                    <View style={styles.picure}>
                        <Image style={styles.icon} source={require('../assets/icons/smart-trash.png')}></Image>
                    </View>
                    <View style={styles.textSection}>
                        <Text style={styles.locationName}>{selectedMarker.title}</Text>
                        <Text style={styles.subText}>EcoNol Smart Dustbin</Text>
                    </View>
                </View>
            </View>
        )
    }




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
            <Header welcome="Maps" subText="Find SmartBins across Dubai"></Header>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} showsUserLocation={true} provider={PROVIDER_DEFAULT} initialRegion={INITIAL_REGION}>
                    {markers.map((marker) => (
                        <Marker key={marker.id}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            onPress={() => { handleMarkerPress(marker) }}>
                            <Image source={require("../assets/icons/smart-trash.png")} style={{ width: 40, height: 40 }}></Image>
                        </Marker>
                    ))}

                </MapView>
                {renderMarkerPopUp()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F6F6FF",

    },
    map: {
        width: "100%",
        height: "100%"
    },
    icon: {
        width: 55,
        height: 55,

        marginRight: 15
    },
    markerContainer: {
        position: 'absolute',
        bottom: 190,
        width: 350,
        marginLeft: 20,
        borderRadius: 20,
        height: 90,
        left: 0,
        right: 0,
        backgroundColor: '#E0DFFB',
        padding: 16,
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 3,
        shadowOffset: { width: -2, height: 4 },
    },
    locationSection: {
        flexDirection: 'row',
    },
    locationName: {
        fontFamily: 'Meta-Bold-Roman',
        fontSize: 20,
        marginTop: 10,
        paddingBottom: 4
    },
    subText: {
        fontFamily: 'MetaNormal-Regular',
        fontSize: 16,
        color: '#8D8D9E'
    }


})