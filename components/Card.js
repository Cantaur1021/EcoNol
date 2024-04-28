import { StyleSheet, Text, View, Image } from 'react-native';


export default function Card(props) {
    return (
        <View style={styles.root}>
            <View style={styles.imageAndLogo}>
                <Image style={styles.imageLogo} source={require("../assets/pictures/wifiLogo.png")} />
                <Image style={styles.Logo} source={require("../assets/pictures/NolLogo.png")} />
            </View>
            <View style={styles.ID}>
                <Text style={styles.IDText}>
                    {props.Text}
                </Text>
                <Text style={styles.Balance}>{props.balance}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    root: {
        height: 143,
        width: 274,
        borderRadius: 11,
        backgroundColor: "#31364B",
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 3,
        shadowOffset: { width: -2, height: 4 },
    },

    imageAndLogo: {
        flexDirection: 'row'
    },

    imageLogo: {
        height: 54,
        width: 54,
        marginTop: 12,
        marginLeft: 15,
    },

    Logo: {
        height: 54,
        width: 54,
        marginTop: 15,
        marginLeft: 145
    },

    ID: {
        flexDirection: 'row',
        marginTop: 35,
        marginLeft: 20,
    },

    IDText: {
        color: "#DBDAFF",
    },

    Balance: {
        paddingTop: 1,
        paddingLeft: 115,
        color: '#DBDAFF'
    }
})