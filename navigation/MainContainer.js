import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-ionicons';
import { home } from 'react-native-ionicons'
import HomeScreen from './HomeScreen';
import MapsScreen from './MapsScreen';
import ScanScreen from './ScanScreen';
import InfoScreen from './InfoScreen';
import Profile from './ProfileScreen';
import RewardsScreen from './Rewards';
import { Ionicons } from '@expo/vector-icons';

const homeName = 'Home';
const mapsName = 'Maps';
const scanName = 'Scan';
const infoName = 'Info'
const profileName = 'Profile'

const rewardsName = 'Rewards'

const focusedHome = require("../assets/icons/focusedhome.png")
const unFocusedHome = require("../assets/icons/unfocusedhome.png")

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer

            independent={true}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    // tabBarShowLabel: false,
                    tabBarStyle: ({

                        backgroundColor: '#E0DFFB',
                        //     borderRadius: 30,
                        //     height: 60,
                        //     shadowColor: '#171717',
                        //     shadowOpacity: 0.2,
                        //     elevation: 6,
                        //     shadowRadius: 3,
                        //     shadowOffset: { width: -2, height: 4 },
                    }),

                    tabBarActiveTintColor: "#5D5FEF",
                    tabBarInactiveTintColor: 'grey',

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'

                        } else if (rn === mapsName) {
                            iconName = focused ? 'map' : 'map-outline'
                        }
                        else if (rn === scanName) {
                            iconName = focused ? 'add-circle' : 'add-circle-outline'
                        }
                        else if (rn === rewardsName) {
                            iconName = focused ? 'list' : 'list-outline'
                        }
                        else if (rn === profileName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />

                    }

                })
                }



            >
                <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false, }} />
                <Tab.Screen name={mapsName} component={MapsScreen} options={{ headerShown: false }} />
                <Tab.Screen name={scanName} component={ScanScreen} options={{ headerShown: false }} />
                <Tab.Screen name={rewardsName} component={RewardsScreen} options={{ headerShown: false }} />
                <Tab.Screen name={profileName} component={Profile} options={{ headerShown: false }} />


            </Tab.Navigator>
        </NavigationContainer>
    )
}