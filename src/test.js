import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseconfig';

export default function Test() {



    //create a function to submit data to firebase
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');

    function create() {

        //submit data
        setDoc(doc(db, 'users', userName),     //users is the name of the collection, LA is the ID
            {
                name: userName,
                email: email,

            })

    }

    return (
        <View style={styles.container}>
            <Text>Firebase Crud</Text>

            <TextInput value={userName} onChangeText={(userName) => { setName(userName) }} placeholder='Username' style={styles.textBoxes}></TextInput>
            <TextInput value={email} onChangeText={(email) => { setEmail(email) }} placeholder='Email' style={styles.textBoxes}></TextInput>

            <Button onPress={create} title='Press Me'></Button>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBoxes: {
        width: "90%",
        fontSize: 18,
        padding: 12,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10
    }

})