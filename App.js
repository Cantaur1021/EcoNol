import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/SplashScreen';
import Login from './src/Login';
import Scan from './src/Scan';
import Home from './src/Home';
import Test from './src/test';
import MainContainer from './navigation/MainContainer';
import NavBar from './components/NavBar';



const Stack = createNativeStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Splash'
          component={Splash}
        />
        <Stack.Screen
          name='Login'
          component={Login}
        />

        <Stack.Screen
          name='Scan'
          component={Scan}
        />
        <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name='Main'
          component={MainContainer}
        />
        <Stack.Screen
          name='Test'
          component={Test}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}