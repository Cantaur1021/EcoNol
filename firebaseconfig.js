import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBOJn4sMetRCIlnikP_0JbZYTKu0yIuedk",
    authDomain: "econol.firebaseapp.com",
    databaseURL: "https://econol-default-rtdb.firebaseio.com",
    projectId: "econol",
    storageBucket: "econol.appspot.com",
    messagingSenderId: "44033891843",
    appId: "1:44033891843:web:0833be7cc9125bb3e7b836",
    measurementId: "G-WRF7DLLZXM"
};


const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);

