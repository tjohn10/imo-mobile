import React from "react";
import {Text, View, StyleSheet, Image} from "react-native";
import coming from '../../../assets/coming_soon.png'

export default function ComingSoonScreen(){
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={coming} />
            <Text style={styles.comingText}>
                COMING SOON
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: "center",
        justifyContent: "center"
    },
    comingText:{
        fontSize: 24,
        textAlign: "center"
    },
    image:{
        width: 304,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 207
    }
})
